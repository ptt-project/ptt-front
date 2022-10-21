import React, { FC } from 'react'
import AccountAddMobile from '~/modules/Account/components/AccountAddMobile'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, IMemberMobile } from '~/interfaces'
import { MemberService } from '~/services'
import { withAuth } from '../../../../hocs/with-user'

interface IAccountAddMobilePageProps {
  mobile: IMemberMobile
}

export const getServerSideProps: any = withAuth(async (context: GetServerSidePropsContext) => {
  let mobile: IMemberMobile
  const { req } = context

  if (req) {
    try {
      const option: AxiosRequestConfig = {
        headers: { Cookie: req.headers.cookie }
      }
      const res: IApiResponse<IMemberMobile[]> = await MemberService.getMobiles(option)

      if (res.data) {
        mobile = res.data.find((item: IMemberMobile) => item.isPrimary === true)
      }

      if (!mobile) {
        return {
          redirect: {
            destination: '/error',
            permanent: true
          }
        }
      }
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
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'account-info',
        'setting-sidebar'
      ])),
      mobile
    }
  }
})

const AccountAddMobilePage: FC<IAccountAddMobilePageProps> = (
  props: IAccountAddMobilePageProps
) => <AccountAddMobile mobile={props.mobile} />

export default AccountAddMobilePage
