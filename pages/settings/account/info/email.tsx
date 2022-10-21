import React, { FC } from 'react'
import AccountEmail from '~/modules/Account/components/AccountEmail'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, IMemberInfo } from '~/interfaces'
import { MemberService } from '~/services'
import { withAuth } from '../../../../hocs/with-user'

interface IAccountEmailPageProps {
  info: IMemberInfo
}

export const getServerSideProps: any = withAuth(async (context: GetServerSidePropsContext) => {
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
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'account-info'])),
      info
    }
  }
})

const AccountEmailPage: FC<IAccountEmailPageProps> = (props: IAccountEmailPageProps) => (
  <AccountEmail info={props.info} />
)

export default AccountEmailPage
