import React, { FC, useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/th'
import Link from 'next/link'
import Helmet from 'react-helmet'
import Loading from '~/components/main/Loading'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import HighlightLabel from '~/components/main/HighlightLabel'
import styles from './AccountInfo.module.scss'
import { useTranslation } from 'next-i18next'
import {
  Typography,
  Button,
  Row,
  Col,
  Form,
  Input,
  Upload,
  Avatar,
  Select,
  Radio,
  message
} from 'antd'
import { HelperGetImageUtil } from '~/utils/main'
import { ImageAcceptConst, LocaleNamespaceConst } from '~/constants'
import { IUpdateMemberProfilePayload, IApiResponse, IMemberInfo } from '~/interfaces'
import { ImageService, MemberService } from '~/services'
import { AccountGenderEnum, ImageSizeEnum } from '~/enums'
import { NextRouter, useRouter } from 'next/router'
import { UploadChangeParam } from 'antd/lib/upload'
import { RcFile } from 'antd/es/upload'

const { Text, Title } = Typography

interface IAccountInfoForm {
  firstName: string
  lastName: string
  gender: AccountGenderEnum | string
  day: string
  month: string
  year: string
  image?: UploadChangeParam
}

interface IAccountInfoProps {
  info: IMemberInfo
}

const AccountInfo: FC<IAccountInfoProps> = (props: IAccountInfoProps) => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'account-info'])
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [info, setInfo] = useState<IMemberInfo>(props.info)
  const [currentImage, setCurrentImage] = useState<string>(getImage())
  const [currentDay, setCurrentDay] = useState<string>(getDay())
  const [currentMonth, setCurrentMonth] = useState<string>(getMonth())
  const [currentYear, setCurrentYear] = useState<string>(getYear())

  function getUserId(): string {
    if (info.id) {
      return info.id
    }

    return ''
  }

  function getUsername(): string {
    if (info.username) {
      return info.username
    }

    return ''
  }

  function getFullName(): string {
    let fullName: string = ''

    if (info.firstName) {
      fullName += info.firstName
    }

    if (info.lastName) {
      fullName += ` ${info.lastName}`
    }

    return fullName
  }

  function getMobileNo(): string {
    if (info.mobile) {
      let num: number = 8
      let star: string = ''

      while (num > 0) {
        star += '*'
        num--
      }

      return `${star}${info.mobile.slice(8)}`
    }

    return ''
  }

  function getEmail(): string {
    if (info.email) {
      let num: number = 6
      let star: string = ''

      while (num > 0) {
        star += '*'
        num--
      }

      const provider: string = info.email.split('@')[info.email.split('@').length - 1]

      return `${info.email.slice(0, 2)}${star}@${provider}`
    }

    return ''
  }

  function getGender(): string {
    if (info.gender) {
      return info.gender
    }

    return ''
  }

  function getDay(): string {
    if (info.birthday) {
      return moment(info.birthday).format('DD')
    }

    return ''
  }

  function getMonth(): string {
    if (info.birthday) {
      return moment(info.birthday).format('MM')
    }

    return ''
  }

  function getYear(): string {
    if (info.birthday) {
      return moment(info.birthday).format('YYYY')
    }

    return ''
  }

  function getImage(): string {
    if (info.imageId) {
      return `${HelperGetImageUtil(info.imageId, ImageSizeEnum.SMALL)}`
    }

    return ''
  }

  async function onChangeImage({ file }: UploadChangeParam): Promise<void> {
    let src: string = file.url

    if (!src) {
      src = await new Promise((resolve: any) => {
        const reader: FileReader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = (): string => resolve(reader.result as string)
      })
    }

    setCurrentImage(src)
  }

  async function onSubmit(values: IAccountInfoForm): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false

    try {
      const payload: IUpdateMemberProfilePayload = {
        firstName: values.firstName,
        lastName: values.lastName,
        birthday: `${values.year}-${values.month}-${values.day}`,
        gender: values.gender
      }

      if (values.image) {
        const formData: FormData = new FormData()
        formData.append('image', values.image.file.originFileObj)
        const imageRes: IApiResponse = await ImageService.upload(formData)

        if (imageRes.data.id) {
          payload.imageId = imageRes.data.id
        }
      }

      const infoRes: IApiResponse = await MemberService.updateProfile(payload)

      if (infoRes.data) {
        setInfo(infoRes.data)
      }

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

  function renderAvatar(): JSX.Element {
    if (currentImage) {
      return <Avatar src={currentImage} alt="avatar" size={80} />
    }

    return (
      <Avatar className={styles.avatar} size={80}>
        {getFullName().charAt(0)}
      </Avatar>
    )
  }

  function renderDayOptions(): JSX.Element[] {
    const maxDay: number = moment(
      `${currentYear || '2022'} ${currentMonth || '01'}`,
      'YYYY-MM'
    ).daysInMonth()

    const options: JSX.Element[] = []

    let i: number = 1
    while (i <= maxDay) {
      const day: string = `${i < 10 ? '0' : ''}${i}`
      options.push(
        <Select.Option key={day} value={day}>
          {day}
        </Select.Option>
      )
      i++
    }

    return options
  }

  function renderMonthOptions(): JSX.Element[] {
    return moment
      .localeData(router.locale)
      .months()
      .map((month: string, i: number) => (
        <Select.Option value={`${i < 10 ? '0' : ''}${i + 1}`} key={month}>
          {month}
        </Select.Option>
      ))
  }

  function renderYearOptions(): JSX.Element[] {
    const offset: number = 80

    const years: number[] = Array.from(
      { length: offset },
      (_: any, i: number) => new Date().getFullYear() - offset + i + 1
    )

    return years.map((year: number) => (
      <Select.Option value={year.toString()} key={year.toString()}>
        {year.toString()}
      </Select.Option>
    ))
  }

  useEffect(() => {
    setCurrentDay('')
  }, [currentMonth])

  useEffect(() => {
    setCurrentMonth('')
  }, [currentYear])

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
          { title: t('account-info:personalInfo') }
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
                name="accountInfoForm"
                onFinish={onSubmit}
                initialValues={{
                  firstName: info.firstName,
                  lastName: info.lastName,
                  gender: getGender(),
                  day: getDay(),
                  month: getMonth(),
                  year: getYear()
                }}
              >
                <Row className={styles.highlight} gutter={[16, 16]} align="middle">
                  <Col sm={4} xs={12}>
                    {renderAvatar()}
                  </Col>
                  <Col sm={8} xs={12} className="text-center">
                    <Form.Item name="image">
                      <Upload
                        accept={ImageAcceptConst.toString()}
                        maxCount={1}
                        onChange={onChangeImage}
                      >
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
                      <Text className={styles.colorPrimaryDark}>{getUserId()}</Text>
                    </div>
                    <div>
                      <Text className={styles.label}>{t('account-info:form.username')} :</Text>
                      <Text className={styles.colorPrimaryDark}>{getUsername()}</Text>
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
                        <Form.Item
                          label={t('account-info:form.birthday')}
                          name="day"
                          rules={[
                            {
                              required: true,
                              message: `${t('common:form.required')} ${t('account-info:form.day')}`
                            }
                          ]}
                        >
                          <Select
                            defaultValue={currentDay}
                            onChange={(value: string): void => {
                              form.setFieldValue('day', value)
                              setCurrentDay(value)
                            }}
                          >
                            <Select.Option value="">{t('account-info:form.day')}</Select.Option>
                            {renderDayOptions()}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={5} sm={6} xs={9}>
                        <Form.Item
                          label={null}
                          name="month"
                          rules={[
                            {
                              required: true,
                              message: `${t('common:form.required')} ${t(
                                'account-info:form.month'
                              )}`
                            }
                          ]}
                        >
                          <div className="ant-form-item-label">
                            <label>&nbsp;</label>
                          </div>
                          <Select
                            defaultValue={currentMonth}
                            onChange={(value: string): void => {
                              form.setFieldValue('day', '')
                              form.setFieldValue('month', value)
                              setCurrentMonth(value)
                            }}
                          >
                            <Select.Option value="">{t('account-info:form.month')}</Select.Option>
                            {renderMonthOptions()}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col md={5} sm={6} xs={9}>
                        <Form.Item
                          label={null}
                          name="year"
                          rules={[
                            {
                              required: true,
                              message: `${t('common:form.required')} ${t('account-info:form.year')}`
                            }
                          ]}
                        >
                          <div className="ant-form-item-label">
                            <label>&nbsp;</label>
                          </div>
                          <Select
                            defaultValue={currentYear}
                            onChange={(value: string): void => {
                              form.setFieldValue('day', '')
                              form.setFieldValue('month', '')
                              form.setFieldValue('year', value)
                              setCurrentYear(value)
                            }}
                          >
                            <Select.Option value="">{t('account-info:form.year')}</Select.Option>
                            {renderYearOptions()}
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
                        <Form.Item
                          label={null}
                          name="gender"
                          rules={[
                            {
                              required: true,
                              message: `${t('common:form.required')} ${t(
                                'account-info:form.gender'
                              )}`
                            }
                          ]}
                        >
                          <Radio.Group className={styles.radioFlex}>
                            <Radio value={AccountGenderEnum.MALE}>
                              {t('account-info:form.man')}
                            </Radio>
                            <Radio value={AccountGenderEnum.FEMALE}>
                              {t('account-info:form.female')}
                            </Radio>
                            <Radio value={AccountGenderEnum.OTHER}>
                              {t('account-info:form.other')}
                            </Radio>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col xs={8}>
                        <Text>{t('account-info:form.email')}</Text>
                      </Col>
                      <Col sm={12} xs={11}>
                        <Text className={styles.colorPrimaryDark}>{getEmail()}</Text>
                      </Col>
                      <Col sm={4} xs={5} className="text-right">
                        <Link href="/settings/account/info/email">
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
                        <Text className={styles.colorPrimaryDark}>{getMobileNo()}</Text>
                      </Col>
                      <Col sm={4} xs={5} className="text-right">
                        <Link href="/settings/account/info/mobile">
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

export default AccountInfo
