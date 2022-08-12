import React, { FC } from 'react'
import { AxiosResponse } from 'axios'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Profile from '~/modules/Profile'
import { LocaleNamespaceConst } from '~/constants'
import { MembersService } from '~/services'
import { IMemberProfile } from '~/interfaces'
import { CommonApiCodeEnum } from '~/enums'

interface IProps {
  member: IMemberProfile
}

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  let member: IMemberProfile = {
    username: '',
    firstName: '',
    lastName: '',
    mobile: '',
    birthday: '',
    gender: '',
    email: ''
  }

  const { req } = context
  if (req) {
    try {
      const result: AxiosResponse = await MembersService.memberProfile(req)
      if (result.data?.code === CommonApiCodeEnum.SUCCESS) {
        member = result.data.data
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'account-info'])),
      member
    }
  }
}

const ProfilePage: FC<IProps> = (props: IProps) => <Profile member={props.member} />

export default ProfilePage
