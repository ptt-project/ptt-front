import { AxiosRequestConfig } from 'axios'
import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { IAddress, IApiResponse } from '~/interfaces'
import EditAddress, { IEditAddressProps } from '~/modules/Address/components/EditAddress'
import { MemberService } from '~/services'

type IEditAddressPageProps = Pick<IEditAddressProps, 'address' | 'googleMapsApiKey'>

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IEditAddressPageProps>> {
  let address: IAddress | null = null
  const { query, req } = context
  const { addressId } = query || {}

  if (req) {
    try {
      if (addressId?.toString()) {
        const option: AxiosRequestConfig = { headers: { Cookie: req.headers.cookie } }
        const { data }: IApiResponse = await MemberService.getAddress(addressId.toString(), option)
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
  }

  console.log({ addressId, address })

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
