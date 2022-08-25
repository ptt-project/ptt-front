import React, { FC } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
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
  try {
    const { data }: IApiResponse = await MemberService.getAddresses()
    profile = data
    console.log(profile)
  } catch (error) {
    console.log(error)

    return {
      redirect: {
        destination: '/error',
        permanent: true
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'account-info']))
    }
  }
}
const EmailPage: FC<IProfilePageProps> = (props: IProfilePageProps) => (
  <Email profile={props.profile} />
)

export default EmailPage
