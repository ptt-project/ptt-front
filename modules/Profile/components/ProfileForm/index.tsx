import React, { useState, FC } from 'react'
import type { RadioChangeEvent } from 'antd'
import { useRouter, NextRouter } from 'next/router'
import NextLink from 'next/link'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col, Form, Input,Upload ,Avatar,Image,Select,Radio} from 'antd'
import t from '~/locales'
import styles from './ProfileForm.module.scss'

const { Text, Link } = Typography
interface IFormModel {
  firstName: string
  lastName: string
  mobileNo: string
  email: string
  username: string
  password: string
}
const ProfileForm: FC = () => {
  const router: NextRouter = useRouter()
  const [form] = Form.useForm()
  
  function onSubmit(values: IFormModel): void {
    console.log(values)
  }
  const handleChange = (value: string): void => {
    console.log(`selected ${value}`)
  }
  const [value, setValue] = useState(1)
  const onChange = (e: RadioChangeEvent): void => {
    console.log('radio checked', e.target.value)
    setValue(e.target.value)
  }
  return (
    <main className={`main ${styles.page}`}>
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6} lg={0}>
              test
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} md={24}>
              <Text>
                <h4 className="text-center mb-5">{t('accountProfile.title')}</h4>
                <h4 className="text-left">{t('accountProfile.personal_information')}</h4>
              </Text>
              <Form layout="vertical" form={form} name="accountProfile" onFinish={onSubmit}>
                <Row gutter={[16, 8]}>
                  <Col md={3} xs={12} className="text-center alert alert-message alert-light alert-primary">
                    <Avatar src={<Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />} size={64} />
                  </Col>
                  <Col md={9} xs={12} className="pt-5 text-center alert alert-message alert-light alert-primary">
                    <Upload>
                      <Button> {t('accountProfile.button.chooseImage')}</Button>
                    </Upload>
                    <Text type="secondary">{t('accountProfile.msgChooseImage')}</Text>
                  </Col>
                  <Col md={12} xs={24} className="pt-5 alert alert-message alert-light alert-primary">
                    <Col md={24} xs={24}>
                      <Text>{t('accountProfile.memberId')} :</Text>
                      <Text className={styles.textProfile}> mem01</Text>
                    </Col>
                    <Col md={24} xs={24}>
                      <Text>{t('accountProfile.username')} :</Text>
                      <Text className={styles.textProfile}> New_user</Text>
                    </Col>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('accountProfile.firstName')}
                      name="firstName"
                      rules={[{ required: true, message: t('accountProfile.rules.firstName') }]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item
                      label={t('accountProfile.lastName')}
                      name="lastName"
                      rules={[{ required: true, message: t('accountProfile.rules.lastName') }]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col md={24} xs={64}>
                    <Form.Item label={t('accountProfile.birthday')} name="birthday">
                      <Select defaultValue={t('accountProfile.date')} style={{ width: 100 }} onChange={handleChange}>
                        <Option value="1">1</Option>
                      </Select>
                      <Select defaultValue={t('accountProfile.month')} style={{ width: 120 }} onChange={handleChange}>
                        <Option value="01">01</Option>
                      </Select>
                      <Select defaultValue={t('accountProfile.year')} style={{ width: 120 }} onChange={handleChange}>
                        <Option value="2022">2022</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col md={3} xs={24}>
                    <Text>{t('accountProfile.gender')}</Text>
                  </Col>
                  <Col md={16} xs={24}>
                    <Radio.Group onChange={onChange} value={value} >
                      <Radio value={1}>{t('accountProfile.man')}</Radio>
                      <Radio value={2}>{t('accountProfile.female')}</Radio>
                      <Radio value={3}>{t('accountProfile.other')}</Radio>
                    </Radio.Group>
                  </Col>
                  <Col md={6} xs={6}>
                    <Text>{t('accountProfile.email')}</Text>
                  </Col>
                  <Col md={12} xs={12}><Text type="danger">xxxxx@gmail.com</Text></Col>
                  <Col md={6} xs={6}> <Button type="link"><i className={`fas fa-pen ${styles.padding5}`}/>{t('accountProfile.button.edit')}</Button></Col>
                  <Col md={6} xs={6}>
                    <Text>{t('accountProfile.phoneNumber')}</Text>
                  </Col>
                  <Col md={12} xs={12}><Text type="danger">xxxxx11</Text></Col>
                  <Col md={6} xs={6}> <Button type="link"><i className={`fas fa-pen ${styles.padding5}`}/>{t('accountProfile.button.edit')}</Button></Col>
                  <Col md={12} xs={12} offset={6}>
                    <Form.Item>
                      <Button htmlType="submit" className={styles.btnPrimary} block>{t('accountProfile.button.save')}</Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default ProfileForm
