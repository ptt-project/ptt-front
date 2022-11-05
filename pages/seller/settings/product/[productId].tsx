import React, { FC } from 'react'
import SellerProductForm from '~/modules/SellerProduct/components/ProductForm'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LocaleNamespaceConst } from '~/constants'
import { withSellerAuth } from '../../../../hocs/with-seller'
import { IProductInfo } from '../../../../interfaces'
import { AxiosRequestConfig } from 'axios'
import { ShopService } from '../../../../services'

interface ISellerEditProductPageProps {
  productInfo: IProductInfo
}

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    const { req, params } = context

    let productInfo: IProductInfo | null = null

    if (req) {
      try {
        const option: AxiosRequestConfig = {
          headers: { Cookie: req.headers.cookie }
        }

        const { data } = await ShopService.getProduct(params.productId as string, option)

        productInfo = data

        console.log(productInfo)
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
      notFound: !productInfo,
      props: {
        ...(await serverSideTranslations(context.locale, [
          ...LocaleNamespaceConst,
          'seller.product'
        ])),
        productInfo
      }
    }
  }
)

const SellerEditProductPage: FC<ISellerEditProductPageProps> = (
  props: ISellerEditProductPageProps
) => <SellerProductForm productInfo={props.productInfo} />

export default SellerEditProductPage
