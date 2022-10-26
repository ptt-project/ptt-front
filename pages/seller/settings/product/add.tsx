import React, { FC } from 'react'
import SellerAddProduct from '~/modules/SellerProduct/components/ProductForm'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LocaleNamespaceConst } from '~/constants'
import { withSellerAuth } from '../../../../hocs/with-seller'
import { AxiosRequestConfig } from 'axios'
import { IApiResponse, ICategoryPlatform } from '../../../../interfaces'
import { ShopService } from '../../../../services'

interface ISellerAddProductPageProps {
  categoriesPlatform: ICategoryPlatform[]
}

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    const { req } = context

    let categoriesPlatform: ICategoryPlatform[] = []

    if (req) {
      try {
        const option: AxiosRequestConfig = { headers: { Cookie: req.headers.cookie } }
        const { data }: IApiResponse = await ShopService.getCategoriesPlatform(option)
        categoriesPlatform = data
      } catch (error) {
        console.log(error)

        return {
          redirect: {
            destination: '/error',
            permanent: true
          }
        }
      }

      return {
        props: {
          ...(await serverSideTranslations(context.locale, [
            ...LocaleNamespaceConst,
            'seller.product'
          ])),
          categoriesPlatform
        }
      }
    }
  }
)

const SellerAddProductPage: FC<ISellerAddProductPageProps> = (
  props: ISellerAddProductPageProps
) => <SellerAddProduct categoriesPlatform={props.categoriesPlatform} />

export default SellerAddProductPage
