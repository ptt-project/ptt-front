import React, { FC } from 'react'
import ProfileLayout from '~/layouts/ProfileLayout'
import AddAddress from '~/modules/Address/components/AddAddress'

const AddAddressPage: FC = () => (
  <ProfileLayout>
    <AddAddress />
  </ProfileLayout>
)

export default AddAddressPage
