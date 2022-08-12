import Cookie from 'cookie'
import JsCookie from 'js-cookie'
import { isEmpty } from 'lodash'
import { IAuthLoginRes, IAuthToken, IAuthUserInfo } from '~/interfaces'

export const AuthInitUtil = (data: IAuthLoginRes): void => {
  JsCookie.set('AccessToken', data.accessToken)
  JsCookie.set('RefreshToken', data.refreshToken)

  const userInfo: IAuthUserInfo = {
    username: data.username,
    firstname: data.firstname,
    lastname: data.lastname,
    mobile: data.mobile,
    email: data.email
  }

  JsCookie.set('UserInfo', JSON.stringify(userInfo))
}

export const AuthDestroyUtil = (): void => {
  JsCookie.remove('AccessToken')
  JsCookie.remove('RefreshToken')
  JsCookie.remove('UserInfo')
}

export const AuthGetTokenUtil = (): IAuthToken => {
  const accessToken: string = JsCookie.get('AccessToken')
  const refreshToken: string = JsCookie.get('RefreshToken')

  return {
    accessToken,
    refreshToken
  }
}

export const AuthGetServerSideTokenUtil = (rawCookie: string): IAuthToken => {
  const cookies: any = Cookie.parse(rawCookie)
  const accessToken: string = cookies.AccessToken || ''
  const refreshToken: string = cookies.RefreshToken || ''

  return {
    accessToken,
    refreshToken
  }
}

export const AuthGetUserInfoUtil = (): IAuthUserInfo | undefined => {
  const rawUserInfo: string = JsCookie.get('UserInfo')
  if (!isEmpty(rawUserInfo)) {
    return JSON.parse(rawUserInfo)
  }

  return undefined
}
