import React, { FC } from 'react'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Profile from '~/modules/Profile'
import { LocaleNamespaceConst } from '~/constants'
import { MembersService } from '~/services'
import { IApiResponse, IMemberProfile } from '~/interfaces'
import { ApiCodeEnum } from '~/enums'

interface IProfilePageProps {
  profile: IMemberProfile
}

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  let profile: IMemberProfile = {
    username: '',
    firstName: '',
    lastName: '',
    mobile: '',
    birthday: '',
    gender: '',
    email: ''
  }

  try {
    const result: IApiResponse = await MembersService.getProfile()
    if (result.code === ApiCodeEnum.SUCCESS) {
      profile = result.data
    }
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'account-info'])),
      profile
    }
  }
}

const ProfilePage: FC<IProfilePageProps> = (props: IProfilePageProps) => (
  <Profile profile={props.profile} />
)

export default ProfilePage
