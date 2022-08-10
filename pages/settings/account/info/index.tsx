import React, { FC } from 'react'
import { AxiosResponse } from 'axios'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Profile from '~/modules/Profile'
import { LocaleNamespaceConst } from '~/constants'
import { MembersService } from '~/services'
import { AuthGetToken } from '~/utils/main'

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  console.log('AuthGetToken-', AuthGetToken())
  try {
    const result: AxiosResponse = await MembersService.memberProfile()

    // console.log('result-', result)
  } catch (error) {
    // console.log(error)
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'account-info']))
    }
  }
}
const ProfilePage: FC = () => <Profile />

export default ProfilePage
