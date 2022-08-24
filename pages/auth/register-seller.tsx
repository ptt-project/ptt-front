import React, { FC } from 'react'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import { isEmpty } from 'lodash'
import RegisterSeller from '~/modules/RegisterSeller'
import { LocaleNamespaceConst } from '~/constants'
import { AuthCheckAuthenticate } from '~/utils/main'
import { IApiResponse, ISellerInfoRes } from '~/interfaces'
import { SellersService } from '~/services'
import { ApiCodeEnum } from '~/enums'

interface IRegisterSellerPageProps {
  shopInfo?: ISellerInfoRes
}

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  const authenticate: boolean = AuthCheckAuthenticate(context)
  if (!isEmpty(authenticate)) {
    return authenticate
  }

  let shopInfo: ISellerInfoRes

  const { req } = context
  if (req) {
    try {
      const option: AxiosRequestConfig = {
        headers: { Cookie: req.headers.cookie }
      }
      const result: IApiResponse = await SellersService.shopInfo(option)
      if (result.code === ApiCodeEnum.SUCCESS) {
        shopInfo = result.data
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

const RegisterSellerPage: FC<IRegisterSellerPageProps> = (props: IRegisterSellerPageProps) => (
  <RegisterSeller shopInfo={props.shopInfo} />
)

RegisterSellerPage.defaultProps = {
  shopInfo: null
}

export default RegisterSellerPage
