import React, { FC } from 'react'
import { Typography, Button, Row, Col, Form, Input} from 'antd'
import t from '~/locales'
import styles from './ProfileEmail.module.scss'
const { Text } = Typography
interface IFormEmailModel {
  email: string
  password: string
}
interface IProfileEmailProps {
  setForm: (form: IFormEmailModel) => void
  setStep: (step: number) => void
}
const ProfileEmail: FC<IProfileEmailProps> = (props: IProfileEmailProps) => {
  const [form] = Form.useForm()
  function onSubmit(values: IFormEmailModel): void {
    props.setForm(values)
    props.setStep(1)
  }
  return (  
    <>  
      <Text>
        <h4 className={`text-center mb-5 ${styles.textEmailTitle}`}>{t('accountProfile.email.title')}</h4>
      </Text>
      <Form layout="vertical" form={form} name="accountEmail" onFinish={onSubmit}>
        <Row gutter={[16, 8]}>
            <Col md={24} xs={64} className="alert alert-message alert-light alert-primary">
                <Text>{t('accountProfile.email.currentEmail')} :</Text>
                <Text className={styles.textEmail} > Ne******@gmail.com</Text>
            </Col>
            <Col md={24} xs={64} >
                <Form.Item
                label={t('accountProfile.email.currentEmail')}
                name="currentEmail"
                >
                <Input maxLength={50} />
                </Form.Item>
            </Col>
            <Col  md={24} xs={64}>
                <Form.Item
                label={t('accountProfile.email.password')}
                name="password"
                rules={[{ required: true, message: t('accountProfile.rules.email') }]}
                >
                <Input.Password/>
                </Form.Item>
            </Col>
            <Col md={24} xs={64}>
                <Text type="secondary">{t('accountProfile.email.msgConfirm')}</Text>
            </Col>
            <Col md={12} xs={12} offset={6}>
                <Form.Item>
                    <Button htmlType="submit" className={styles.btnPrimary} block>{t('accountProfile.button.confirm')}</Button>
                </Form.Item>
            </Col>
        </Row>
      </Form>
    </>    
  )
}

export default ProfileEmail
