import React, { FC } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SellerShopRecommended from '~/modules/SellerShopRecommended'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, ISellerShopRecommended } from '~/interfaces'
import { AxiosRequestConfig } from 'axios'
import { SellerService } from '~/services'
import { withSellerAuth } from '../../../../hocs/with-seller'

interface ISellerRecommendedPageProps {
  shopRecommended: ISellerShopRecommended
}

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    const shopRecommended: ISellerShopRecommended = null
    const { req } = context

    /*if (req) {
      try {
        const option: AxiosRequestConfig = {
          headers: { Cookie: req.headers.cookie }
        }
        const { data }: IApiResponse = await SellerService.shopRecommended(option)
        shopRecommended = data
      } catch (error) {
        if (!error.data || error.data.code !== 106004) {
          return {
            redirect: {
              destination: '/error',
              permanent: true
            }
          }
        }
      }
    }*/

    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          ...LocaleNamespaceConst,
          'seller.shop-recommended'
        ])),
        shopRecommended
      }
    }
  }
)

const RecommendedPage: FC<ISellerRecommendedPageProps> = (props: ISellerRecommendedPageProps) => (
  <SellerShopRecommended shopRecommended={props.shopRecommended} />
)

export default RecommendedPage
