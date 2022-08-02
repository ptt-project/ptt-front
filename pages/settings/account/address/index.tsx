import React, { FC } from 'react'
import { connect } from 'react-redux'
import { IAddressFormValues } from '~/interfaces'
import Address from '~/modules/Address'

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
