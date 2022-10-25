import React, { FC } from 'react'
import SellerProduct from '~/modules/SellerProduct'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LocaleNamespaceConst } from '~/constants'
import { withSellerAuth } from '../../../../hocs/with-seller'
import { AxiosRequestConfig } from 'axios'
import { ShopService } from '../../../../services'
import { IApiResponse, ICategory, IListItems, IProduct } from '../../../../interfaces'

interface ISellerProductPageProps {
  products: IListItems<IProduct>
  categories: ICategory[]
  query: {
    keyword: string
    categoryId: string
    groupSearch: string
    approval: boolean
    status: string
    page: number
  }
}

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    const { req } = context

    let page: number = 1

    const pageQuery: number = context.query?.page ? parseInt(context.query.page as string) : 1

    if (!isNaN(pageQuery) && pageQuery > 1) {
      page = pageQuery
    }

    const query: ISellerProductPageProps['query'] = {
      keyword: (context.query?.keyword as string) || '',
      categoryId: (context.query?.categoryId as string) || '',
      groupSearch: (context.query?.groupSearch as string) || '',
      approval: (context.query?.approval as string) === 'true' ? true : false,
      status: (context.query?.status as string) || '',
      page
    }

    // products
    let products: IListItems<IProduct> = {
      items: [],
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 0,
        totalPages: 0,
        currentPage: 0
      }
    }

    // categories
    let categories: ICategory[] = []

    if (req) {
      try {
        const option: AxiosRequestConfig = { headers: { Cookie: req.headers.cookie } }
        const productsRes: Promise<IApiResponse> = ShopService.getProducts(option)
        const categoriesRes: Promise<IApiResponse> = ShopService.getCategories(option)

        // result
        const result: IApiResponse[] = await Promise.all([productsRes, categoriesRes])

        if (result[0].data) {
          products = result[0].data
        }

        if (result[1].data) {
          categories = result[1].data
        }
      } catch (error) {
        console.log(error)

        return {
          redirect: {
            destination: '/error',
            permanent: true
          }
        }
      }
    }

    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          ...LocaleNamespaceConst,
          'seller.product'
        ])),
        products,
        categories,
        query
      }
    }
  }
)

const SellerProductPage: FC<ISellerProductPageProps> = (props: ISellerProductPageProps) => (
  <SellerProduct products={props.products} categories={props.categories} query={props.query} />
)

export default SellerProductPage
