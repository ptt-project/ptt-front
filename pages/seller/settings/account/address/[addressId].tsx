import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { IAddress, IApiResponse } from '~/interfaces'
import EditAddress, { IEditAddressProps } from '~/modules/Address/components/EditAddress'
import { MemberService } from '~/services'
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
      const { data }: IApiResponse = await MemberService.getAddress(addressId.toString())
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
        destination: '/seller/settings/account/address',
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
