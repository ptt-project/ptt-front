import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import AddAddress from '~/modules/Address/components/AddAddress'
import { withSellerAuth } from '../../../../../hocs/with-seller'

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => ({
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'address',
        'setting-sidebar'
      ]))
    }
  })
)

const AddAddressPage: FC = () => (
  <AddAddress isSeller googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_TOKEN} />
)

export default AddAddressPage
