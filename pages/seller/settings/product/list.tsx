import React, { FC } from 'react'
import SellerProduct from '~/modules/SellerProduct'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LocaleNamespaceConst } from '~/constants'
import { withSellerAuth } from '../../../../hocs/with-seller'
import { AxiosRequestConfig } from 'axios'
import { ShopService } from '../../../../services'
import { IListItems, IProduct } from '../../../../interfaces'

interface ISellerProductListPageProps {
  products: IListItems<IProduct>
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

    const query: ISellerProductListPageProps['query'] = {
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

    if (req) {
      try {
        const params: { [key: string]: string | boolean | number } = {}

        Object.keys(query).forEach((key: string) => {
          if (query[key]) {
            params[key] = query[key]
          }
        })

        const option: AxiosRequestConfig = {
          headers: { Cookie: req.headers.cookie },
          params: { ...params }
        }

        console.log(params)

        const { data } = await ShopService.getProducts(option)

        console.log(data)

        if (data) {
          products = data
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
        query
      }
    }
  }
)

const SellerProductListPage: FC<ISellerProductListPageProps> = (
  props: ISellerProductListPageProps
) => <SellerProduct products={props.products} query={props.query} />

export default SellerProductListPage
