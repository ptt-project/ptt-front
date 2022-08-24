import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import AddAddress from '~/modules/Address/components/AddAddress'

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'address']))
    }
  }
}

const AddAddressPage: FC = () => (
  <AddAddress isSeller googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_TOKEN} />
)

export default AddAddressPage
