import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Button, Row, Col, Modal, Image } from 'antd'
import styles from './ConfirmationModal.module.scss'
import { LocaleNamespaceConst } from '~/constants'

const { Text, Title } = Typography

interface IConfirmationModalProps {
  isOpen: boolean
  type: string
  title: string
  content: string
  contentWarning?: string
  contentImg?: string
  contentTextImg?: string
  toggle: () => void
  onSubmit: () => void
}

const ConfirmationModal: FC<IConfirmationModalProps> = (props: IConfirmationModalProps) => {
  const { t } = useTranslation(LocaleNamespaceConst)

  function toggle(): void {
    props.toggle()
  }

  function onSubmit(): void {
    props.onSubmit()
  }

  function getTypeIconModal(): JSX.Element {
    switch (props.type) {
      case 'success':
        return <i className={`fas fa-check-circle mr-2 ${styles.iconSuccess}`} />
      case 'warning':
        return <i className={`fas fa-exclamation-triangle mr-2 ${styles.iconWarning}`} />
      case 'info':
        return <i className={`fas fa-info-circle mr-2 ${styles.iconInfo}`} />
      case 'error':
        return <i className={`fas fa-exclamation-circle mr-2 ${styles.iconError}`} />
      default:
        return <i className={`fas fa-info-circle mr-2 ${styles.iconInfo}`} />
    }
  }

  return (
    <Modal
      title={
        <Title className="mb-0" level={4}>
          {getTypeIconModal()}
          {props.title}
        </Title>
      }
      visible={props.isOpen}
      onCancel={toggle}
      footer={
        <Row>
          <Col className="text-right" span={24}>
            <Button type="default" onClick={toggle}>
              {t('common:cancel')}
            </Button>
            <Button className="ml-2" type="primary" onClick={onSubmit}>
              {t('common:ok')}
            </Button>
          </Col>
        </Row>
      }
      closable={false}
    >
      <Col>
        <Text>{props.content}</Text>
      </Col>
      {props.contentWarning && (
        <Col>
          <Text type="danger">{props.contentWarning}</Text>
        </Col>
      )}
      {props.contentImg && (
        <Col>
          <Image preview={false} width={48} src={props.contentImg} alt={props.title} />
          <Text>{props.contentTextImg}</Text>
        </Col>
      )}
    </Modal>
  )
}

ConfirmationModal.defaultProps = {
  contentWarning: '',
  contentImg: '',
  contentTextImg: ''
}

export default ConfirmationModal
