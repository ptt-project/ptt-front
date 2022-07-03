import React, { FC } from 'react'
import ProfileLayout from '~/layouts/ProfileLayout'
import ChangePassword from '~/modules/ChangePassword'

const ChangePasswordPage: FC = () => (
  <ProfileLayout>
    <ChangePassword />
  </ProfileLayout>
)
export default ChangePasswordPage
