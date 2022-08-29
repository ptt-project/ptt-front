import { AxiosRequestConfig } from 'axios'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'
import { IAddress, IApiResponse } from '~/interfaces'
import Address, { IAddressProps } from '~/modules/Address'
import { MemberService } from '~/services'

type IAddressPageProps = Pick<IAddressProps, 'addresses'>

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> {
  let addresses: IAddress[] = []
  const { req } = context

  if (req) {
    try {
      const option: AxiosRequestConfig = { headers: { Cookie: req.headers.cookie } }
      const { data }: IApiResponse = await MemberService.getAddresses(option)
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

const AddressPage: FC<IAddressPageProps> = (props: IAddressPageProps) => (
  <Address addresses={props.addresses} />
)

export default AddressPage
