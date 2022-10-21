import React, { FC } from 'react'
import AccountMobile from '~/modules/Account/components/AccountMobile'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, IMemberMobile } from '~/interfaces'
import { MemberService } from '~/services'
import { withAuth } from '../../../../hocs/with-user'

interface IAccountMobilePageProps {
  mobiles: IMemberMobile[]
}

export const getServerSideProps: any = withAuth(async (context: GetServerSidePropsContext) => {
  let mobiles: IMemberMobile[] = []
  const { req } = context

  if (req) {
    try {
      const option: AxiosRequestConfig = {
        headers: { Cookie: req.headers.cookie }
      }
      const { data }: IApiResponse = await MemberService.getMobiles(option)
      mobiles = data
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
      mobiles
    }
  }
})

const AccountMobilePage: FC<IAccountMobilePageProps> = (props: IAccountMobilePageProps) => (
  <AccountMobile mobiles={props.mobiles} />
)

export default AccountMobilePage
