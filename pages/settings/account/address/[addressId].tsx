import { GetServerSidePropsResult, NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { IAddress } from '~/interfaces'
import EditAddress, { IEditAddressProps } from '~/modules/Address/components/EditAddress'
import { MembersService } from '~/services'

type IEditAddressPageProps = Pick<IEditAddressProps, 'address' | 'googleMapsApiKey'>

export async function getServerSideProps(
  context: NextPageContext
): Promise<GetServerSidePropsResult<IEditAddressPageProps>> {
  let address: IAddress
  const { req, query } = context
  const { addressId } = query || {}
  if (req && addressId && typeof addressId === 'string') {
    try {
      const { data } = await MembersService.getAddress(req, addressId)

      if (!data?.data) {
        // if no found throw error for redirect to page address list in catch handle
        throw new Error('no data')
      }

      address = data.data
    } catch (error) {
      console.error(error)
      return {
        redirect: {
          destination: '/settings/account/address',
          permanent: true
        }
      }
    }
  }
  const googleMapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_TOKEN
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'address'])),
      address,
      googleMapsApiKey
    }
  }
}

const EditAddressPage: FC = (props: IEditAddressPageProps) => (
  <EditAddress address={props.address} googleMapsApiKey={props.googleMapsApiKey} />
)

export default EditAddressPage
