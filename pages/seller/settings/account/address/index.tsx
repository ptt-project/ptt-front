import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { ApiCodeEnum } from '~/enums'
import { IAddress, IApiResponse } from '~/interfaces'
import Address, { IAddressProps } from '~/modules/Address'
import { MembersService } from '~/services'

type IAddressPageProps = Pick<IAddressProps, 'addresses'>

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  let addresses: IAddress[] = []

  try {
    const result: IApiResponse<IAddress[]> = await MembersService.getAddresses()
    console.log(JSON.stringify({ result }))
    if (result?.code === ApiCodeEnum.SUCCESS) {
      console.log({ data: result.data })
      addresses = result?.data || []
    }
  } catch (error) {
    // console.error(error)
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
