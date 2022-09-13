import React, { FC } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import Phone from '~/modules/Profile/components/Phone'
import { IMemberMobile, IApiResponse } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { MemberService } from '~/services'

interface IMemberMobilePageProps {
  mobile: IMemberMobile
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  let mobile: IMemberMobile
  const { req } = context
  if (req) {
    try {
      const option: AxiosRequestConfig = {
        headers: { Cookie: req.headers.cookie }
      }
      const { data }: IApiResponse = await MemberService.getMobile(option)
      mobile = data
    } catch (error) {
      console.error('error', error)

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
      mobile
    }
  }
}
const PhonePage: FC<IMemberMobilePageProps> = (props: IMemberMobilePageProps) => (
  <Phone mobile={props.mobile} />
)

export default PhonePage
