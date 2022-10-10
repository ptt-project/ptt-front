import React, { FC } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import Profile from '~/modules/Profile'
import { LocaleNamespaceConst } from '~/constants'
import { IMemberProfilePayload, IApiResponse } from '~/interfaces'
import { MemberService } from '~/services'
import { withAuth } from '../../../../hocs/with-user'

interface IProfilePageProps {
  profile: IMemberProfilePayload
}

export const getServerSideProps: any = withAuth(async (context: GetServerSidePropsContext) => {
  let profile: IMemberProfilePayload
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
})

const ProfilePage: FC<IProfilePageProps> = (props: IProfilePageProps) => (
  <Profile profile={props.profile} />
)

export default ProfilePage
