import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Button, Col, Modal, Row, Avatar, Rate, Input, Form } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import styles from './ReplyModal.module.scss'

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

const ReplyModal: FC<IPointReplyModalProps> = (props: IPointReplyModalProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.point'])
  const [form] = Form.useForm()

  function toggle(): void {
    props.toggle()
  }

  function onSubmit(values: IFormModel): void {
    console.log(values)
    toggle()
  }

  return (
    <Modal
      title={[
        <Title className="mb-0" level={4}>
          <i className={`fas fa-info-circle mr-2 ${styles.iconInfo}`} />
          {t('seller.point:reply')}
        </Title>
      ]}
      visible={props.isOpen}
      onCancel={toggle}
      footer={null}
      closable={false}
    >
      <Form layout="vertical" form={form} name="replyForm" onFinish={onSubmit}>
        <Row gutter={[0, 16]} align="middle">
          <Col span={24}>
            <Avatar size={24} src={props.urlImg} />
            <Text className="ml-1 mr-3">{props.name}</Text>
            <Rate value={props.rate} />
          </Col>
          <Col span={24}>
            <Text>{props.detail}</Text>
          </Col>
          <Col span={24}>
            <Form.Item
              label={t('seller.point:msgReply')}
              name="comment"
              rules={[
                {
                  required: true,
                  message: `${t('common.form.required')} ${t('seller.point:msgReply')}`
                }
              ]}
            >
              <TextArea rows={8} showCount maxLength={500} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Row className="justify-content-end">
              <Button type="default" onClick={toggle}>
                {t('common.cancel')}
              </Button>
              <Form.Item className="mb-0">
                <Button htmlType="submit" className="ml-2" type="primary">
                  {t('common.send')}
                </Button>
              </Form.Item>
            </Row>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default ReplyModal
