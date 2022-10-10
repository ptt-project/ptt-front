import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import EditVocher from '~/modules/SellerMarketing/components/Voucher/components/EditVocher'
import { withSellerAuth } from '../../../../../hocs/with-seller'

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(context.locale, [
          ...LocaleNamespaceConst,
          'seller.marketing'
        ]))
      }
    }
  }
)

const VocherEditPage: FC = () => <EditVocher />

export default VocherEditPage
