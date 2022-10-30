import React, { FC } from 'react'
import RegisterSeller from '~/modules/RegisterSeller'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, ISellerInfo } from '~/interfaces'
import { SellerService } from '~/services'
import { SellerApprovalStatusEnum } from '~/enums'
import { withSellerAuth } from '../../hocs/with-seller'

interface IRegisterSellerPageProps {
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
        const shopInfoRes: IApiResponse = await SellerService.shopInfo(option)

        shopInfo = shopInfoRes.data

        if (shopInfo.approvalStatus === SellerApprovalStatusEnum.APPROVED) {
          return {
            redirect: {
              destination: '/seller/settings/product/list',
              permanent: true
            }
          }
        }
      } catch (error) {
        console.log(error)

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
