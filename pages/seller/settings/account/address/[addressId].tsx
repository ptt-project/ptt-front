import { GetServerSidePropsResult, NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { IAddress, IApiResponse } from '~/interfaces'
import EditAddress, { IEditAddressProps } from '~/modules/Address/components/EditAddress'
import { MembersService } from '~/services'

type IEditAddressPageProps = Pick<IEditAddressProps, 'address' | 'googleMapsApiKey'>

export async function getServerSideProps(
  context: NextPageContext
): Promise<GetServerSidePropsResult<IEditAddressPageProps>> {
  let address: IAddress
  const { query } = context
  const { addressId } = query || {}
  try {
    if (addressId?.toString()) {
      const { data }: IApiResponse<IAddress> = await MembersService.getAddress(addressId.toString())
      address = data
    }
  } catch (error) {
    console.log(error)

    return {
      redirect: {
        destination: '/error',
        permanent: true
      }
    }
  }
  if (!address) {
    return {
      redirect: {
        destination: '/settings/account/address',
        permanent: true
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
  <EditAddress isSeller address={props.address} googleMapsApiKey={props.googleMapsApiKey} />
)

export default EditAddressPage
