import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { SellerApprovalStatusEnum } from '../enums'
import { IAuthToken, IAuthUserInfo } from '../interfaces'
import { AuthGetServerSideTokenUtil, AuthGetServerSideUserInfoUtil } from '../utils/main'

export const withSellerAuth =
  (gssp: GetServerSideProps) =>
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
    const { req, locale: rawLocale, resolvedUrl } = context
    const locale: string = rawLocale === 'th' ? '' : rawLocale

    if (req) {
      const { accessToken, refreshToken }: IAuthToken = AuthGetServerSideTokenUtil(
        req.headers.cookie
      )
      if (!accessToken || !refreshToken) {
        return {
          redirect: {
            destination: `${locale}/auth/login?redirect=${resolvedUrl}`,
            permanent: false
          }
        }
      }

      const userInfo: IAuthUserInfo | undefined = AuthGetServerSideUserInfoUtil(req.headers.cookie)
      if (userInfo?.approvalStatus !== SellerApprovalStatusEnum.APPROVED) {
        // return {
        //   redirect: {
        //     destination: `${locale}/auth/register-seller`,
        //     permanent: false
        //   }
        // }
      }
    }

    const gsspProps: GetServerSidePropsResult<any> = await gssp(context)

    return gsspProps
  }
