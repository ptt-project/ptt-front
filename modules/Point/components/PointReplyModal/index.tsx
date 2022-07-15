import React, { ChangeEvent, FC, useState } from 'react'
import { Typography, Button, Col, Modal, Row, Avatar, Rate, Input, Form } from 'antd'
import t from '~/locales'
import styles from './PointReplyModal.module.scss'

const { Text, Title } = Typography
const { TextArea } = Input

interface IPointReplyModalProps {
  isOpen: boolean
  name: string
  urlImg: string
  rate: number
  detail: string
  toggle: () => void
}

interface IFormModel {
  msgReply: string
}

const PointReplyModal: FC<IPointReplyModalProps> = (props: IPointReplyModalProps) => {
  const [form] = Form.useForm()
  const [isButtonForm, setIsButtonForm] = useState<boolean>(true)

  function toggle(): void {
    props.toggle()
  }

  function onSubmit(values: IFormModel): void {
    console.log(values)
    toggle()
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    if (e.target.value) {
      setIsButtonForm(false)
    } else {
      setIsButtonForm(true)
    }
  }
  return (
    <Modal
      title={[
        <Title level={4}>
          <i className={`fas fa-info-circle ${styles.iconInfo}`} />
          {t('shopPoint.reply')}
        </Title>
      ]}
      visible={props.isOpen}
      onCancel={toggle}
      footer={null}
      closable={false}
    >
      <Form layout="vertical" form={form} name="accountProfile" onFinish={onSubmit}>
        <Row gutter={[8, 8]} className="ml-2">
          <Col>
            <Avatar src={props.urlImg} />
          </Col>
          <Col className="mt-1">
            <Text>{props.name}</Text>
          </Col>
          <Col>
            <Rate value={props.rate} />
          </Col>
        </Row>
        <Col className="mt-2">
          <Text>{props.detail}</Text>
        </Col>
        <Col className="mt-2">
          <Text>{t('shopPoint.msgReply')}*</Text>
        </Col>
        <Col className="mt-2">
          <TextArea showCount maxLength={500} style={{ height: 200 }} onChange={handleChange} />
        </Col>
        <Col className="text-right mt-10">
          <Button type="default" onClick={toggle}>
            {t('common.cancel')}
          </Button>
          <Button
            htmlType="submit"
            className={`ml-1 ${styles.btnSubmit}`}
            type="primary"
            disabled={isButtonForm}
          >
            {t('common.send')}
          </Button>
        </Col>
      </Form>
    </Modal>
  )
}

export default PointReplyModal
