
import React, {  FC } from 'react'
import { Typography, Button, Col, Modal } from 'antd'
import t from '~/locales'
import styles from './ConfirmationModal.module.scss'

const { Text } = Typography
interface IConfirmationModalProps {
  isOpen: boolean
  type: string
  title: string
  toggle: () => void
}
const ConfirmationModal: FC<IConfirmationModalProps> = (props: IConfirmationModalProps) => {
  function toggle(): void {
    props.toggle()
  }

  function getTypeModal(): JSX.Element {
    switch (props.type) {
      case 'error':
        return <i className={`fas fa-exclamation-circle ${styles.iconError}`} />
      case 'warning':
        return <i className={`fas fa-exclamation-triangle ${styles.iconWarning}`} />
      case 'info':
        return <i className={`fas fa-info-circle ${styles.iconInfo}`} /> 
      case 'success':
        return <i className={`fas fa-check-circle ${styles.iconSuccess}`} /> 
      default:
        return <i className={`fas fa-exclamation-circle ${styles.iconError}`} />
    }
  }
  return (
    <Modal 
      title={[
        <Col className='text-left'>
          <Text>{getTypeModal()}</Text>
          <Text className='ml-1'>{props.title}</Text>
        </Col> 
      ]} 
      visible={props.isOpen} onCancel={toggle} footer={null} closable={false}>
      <Col><Text>{t('accountProfile.phone.confirmDelete')} 081-2226666</Text></Col>
      <Col><Text type="danger">{t('accountProfile.phone.msgConfirmDelete')}</Text></Col>
      <Col className='text-right'>
        <Button type="default" onClick={toggle}>{t('common.cancel')}</Button>
        <Button className='ml-1' type="primary">{t('common.ok')}</Button>
      </Col>
    </Modal>
  )
}

export default ConfirmationModal