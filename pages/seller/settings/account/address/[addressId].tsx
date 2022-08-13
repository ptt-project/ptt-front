import { GetServerSidePropsResult, NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { ApiCodeEnum } from '~/enums'
import { IAddress, IApiResponse } from '~/interfaces'
import EditAddress, { IEditAddressProps } from '~/modules/Address/components/EditAddress'
import { MembersService } from '~/services'

type IEditAddressPageProps = Pick<IEditAddressProps, 'address'>

export async function getServerSideProps(
  context: NextPageContext
): Promise<GetServerSidePropsResult<IEditAddressPageProps>> {
  let address: IAddress
  const { query } = context
  const { addressId } = query || {}

  try {
    const result: IApiResponse = await MembersService.getAddress(addressId.toString())

    if (result.code === ApiCodeEnum.SUCCESS) {
      address = result.data
    } else {
      // if no found throw error for redirect to page address list in catch handle
      throw new Error('no data')
    }
  } catch (error) {
    console.error(error)
    return {
      redirect: {
        destination: '/settings/account/address',
        permanent: true
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'address'])),
      address
    }
  }
}

const EditAddressPage: FC = (props: IEditAddressPageProps) => (
  <EditAddress isSeller address={props.address} />
)

export default EditAddressPage
