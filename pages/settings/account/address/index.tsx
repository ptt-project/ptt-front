import { NextPage, NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { IAddress, IApiResponse } from '~/interfaces'
import Address, { IAddressProps } from '~/modules/Address'
import { MembersService } from '~/services'

type IAddressPageProps = Pick<IAddressProps, 'addresses'>

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  let addresses: IAddress[] = []
  const { req } = context
  const { headers } = req
  if (req) {
    try {
      const { data }: IApiResponse<IAddress[]> = await MembersService.getAddresses(headers)
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
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'address'])),
      addresses
    }
  }
}

const AddressPage: NextPage<IAddressPageProps> = (props: IAddressPageProps) => (
  <Address addresses={props.addresses} />
)

export default AddressPage
