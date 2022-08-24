import { GetServerSidePropsResult, NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import AddAddress from '~/modules/Address/components/AddAddress'
import { AuthCheckAuthenticate } from '~/utils/main'

export async function getStaticProps(
  context: NextPageContext
): Promise<GetServerSidePropsResult<any>> {
  const authenticate: GetServerSidePropsResult<any> = AuthCheckAuthenticate(context)
  if (authenticate) {
    return authenticate
  }

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
