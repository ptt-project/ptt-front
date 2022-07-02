
import React, {  FC,useEffect } from 'react'
import { Typography, Button, Row, Col, Input, Modal } from 'antd'
import t from '~/locales'

const { Text } = Typography
interface IDelPhoneModalProps {
    isOpen: boolean
    toggle: () => void
}
const DelPhoneModal: FC<IDelPhoneModalProps> = (props: IDelPhoneModalProps) => {
      function toggle(): void {
        props.toggle()
      }
    return (
        <>
      <Modal title={t('accountProfile.phone.deletePhone')} visible={props.isOpen} onCancel={toggle}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
      )
}
export default DelPhoneModal