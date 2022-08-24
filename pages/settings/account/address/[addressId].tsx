import { GetServerSidePropsResult, NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { ApiCodeEnum } from '~/enums'
import { IAddress, IApiResponse } from '~/interfaces'
import EditAddress, { IEditAddressProps } from '~/modules/Address/components/EditAddress'
import { MembersService } from '~/services'
import { AuthCheckAuthenticate } from '~/utils/main'

type IEditAddressPageProps = Pick<IEditAddressProps, 'address' | 'googleMapsApiKey'>

export async function getServerSideProps(
  context: NextPageContext
): Promise<GetServerSidePropsResult<IEditAddressPageProps>> {
  const authenticate: GetServerSidePropsResult<any> = AuthCheckAuthenticate(context)
  if (authenticate) {
    return authenticate
  }

  let address: IAddress | null = null
  const { query, req } = context
  const { headers } = req
  const { addressId } = query || {}
  try {
    if (addressId?.toString()) {
      const result: IApiResponse<IAddress> = await MembersService.getAddress(
        addressId.toString(),
        headers
      )
      if (result?.code === ApiCodeEnum.SUCCESS) {
        address = result?.data
      } else {
        // if no found throw error for redirect to page address list in catch handle
        throw new Error('no data')
      }
    }
  } catch (error) {
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
  <EditAddress address={props.address} googleMapsApiKey={props.googleMapsApiKey} />
)

export default EditAddressPage
