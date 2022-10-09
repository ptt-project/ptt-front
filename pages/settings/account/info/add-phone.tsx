import React, { FC } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AddPhone from '~/modules/Profile/components/Phone/AddPhone'
import { LocaleNamespaceConst } from '~/constants'
import { withAuth } from '../../../../hocs/with-user'

export const getServerSideProps: any = withAuth(async (context: GetServerSidePropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'account-info']))
    }
  }
})

const AddPhonePage: FC = () => <AddPhone />

export default AddPhonePage
