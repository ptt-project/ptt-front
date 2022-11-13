import React, { FC } from 'react'
import ForgotPassword from '~/modules/ForgotPassword'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LocaleNamespaceConst } from '~/constants'

interface IForgotPasswordCallbackPageProps {
  query: {
    email: string
    code: string
  }
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  const query: { email: string; code: string } = {
    email: (context.query?.email as string) || '',
    code: (context.query?.code as string) || ''
  }

  if (!query.email || !query.code) {
    return {
      redirect: {
        destination: '/error',
        permanent: true
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'auth.forgot-password',
        'auth.login'
      ])),
      query
    }
  }
}

const ForgotPasswordCallbackPage: FC<IForgotPasswordCallbackPageProps> = (
  props: IForgotPasswordCallbackPageProps
) => <ForgotPassword query={props.query} />

export default ForgotPasswordCallbackPage
