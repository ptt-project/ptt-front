import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { IAddress, IApiResponse } from '~/interfaces'
import Address, { IAddressProps } from '~/modules/Address'
import { MemberService } from '~/services'

type IAddressPageProps = Pick<IAddressProps, 'addresses'>

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  let addresses: IAddress[] = []

  try {
    const { data }: IApiResponse<IAddress[]> = await MemberService.getAddresses()
    console.log({ data })
    addresses = data || []
  } catch (error) {
    console.log(error)

    return {
      redirect: {
        destination: '/error',
        permanent: true
      }
    }
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
