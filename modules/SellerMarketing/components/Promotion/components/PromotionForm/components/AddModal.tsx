import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Button, Row, Col, Modal, Image } from 'antd'
import { LocaleNamespaceConst } from '~/constants'

const { Text, Title } = Typography

interface IAddModalProps {
  isOpen: Boolean
  toggle: () => void
}

const AddModal: FC<IAddModalProps> = (props: IAddModalProps) => {
  const { t } = useTranslation(LocaleNamespaceConst)

  function toggle(): void {
    props.toggle()
  }

  function onSubmit(): void {}

  return (
    <Modal
      title={<Title className="mb-0" level={4}></Title>}
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
    ></Modal>
  )
}

AddModal.defaultProps = {}

export default AddModal
