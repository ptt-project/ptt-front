import React, { FC } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import RegisterSeller from '~/modules/RegisterSeller'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, ISellerInfoRes } from '~/interfaces'
import { SellerService } from '~/services'
import { SellerApprovalStatusEnum } from '~/enums'
import { withSellerAuth } from '../../hocs/with-seller'

interface IRegisterSellerPageProps {
  shopInfo?: ISellerInfoRes
}

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    let shopInfo: ISellerInfoRes
    const { req } = context

    if (req) {
      try {
        const option: AxiosRequestConfig = {
          headers: { Cookie: req.headers.cookie }
        }
        const { data }: IApiResponse = await SellerService.shopInfo(option)
        shopInfo = data

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

RegisterSellerPage.defaultProps = {
  shopInfo: null
}

export default RegisterSellerPage
