import React, { FC } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import Email from '~/modules/Profile/components/Email'
import { LocaleNamespaceConst } from '~/constants'
import { IMemberProfile, IApiResponse } from '~/interfaces'
import { MemberService } from '~/services'

interface IProfilePageProps {
  profile: IMemberProfile
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  let profile: IMemberProfile[] = []
  const { req } = context
  if (req) {
    try {
      const option: AxiosRequestConfig = {
        headers: { Cookie: req.headers.cookie }
      }
      const { data }: IApiResponse = await MemberService.getProfile(option)
      profile = data
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
      profile
    }
  }
}
const EmailPage: FC<IProfilePageProps> = (props: IProfilePageProps) => (
  <Email profile={props.profile} />
)

export default EmailPage
