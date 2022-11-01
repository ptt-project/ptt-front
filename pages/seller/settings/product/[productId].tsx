import React, { FC } from 'react'
import SellerProductForm from '~/modules/SellerProduct/components/ProductForm'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LocaleNamespaceConst } from '~/constants'
import { withSellerAuth } from '../../../../hocs/with-seller'
import { IProduct } from '../../../../interfaces'
import { AxiosRequestConfig } from 'axios'
import { ShopService } from '../../../../services'

interface ISellerEditProductPageProps {
  product: IProduct
}

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    const { req, params } = context

    let product: IProduct | null = null

    if (req) {
      try {
        const option: AxiosRequestConfig = {
          headers: { Cookie: req.headers.cookie }
        }

        const { data } = await ShopService.getProduct(params.productId as string, option)

        product = data
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
      notFound: !product,
      props: {
        ...(await serverSideTranslations(context.locale, [
          ...LocaleNamespaceConst,
          'seller.product'
        ])),
        product
      }
    }
  }
)

const SellerEditProductPage: FC<ISellerEditProductPageProps> = (
  props: ISellerEditProductPageProps
) => <SellerProductForm product={props.product} />

export default SellerEditProductPage
