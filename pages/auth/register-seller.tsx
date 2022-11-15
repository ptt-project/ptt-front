import React, { FC } from 'react'
import RegisterSeller from '~/modules/RegisterSeller'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, IShopInfo } from '~/interfaces'
import { ShopService } from '~/services'
import { ShopApprovalStatusEnum } from '~/enums'
import { withSellerAuth } from '../../hocs/with-seller'

interface IRegisterSellerPageProps {
  shopInfo?: IShopInfo
}

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    let shopInfo: IShopInfo

    const { req } = context

    if (req) {
      try {
        const option: AxiosRequestConfig = { headers: { Cookie: req.headers.cookie } }
        const shopInfoRes: IApiResponse = await ShopService.getInfo(option)

        shopInfo = shopInfoRes.data

        if (shopInfo?.approvalStatus === ShopApprovalStatusEnum.APPROVED) {
          return {
            redirect: {
              destination: '/seller/settings/product/list',
              permanent: true
            }
          }
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
          'auth.register-seller'
        ])),
        shopInfo
      }
    }
  }
)

const RegisterSellerPage: FC<IRegisterSellerPageProps> = (props: IRegisterSellerPageProps) => (
  <RegisterSeller shopInfo={props.shopInfo} />
)

export default RegisterSellerPage
