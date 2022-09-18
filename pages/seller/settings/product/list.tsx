import React, { FC } from 'react'
import { AxiosRequestConfig } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SellerProduct from '~/modules/SellerProduct'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, IProduct } from '../../../../interfaces'
import { withSellerAuth } from '../../../../hocs/with-seller'
import { ShopService } from '../../../../services'

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    let products: IProduct[] = []
    const { req } = context

    if (req) {
      try {
        const option: AxiosRequestConfig = { headers: { Cookie: req.headers.cookie } }
        const { data }: IApiResponse = await ShopService.getProducts(option)
        console.log(data)
        products = data
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
        products
      }
    }
  }
)

const SellerProductPage: FC = () => <SellerProduct />

export default SellerProductPage
