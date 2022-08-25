import React from 'react'
import { NextPage, NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import Profile from '~/modules/Profile'
import { LocaleNamespaceConst } from '~/constants'
import { IMemberProfile, IApiResponse } from '~/interfaces'
import { MembersService } from '~/services'

interface IProfilePageProps {
  profile: IMemberProfile
}

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  let profile: IMemberProfile

  const { req } = context
  if (req) {
    try {
      const option: AxiosRequestConfig = {
        headers: { Cookie: req.headers.cookie }
      }
      const { data }: IApiResponse = await MembersService.getProfile(option)
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

const ProfilePage: NextPage<IProfilePageProps> = (props: IProfilePageProps) => (
  <Profile profile={props.profile} />
)

export default ProfilePage
