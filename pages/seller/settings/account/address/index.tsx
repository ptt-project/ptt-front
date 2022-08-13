import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { IAddress } from '~/interfaces'
import Address, { IAddressProps } from '~/modules/Address'
import { MembersService } from '~/services'

type IAddressPageProps = Pick<IAddressProps, 'addresses'>

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  let addresses: IAddress[] = []

  try {
    const { data } = await MembersService.getAddresses()
    addresses = data.data
  } catch (error) {
    console.error(error)
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'address'])),
      addresses
    }
  }
}

const AddressPage: FC<IAddressPageProps> = (props: IAddressPageProps) => (
  <Address addresses={props.addresses} isSeller />
)

export default AddressPage
