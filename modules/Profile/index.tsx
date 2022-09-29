import React, { FC, useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import Link from 'next/link'
import Helmet from 'react-helmet'
import type { RadioChangeEvent } from 'antd'
import _ from 'lodash'
import {
  Typography,
  Button,
  Row,
  Col,
  Form,
  Input,
  Upload,
  Avatar,
  Image,
  Select,
  Radio,
  message
} from 'antd'
import { sleep } from '@tanstack/query-core/build/lib/utils'
import Loading from '~/components/main/Loading'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import { CustomUrlUtil } from '~/utils/main'
import HighlightLabel from '~/components/main/HighlightLabel'
import { ImageAcceptConst, LocaleNamespaceConst } from '~/constants'
import { IMemberProfilePayload, IMemberProfileUpdatePayload, IApiResponse } from '~/interfaces'
import { ImageService, MemberService } from '~/services'
import styles from './Profile.module.scss'
import { SizeImagesEnum } from '~/enums'

const { Text, Title } = Typography
const { Option } = Select

interface IProfile {
  profile: IMemberProfilePayload
}

interface IMonthList {
  id: string
  name: string
}
const Profile: FC<IProfile> = (props: IProfile) => {
  console.log('props--', props)
  const { t } = useTranslation([...LocaleNamespaceConst, 'account-info'])
  const router: NextRouter = useRouter()
  const [form] = Form.useForm()
  const [valueGender, setValueGender] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [dataDays, setDataDays] = useState<string[]>([])
  const [valueImage, setImage] = useState<string>('')
  const [imagePayload, setImagePayload] = useState<string>('')
  const monthList: IMonthList[] = [
    { id: '01', name: 'January' },
    { id: '02', name: 'February' },
    { id: '03', name: 'March' },
    { id: '04', name: 'April' },
    { id: '05', name: 'May' },
    { id: '06', name: 'June' },
    { id: '07', name: 'July' },
    { id: '08', name: 'August' },
    { id: '09', name: 'September' },
    { id: '10', name: 'October' },
    { id: '11', name: 'November' },
    { id: '12', name: 'December' }
  ]
  const formatDate: Date = props.profile.birthday === null ? null : new Date(props.profile.birthday)
  const valueDay = (): string => {
    if (formatDate === null) {
      return ''
    }
    return formatDate.getDate().toString()
  }
  const valueMonth = (): string => {
    if (formatDate === null) {
      return ''
    }
    const month: string = (formatDate.getMonth() + 1).toString()
    return month.length === 1 ? `0${month}` : month
  }
  const valueYear = (): string => {
    if (formatDate === null) {
      return ''
    }
    return formatDate.getFullYear().toString()
  }

  async function getImage(imageId: string): Promise<void> {
    if (imageId === '') {
      setImage(
        'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp'
      )
    }
    const imageValue: IApiResponse = await ImageService.get(imageId, SizeImagesEnum.SMALL)
    console.log('imageValue++', imageValue)
    setImage(imageValue.data)
  }

  function onChange(e: RadioChangeEvent): void {
    setValueGender(e.target.value)
  }

  async function onSubmit(values: IMemberProfilePayload): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      if (values.image.file.originFileObj) {
        const formData: FormData = new FormData()
        formData.append('image', values.image.file.originFileObj)
        const imageData: IApiResponse = await ImageService.upload(formData)
        console.log('imageData--', imageData.data.id)
        setImagePayload(imageData.data.id)
      }
      const payload: IMemberProfileUpdatePayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        birthday: `${values.year ? values.year : valueYear()}-${
          values.month ? values.month : valueMonth()
        }-${values.day ? values.day : valueDay()}`,
        gender: valueGender,
        // imageId: 'd8c86308-0d94-4aed-88d2-95a4952436ef'
        imageId: imagePayload
      }
      console.log('payload--', payload)
      await MemberService.updateMemberProfile(payload)
      isSuccess = true
    } catch (error) {
      console.log(error)
    }
    if (isSuccess) {
      message.success(t('common:apiMessage.success'))
    } else {
      message.error(t('common:apiMessage.error'))
    }
    setIsLoading(false)
  }

  function getDays(): void {
    const days: string[] = []
    for (let i: number = 1; i <= 31; i++) {
      days.push(String(i).padStart(2, '0'))
    }
    setDataDays(days)
  }

  async function fetchData(): Promise<void> {
    try {
      await MemberService.getProfile()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
    getDays()
    setValueGender(props.profile.gender)
    getImage(props.profile.imageId)
    console.log(valueImage)
  }, [])
  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('account-info:title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('account-info:setting') },
          { title: t('account-info:title') },
          { title: t('account-info:personalInfo'), href: '/settings/account/info' }
        ]}
      />
      <Loading show={isLoading} />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="buyer" />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 2 }} md={24}>
              <Title className="hps-title" level={4}>
                {t('account-info:title')}
              </Title>
              <HighlightLabel title={t('account-info:personalInfo')} />
              <Form
                layout="vertical"
                form={form}
                name="profileForm"
                onFinish={onSubmit}
                initialValues={{ ...props.profile }}
              >
                <Row className={styles.highlight} gutter={[16, 16]} align="middle">
                  <Col sm={4} xs={12}>
                    <Avatar src={<Image src={valueImage} preview={false} />} size={80} />
                  </Col>
                  <Col sm={8} xs={12} className="text-center">
                    <Form.Item name="image">
                      <Upload accept={ImageAcceptConst.toString()} maxCount={1}>
                        <Button className="hps-btn-secondary">
                          {t('account-info:button.chooseImage')}
                        </Button>
                      </Upload>
                    </Form.Item>
                    <Text type="secondary">{t('account-info:form.msgChooseImage')}</Text>
                  </Col>
                  <Col sm={12} xs={24}>
                    <div>
                      <Text className={styles.label}>{t('account-info:form.memberId')} :</Text>
                      <Text className={styles.textPrimary}>mem01</Text>
                    </div>
                    <div>
                      <Text className={styles.label}>{t('account-info:form.username')} :</Text>
                      <Text className={styles.textPrimary}>{props.profile.username}</Text>
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 8]}>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      label={t('account-info:form.firstName')}
                      name="firstName"
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t(
                            'account-info:form.firstName'
                          )}`
                        }
                      ]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      label={t('account-info:form.lastName')}
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: `${t('common:form.required')} ${t('account-info:form.lastName')}`
                        }
                      ]}
                    >
                      <Input maxLength={50} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Row gutter={8}>
                      <Col md={3} sm={4} xs={6}>
                        <Form.Item label={t('account-info:form.birthday')} name="day">
                          <Select defaultValue={valueDay}>
                            <Option value="">{t('account-info:form.date')}</Option>
                            {dataDays?.map((item: string) => (
                              <Option value={item}>{item}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={5} sm={6} xs={9}>
                        <Form.Item label="&nbsp;" name="month">
                          <Select defaultValue={valueMonth}>
                            <Option value="">{t('account-info:form.month')}</Option>
                            {monthList?.map((item: IMonthList) => (
                              <Option value={item.id}>{item.name}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={5} sm={6} xs={9}>
                        <Form.Item label="&nbsp;" name="year">
                          <Select defaultValue={valueYear}>
                            <Option value="">{t('account-info:form.year')}</Option>
                            {_.range(1938, 2004 + 1).map((value: number) => (
                              <Option key={value} value={value}>
                                {value}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row gutter={[16, 24]}>
                      <Col xs={8}>
                        <Text>{t('account-info:form.gender')}</Text>
                      </Col>
                      <Col xs={16}>
                        <Radio.Group
                          name="gender"
                          onChange={onChange}
                          value={valueGender}
                          className={styles.radioFlex}
                        >
                          <Radio value="M">{t('account-info:form.man')}</Radio>
                          <Radio value="F">{t('account-info:form.female')}</Radio>
                          <Radio value="O">{t('account-info:form.other')}</Radio>
                        </Radio.Group>
                      </Col>
                      <Col xs={8}>
                        <Text>{t('account-info:form.email')}</Text>
                      </Col>
                      <Col sm={12} xs={11}>
                        <Text type="danger">{props.profile.email}</Text>
                      </Col>
                      <Col sm={4} xs={5} className="text-right">
                        <Link href={CustomUrlUtil('/settings/account/info/email', router.locale)}>
                          <a className={styles.textSecondary}>
                            <i className="fas fa-pen mr-1" />
                            {t('account-info:button.edit')}
                          </a>
                        </Link>
                      </Col>
                      <Col xs={8}>
                        <Text>{t('account-info:form.phoneNumber')}</Text>
                      </Col>
                      <Col sm={12} xs={11}>
                        <Text type="danger">{props.profile.mobile}</Text>
                      </Col>
                      <Col sm={4} xs={5} className="text-right">
                        <Link href={CustomUrlUtil('/settings/account/info/phone', router.locale)}>
                          <a className={styles.textSecondary}>
                            <i className="fas fa-pen mr-1" />
                            {t('account-info:button.edit')}
                          </a>
                        </Link>
                      </Col>
                      <Col sm={{ span: 12, offset: 6 }} xs={24}>
                        <Form.Item>
                          <Button htmlType="submit" type="primary" block>
                            {t('account-info:button.save')}
                          </Button>
                        </Form.Item>
                      </Col>
                    </Row>
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

export default Profile
