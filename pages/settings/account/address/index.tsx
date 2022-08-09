import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { connect } from 'react-redux'
import { LocaleNamespaceConst } from '~/constants'
import { IAddressFormValues } from '~/interfaces'
import Address from '~/modules/Address'

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst, 'address']))
    }
  }
}

interface IAddressPageProps {
  addresses: IAddressFormValues[]
}
const AddressPage: FC<IAddressPageProps> = (props: IAddressPageProps) => {
  console.log({
    addresses: props.addresses
  })

  return <Address />
}

function mapStateToProps(state: any): any {
  console.log({ state })
  return {
    addresses: state?.address?.addresses || []
  }
}

export default connect(mapStateToProps, {})(AddressPage)
