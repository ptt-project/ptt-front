import React, { FC, useEffect, useState } from 'react'
import { Typography, Button, Col, Modal,Row,Avatar,Rate,Input,Form  } from 'antd'
import t from '~/locales'
import styles from './PointReplyModal.module.scss'

const { Text } = Typography
const { TextArea } = Input

interface ImodalProps {
  isOpen: boolean
  name: string
  urlImg: string
  rate: string
  detail: string
  toggle: () => void
}

interface IFormModel {
  msgReply: string
}

const PointReplyModal: FC<ImodalProps> = (props: ImodalProps) => {
  const [form] = Form.useForm()
  const [isButtonForm, setIsButtonForm] = useState<boolean>(true)

  function toggle(): void {
    props.toggle()
  }
    
  function onSubmit(values: IFormModel): void {
    console.log(values)
    toggle()
  }

  function handleChange(event): void {
    if(event.target.value){
      setIsButtonForm(false)
    }else{
      setIsButtonForm(true)
    }
  }
  return (
    <Modal
      title={[
        <Col>
          <Text><i className={`fas fa-info-circle ${styles.iconInfo}`} /></Text>
          <Text className="ml-1"> {t('shopPoint.reply')}</Text>
        </Col>
      ]}
      visible={props.isOpen}
      onCancel={toggle}
      footer={null}
      closable={false}
    >
      <Form layout="vertical" form={form} name="accountProfile" onFinish={onSubmit}>
        <Row gutter={[8,8]} className='ml-2'>
          <Col><Avatar src={props.urlImg} /></Col>
          <Col className='mt-1'><Text>{props.name}</Text></Col>
          <Col><Rate value={props.rate} /></Col>
        </Row>
        <Col className="mt-2">
          <Text>{props.detail}</Text>
        </Col>
        <Col className="mt-2"><Text>{t('shopPoint.msgReply')}*</Text></Col>
        <Col className="mt-2">
          <TextArea showCount maxLength={500} style={{ height: 200 }} onChange={handleChange}/>
        </Col>
        <Col className="text-right mt-10">
          <Button type="default" onClick={toggle}>
            {t('common.cancel')}
          </Button>
          <Button htmlType="submit" className={`ml-1 ${styles.btnSubmit}`} type="primary" disabled={isButtonForm}>
            {t('common.send')}
          </Button>
        </Col>
      </Form>
    </Modal>
  )
}

export default PointReplyModal