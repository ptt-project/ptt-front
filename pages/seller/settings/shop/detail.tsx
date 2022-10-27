import React, { FC } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SellerShopDetail from '~/modules/SellerShopDetail'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, ISellerInfo } from '~/interfaces'
import { AxiosRequestConfig } from 'axios'
import { SellerService } from '~/services'
import { withSellerAuth } from '../../../../hocs/with-seller'

interface ISellerInfoPageProps {
  shopInfo: ISellerInfo
}

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    let shopInfo: ISellerInfo = null
    const { req } = context

    if (req) {
      try {
        const option: AxiosRequestConfig = {
          headers: { Cookie: req.headers.cookie }
        }
        const { data }: IApiResponse = await SellerService.shopInfo(option)
        shopInfo = data
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
    }

    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          ...LocaleNamespaceConst,
          'seller.shop-detail'
        ])),
        shopInfo
      }
    }
  }
)

const DetailPage: FC<ISellerInfoPageProps> = (props: ISellerInfoPageProps) => (
  <SellerShopDetail shopInfo={props.shopInfo} />
)

export default DetailPage
