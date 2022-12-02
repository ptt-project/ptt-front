import React, { FC } from 'react'
import SellerShopDetail from '~/modules/SellerShopDetail'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, IShopInfo } from '~/interfaces'
import { AxiosRequestConfig } from 'axios'
import { ShopService } from '~/services'
import { withSellerAuth } from '../../../../hocs/with-seller'

interface IShopInfoPageProps {
  shopInfo: IShopInfo
}

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    let shopInfo: IShopInfo = null
    const { req } = context

    if (req) {
      try {
        const option: AxiosRequestConfig = {
          headers: { Cookie: req.headers.cookie }
        }
        const { data }: IApiResponse = await ShopService.getInfo(option)

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

const DetailPage: FC<IShopInfoPageProps> = (props: IShopInfoPageProps) => (
  <SellerShopDetail shopInfo={props.shopInfo} />
)

export default DetailPage
