import React, { FC } from 'react'
import ProfileLayout from '~/layouts/ProfileLayout'
import EditAddress from '~/modules/Address/components/EditAddress'

const EditAddressPage: FC = () => (
  <ProfileLayout>
    <EditAddress />
  </ProfileLayout>
)

export default EditAddressPage
