import React, { FC } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ForgotPassword from '~/modules/ForgotPassword'
import { LocaleNamespaceConst } from '~/constants'
import { OtpReferenceTypeEnum } from '~/enums'

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'auth.forgot-password'
      ]))
    }
  }
}

const ForgotPasswordCallbackPage: FC = () => (
  <ForgotPassword
    step={2}
    reference="einost_fi@hotmail.com"
    referenceType={OtpReferenceTypeEnum.EMAIL}
  />
)

export default ForgotPasswordCallbackPage
