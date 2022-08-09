import Cookies from 'js-cookie'
import { IAuthLoginRes, IAuthUserInfo } from '~/interfaces'

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
