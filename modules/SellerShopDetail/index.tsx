import React, { FC, useState } from 'react'
import Helmet from 'react-helmet'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import Loading from '~/components/main/Loading'
import HighlightLabel from '~/components/main/HighlightLabel'
import styles from './SellerShopDetail.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography, Row, Col, Button, Form, Upload, Input, Image, Avatar, message } from 'antd'
import { ImageAcceptConst, LocaleNamespaceConst } from '~/constants'
import { IShopInfo, IShopUpdateInfoPayload, IApiResponse } from '~/interfaces'
import { UploadChangeParam } from 'antd/lib/upload'
import { HelperGetImageUtil } from '~/utils/main'
import { ImageSizeEnum } from '~/enums'
import { ImageService, ShopService } from '~/services'
import { RcFile } from 'antd/es/upload'

const { Text, Title } = Typography

interface ISellerShopDetailForm {
  shopName: string
  shopDescription: string
  profileImage?: UploadChangeParam
  coverImage?: UploadChangeParam
}

interface ISellerShopDetailProps {
  shopInfo?: IShopInfo
}
const SellerShopDetail: FC<ISellerShopDetailProps> = (props: ISellerShopDetailProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.shop-detail'])
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [info, setInfo] = useState<IShopInfo>(props.shopInfo)
  const [currentProfileImage, setCurrentProfileImage] = useState<string>(getImage('profile'))
  const [currentCoverImage, setCurrentCoverImage] = useState<string>(getImage('cover'))

  function getImage(type: string): string {
    if (info !== null) {
      const imagePath: string = type === 'profile' ? info.profileImagePath : info.coverImagePath
      if (imagePath) {
        return `${HelperGetImageUtil(imagePath, ImageSizeEnum.SMALL)}`
      }
    }
    return ''
  }

  function renderAvatar(): JSX.Element {
    if (currentProfileImage) {
      return (
        <Avatar
          src={currentProfileImage}
          alt="avatar"
          size={120}
          style={{ position: 'absolute', left: 40, top: 54 }}
        />
      )
    }

    return (
      <Avatar
        className={styles.avatar}
        size={120}
        style={{ position: 'absolute', left: 40, top: 54 }}
      >
        {getFullName().charAt(0)}
      </Avatar>
    )
  }

  function renderCover(): JSX.Element {
    if (currentCoverImage) {
      return <Image rootClassName={styles.imgWrapper} preview={false} src={currentCoverImage} />
    }
  }

  function getFullName(): string {
    let fullName: string = ''
    if (info !== null) {
      if (info.shopName) {
        fullName += info.shopName
      }
    }
    return fullName
  }

  async function onChangeProfileImage({ file }: UploadChangeParam): Promise<void> {
    let src: string = file.url

    if (!src) {
      src = await new Promise((resolve: any) => {
        const reader: FileReader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = (): string => resolve(reader.result as string)
      })
    }

    setCurrentProfileImage(src)
  }

  async function onChangeCoverImage({ file }: UploadChangeParam): Promise<void> {
    let src: string = file.url

    if (!src) {
      src = await new Promise((resolve: any) => {
        const reader: FileReader = new FileReader()
        reader.readAsDataURL(file.originFileObj as RcFile)
        reader.onload = (): string => resolve(reader.result as string)
      })
    }

    setCurrentCoverImage(src)
  }

  async function onSubmit(values: ISellerShopDetailForm): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const payload: IShopUpdateInfoPayload = {
        shopName: values.shopName,
        shopDescription: values.shopDescription
      }
      if (values.profileImage) {
        const formData: FormData = new FormData()
        formData.append('image', values.profileImage.file.originFileObj)
        const imageRes: IApiResponse = await ImageService.upload(formData)
        if (imageRes.data.id) {
          payload.profileImagePath = imageRes.data.id
        }
      }
      if (values.coverImage) {
        const formData: FormData = new FormData()
        formData.append('image', values.coverImage.file.originFileObj)
        const imageCover: IApiResponse = await ImageService.upload(formData)
        if (imageCover.data.id) {
          payload.coverImagePath = imageCover.data.id
        }
      }
      const infoRes: IApiResponse = await ShopService.updateInfo(payload)
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
  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('seller.shop-detail:title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('seller.shop-detail:shop') },
          { title: t('seller.shop-detail:title'), href: '/seller/settings/shop/detail' }
        ]}
      />
      <Loading show={isLoading} />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={18} lg={24}>
              <Title className="hps-title" level={4}>
                {t('seller.shop-detail:title')}
              </Title>
              <div className={styles.imgGroup}>
                <div className={styles.imgContainer}>{renderCover()}</div>
                {renderAvatar()}
              </div>
              <Form
                layout="vertical"
                form={form}
                name="shopInfoForm"
                onFinish={onSubmit}
                initialValues={{
                  shopName: info.shopName,
                  shopDescription: info.shopDescription
                }}
              >
                <Row className="mt-5">
                  <Col md={4} xs={24}>
                    <Form.Item name="profileImage">
                      <Upload
                        accept={ImageAcceptConst.toString()}
                        maxCount={1}
                        onChange={onChangeProfileImage}
                      >
                        <Button className="hps-btn-secondary">
                          {t('seller.shop-detail:chooseProfile')}
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col md={4} xs={24}>
                    <Form.Item name="coverImage">
                      <Upload
                        accept={ImageAcceptConst.toString()}
                        maxCount={1}
                        onChange={onChangeCoverImage}
                      >
                        <Button className="hps-btn-secondary">
                          {t('seller.shop-detail:chooseCover')}
                        </Button>
                      </Upload>
                    </Form.Item>
                  </Col>
                  <Col md={8} xs={32} className="mt-1">
                    <Text type="secondary">{t('seller.shop-detail:msg')}</Text>
                  </Col>
                </Row>
                <div className={`${styles.borderList}`}>
                  <Row className={` ${styles.list}`} align="middle">
                    <Col xs={20}>
                      <i className={`fas fa-box ${styles.icon}`} />
                      <Text>{t('seller.shop-detail:productList')}</Text>
                    </Col>
                    <Col xs={4} className="text-right">
                      <Text className={` ${styles.valueList}`}>{info.productCount}</Text>
                      <i className={`fas fa-angle-right ${styles.iconArrow}`} />
                    </Col>
                  </Row>
                  <Row className={` ${styles.list}`} align="middle">
                    <Col xs={20}>
                      <i className={`fas fa-comment-dots ${styles.icon}`} />
                      <Text>{t('seller.shop-detail:responseRate')}</Text>
                    </Col>
                    <Col xs={4} className="text-right">
                      <Text className={`${styles.valueList} ${styles.responseRate}`}>
                        {info.replyRate}%
                      </Text>
                    </Col>
                  </Row>
                  <Row className={` ${styles.list}`} align="middle">
                    <Col xs={20}>
                      <i className={`fas fa-star ${styles.icon}`} />
                      <Text>{t('seller.shop-detail:rating')}</Text>
                    </Col>
                    <Col xs={4} className="text-right">
                      <Text className={` ${styles.valueList}`}>{info.shopScore}</Text>
                      <i className={`fas fa-angle-right ${styles.iconArrow}`} />
                    </Col>
                  </Row>
                  <Row className={`${styles.list}`} align="middle">
                    <Col xs={20}>
                      <i className={`fas fa-file-invoice-dollar ${styles.icon}`} />
                      <Text>{t('seller.shop-detail:orderFailed')}</Text>
                    </Col>
                    <Col xs={4} className="text-right">
                      <Text className={` ${styles.valueList}`}>{info.cancelRate}%</Text>
                      <i className={`fas fa-angle-right ${styles.iconArrow}`} />
                    </Col>
                  </Row>
                </div>
                <HighlightLabel title={t('seller.shop-detail:shopInfo')} />

                <Row gutter={16}>
                  <Col span={24}>
                    <Form.Item
                      label={t('seller.shop-detail:shopName')}
                      name="shopName"
                      rules={[
                        {
                          required: true,
                          message: `${t('seller.shop-detail:msgShopName')}`
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      label={t('seller.shop-detail:shopDetail')}
                      name="shopDescription"
                      rules={[
                        {
                          required: true,
                          message: `${t('seller.shop-detail:msgShopDetail')}`
                        }
                      ]}
                    >
                      <Input.TextArea rows={3} showCount maxLength={500} />
                    </Form.Item>
                  </Col>
                  <Col sm={{ span: 12, offset: 6 }} xs={24}>
                    <Form.Item>
                      <Button htmlType="submit" type="primary" block>
                        {t('common:save')}
                      </Button>
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

export default SellerShopDetail
