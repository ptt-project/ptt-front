
import React, {  FC } from 'react'
import { Typography, Button, Col, Modal } from 'antd'
import t from '~/locales'
import styles from './Profile.module.scss'

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
    <Modal 
      title={[
        <Col className='text-left'>
          <Text >
            <i className={`fas fas fa-exclamation-circle ${styles.iconDander}`} />
          </Text>
          <Text className='ml-1'>
            {t('accountProfile.phone.deletePhone')}
          </Text>
        </Col> 
      ]} 
      visible={props.isOpen} onCancel={toggle}   
      footer={[
        <Col className='text-right'>
          <Button type="default" onClick={toggle}>
            {t('common.close')}
          </Button>
          <Button type="primary">
            {t('common.confirm')}
          </Button>
        </Col>
      ]}>
      <Col><Text>{t('accountProfile.phone.confirmDelete')} 081-2226666</Text></Col>
      <Col><Text type="danger">{t('accountProfile.phone.msgConfirmDelete')}</Text></Col>
    </Modal>
  )
}
export default DelPhoneModal