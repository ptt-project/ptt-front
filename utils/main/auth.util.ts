import Cookie from 'cookie'
import JsCookie from 'js-cookie'
import { isEmpty } from 'lodash'
import { IAuthLogin, IAuthToken, IAuthUserInfo } from '~/interfaces'

export const AuthInitUtil = (data: IAuthLogin): void => {
  // Set From API
  // JsCookie.set('AccessToken', data.accessToken)
  // JsCookie.set('RefreshToken', data.refreshToken)

  const userInfo: IAuthUserInfo = {
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
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
  const accessToken: string = JsCookie.get('AccessToken') || ''
  const refreshToken: string = JsCookie.get('RefreshToken') || ''

  return {
    accessToken,
    refreshToken
  }
}

export const AuthGetServerSideTokenUtil = (cookie: string | undefined): IAuthToken => {
  let cookies: any = {}
  if (cookie) {
    cookies = Cookie.parse(cookie)
  }

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

export const AuthGetServerSideUserInfoUtil = (
  cookie: string | undefined
): IAuthUserInfo | undefined => {
  let cookies: any = {}
  if (cookie) {
    cookies = Cookie.parse(cookie)
  }

  return cookies.userInfo
}
