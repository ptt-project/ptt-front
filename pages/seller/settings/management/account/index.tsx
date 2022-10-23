import React, { FC } from 'react'
import AccountInfo from '~/modules/Account/components/AccountInfo'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, IMemberInfo } from '~/interfaces'
import { MemberService } from '~/services'
import { withSellerAuth } from '../../../../../hocs/with-seller'

interface IAccountInfoPageProps {
  info: IMemberInfo
}

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    let info: IMemberInfo
    const { req } = context

    if (req) {
      try {
        const option: AxiosRequestConfig = {
          headers: { Cookie: req.headers.cookie }
        }
        const { data }: IApiResponse = await MemberService.getProfile(option)
        info = data
      } catch (error) {
        console.error(error)

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
          'account-info'
        ])),
        info
      }
    }
  }
)

const AccountInfoPage: FC<IAccountInfoPageProps> = (props: IAccountInfoPageProps) => (
  <AccountInfo isSeller info={props.info} />
)

export default AccountInfoPage
