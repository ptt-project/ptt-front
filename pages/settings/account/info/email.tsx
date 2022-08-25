import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Email from '~/modules/Profile/components/Email'
import { LocaleNamespaceConst } from '~/constants'
import { IMemberProfile, IApiResponse } from '~/interfaces'
import { MembersService } from '~/services'

interface IProfilePageProps {
  profile: IMemberProfile
}

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  let profile: IMemberProfile[] = []
  try {
    const { data }: IApiResponse = await MembersService.getAddresses()
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
const EmailPage: NextPage<IProfilePageProps> = (props: IProfilePageProps) => (
  <Email profile={props.profile} />
)

export default EmailPage
