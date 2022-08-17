import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Email from '~/modules/Profile/components/Email'
import { LocaleNamespaceConst } from '~/constants'
import { ApiCodeEnum } from '~/enums'
import { IMemberProfile, IApiResponse } from '~/interfaces'
import { MembersService } from '~/services'

interface IProfilePageProps {
  profile: IMemberProfile
}

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  let profile: IMemberProfile[] = []
  try {
    const result: IApiResponse = await MembersService.getAddresses()
    if (result.code === ApiCodeEnum.SUCCESS) {
      profile = result.data
      console.log(profile)
    }
  } catch (error) {
    console.error(error)
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
