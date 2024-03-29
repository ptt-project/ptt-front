import React, { FC } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import SellerCategory from '~/modules/SellerCategory'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, ICategory } from '~/interfaces'
import { ShopService } from '~/services'
import { withSellerAuth } from '../../../../../hocs/with-seller'

interface ICategoryPageProps {
  categories?: ICategory[]
}

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    let categories: ICategory[] = []
    const { req } = context

    if (req) {
      try {
        const option: AxiosRequestConfig = { headers: { Cookie: req.headers.cookie } }
        const { data }: IApiResponse = await ShopService.getCategories(option)
        categories = data
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
          'seller.category'
        ])),
        categories
      }
    }
  }
)

const SellerCategoryPage: FC<ICategoryPageProps> = (props: ICategoryPageProps) => (
  <SellerCategory categories={props.categories} />
)

SellerCategoryPage.defaultProps = {
  categories: []
}

export default SellerCategoryPage
