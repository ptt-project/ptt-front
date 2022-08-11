import cookie from 'cookie'
import Cookies from 'js-cookie'
import { isEmpty } from 'lodash'
import { IAuthLoginRes, IAuthToken, IAuthUserInfo } from '~/interfaces'

export const AuthInitUtil = (data: IAuthLoginRes): void => {
  Cookies.set('AccessToken', data.accessToken)
  Cookies.set('RefreshToken', data.refreshToken)

  const userInfo: IAuthUserInfo = {
    username: data.username,
    firstname: data.firstname,
    lastname: data.lastname,
    mobile: data.mobile,
    email: data.email
  }

  Cookies.set('UserInfo', JSON.stringify(userInfo))
}

export const AuthDestroyUtil = (): void => {
  Cookies.remove('AccessToken')
  Cookies.remove('RefreshToken')
  Cookies.remove('UserInfo')
}

export const AuthGetTokenUtil = (): IAuthToken => {
  const accessToken: string = Cookies.get('AccessToken')
  const refreshToken: string = Cookies.get('RefreshToken')

  return {
    accessToken,
    refreshToken
  }
}

export const AuthGetServerSideTokenUtil = (rawCookie: string): IAuthToken => {
  const cookies: any = cookie.parse(rawCookie)
  const accessToken: string = cookies.AccessToken || ''
  const refreshToken: string = cookies.RefreshToken || ''

  return {
    accessToken,
    refreshToken
  }
}

export const AuthGetUserInfoUtil = (): IAuthUserInfo | undefined => {
  const rawUserInfo: string = Cookies.get('UserInfo')
  if (!isEmpty(rawUserInfo)) {
    return JSON.parse(rawUserInfo)
  }

  return undefined
}
