import React, { FC, useState, useEffect } from 'react'
import Helmet from 'react-helmet'
import Image from '../../components/main/Image'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import ProductCard from '~/components/main/ProductCard'
import styles from './Shop.module.scss'
import { NextRouter, useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Avatar, Button, Carousel, Col, Row, Space, Tabs, Typography } from 'antd'
import { LocaleNamespaceConst } from '../../constants'

const { Text, Title, Link } = Typography

const tabItems: string[] = [
  'หน้าแรก',
  'บอร์ดเกม',
  'การ์ดเกม',
  'นิยาย',
  'การ์ตูน',
  'ของสะสม',
  'เสื้อกีฬา',
  'กางเกงกฬา',
  'อุปกรณ์ไฟฟ้า',
  'ภาพยนตร์',
  'โมเดล',
  'โปสเตอร์'
]

const images: string[] = [
  'https://dummyimage.com/720x480?text=Shop Banner 1 720 x 480',
  'https://dummyimage.com/720x480?text=Shop Banner 2 720 x 480',
  'https://dummyimage.com/720x480?text=Shop Banner 3 720 x 480',
  'https://dummyimage.com/720x480?text=Shop Banner 4 720 x 480',
  'https://dummyimage.com/720x480?text=Shop Banner 5 720 x 480'
]

const Shop: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'search', 'shop'])
  const router: NextRouter = useRouter()
  const [keyword, setKeyword] = useState<string>()
  const [activeTab, setActiveTab] = useState<string>('0')

  function getKeyword(): string {
    return router?.query?.keyword ? router.query.keyword.toString() : ''
  }

  useEffect(() => {
    if (router?.query) {
      setKeyword(getKeyword())
    }
  }, [router.query])

  function renderImages(): JSX.Element[] {
    const items: JSX.Element[] = images.map((data: string, index: number) => (
      <div key={index}>
        <Image rootClassName={styles.img} src={data} alt="shop" ratio={3 / 2} />
      </div>
    ))
    return items
  }

  return (
    <div className="main mb-4">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('search:searchShop.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('search:title'), href: `/search?keyword=${keyword}` },
          { title: t('search:searchShop.title') }
        ]}
      />
      <Title className="d-none" level={1}>
        {t('search:searchShop.title')}
      </Title>
      <div className="page-content">
        <div className="container">
          <Row gutter={24}>
            <Col xl={6}>
              <Image src="./images/main/buyer/shop.png" alt="shop" ratio={2 / 3} />
            </Col>
            <Col xl={18} md={24}>
              <Row gutter={24}>
                <Col md={12} xs={24}>
                  <div
                    className={styles.infoLeft}
                    style={{
                      backgroundImage: 'url("https://dummyimage.com/800x150?text=800 x 150")',
                      backgroundPosition: 'center'
                    }}
                  >
                    <Avatar className={styles.avatar} size={80} />
                    <div className={styles.infoLeftWrapper}>
                      <Title className={`${styles.dwrap} text-white mb-2`} level={5}>
                        Fantasy Flight
                      </Title>
                      <Text className="text-white mb-2">Active 1 ชั่วโมงที่ผ่านมา</Text>
                      <div className={styles.btnGroup}>
                        <Button className="hps-btn-secondary">
                          <i className="fas fa-bookmark mr-1" />
                          {t('shop:main.follow')}
                        </Button>
                        <Button className="hps-btn-secondary">
                          <i className="fas fa-comment-dots mr-1" />
                          {t('shop:main.chat')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={12} xs={24}>
                  <div className={styles.infoRight}>
                    <div className={styles.infoBox}>
                      <Text className={styles.dwrap}>{t('shop:main.numOfProduct')}</Text>
                      <div className={styles.dwrap}>
                        <Text className={styles.text}>
                          <i className="fas fa-box mr-1" />
                          142
                        </Text>
                      </div>
                    </div>
                    <div className={styles.infoBox}>
                      <Text className={styles.dwrap}>{t('shop:main.follower')}</Text>
                      <div className={styles.dwrap}>
                        <Text className={styles.text}>
                          <i className="fas fa-bookmark mr-1" />
                          1.2 พัน
                        </Text>
                      </div>
                    </div>
                    <div className={styles.infoBox}>
                      <Text className={styles.dwrap}>{t('shop:main.following')}</Text>
                      <div className={styles.dwrap}>
                        <Text className={styles.text}>
                          <i className="fas fa-heart mr-1" />
                          42
                        </Text>
                      </div>
                    </div>
                    <div className={styles.infoBox}>
                      <Text className={styles.dwrap}>{t('shop:main.rating')}</Text>
                      <div className={styles.dwrap}>
                        <Text className={styles.text}>
                          <i className="fas fa-star mr-1" />
                          4.7
                        </Text>
                      </div>
                    </div>
                    <div className={styles.infoBox}>
                      <Text className={styles.dwrap}>{t('shop:main.joinAt')}</Text>
                      <div className={styles.dwrap}>
                        <Text className={styles.text}>
                          <i className="fas fa-calendar mr-1" />
                          22 เดือนที่ผ่านมา
                        </Text>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col className={styles.tabWrapper} span={24}>
                  <Tabs
                    className={styles.tab}
                    activeKey={activeTab}
                    onChange={(activeKey: string): void => setActiveTab(activeKey)}
                    items={tabItems.map((data: string, i: number) => ({
                      label: data,
                      key: i.toString()
                    }))}
                    moreIcon={
                      <Text className={styles.tabMore}>
                        {t('shop:main.tabMore')}
                        <i className="fas fa-chevron-down ml-1" />
                      </Text>
                    }
                  />
                </Col>
              </Row>
              <Row gutter={24} className="mb-8">
                <Col span={24}>
                  <Title className="mb-3" level={4}>
                    <Text>{t('shop:main.aboutUs')}</Text>
                  </Title>
                </Col>
                <Col md={12} xs={24}>
                  <Carousel swipeToSlide draggable autoplay>
                    {renderImages()}
                  </Carousel>
                </Col>
                <Col md={12} xs={24}>
                  <Text>...do something</Text>
                </Col>
              </Row>
              <Row className="mb-8">
                <Col span={24}>
                  <Row className={styles.header} align="middle">
                    <Col span={16}>
                      <Title className={styles.title} level={4}>
                        <Space size="middle">
                          <Text className={styles.icon}>
                            <i className="fas fa-heart" />
                          </Text>
                          <Text>{t('shop:main.recommended')}</Text>
                        </Space>
                      </Title>
                    </Col>
                    <Col className="text-right" span={8}>
                      <Link href="#">
                        <a className="hps-link">{t('common:viewAll')}</a>
                      </Link>
                    </Col>
                  </Row>
                  <ProductCard />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Row className={styles.header} align="middle">
                    <Col span={16}>
                      <Title className={styles.title} level={4}>
                        <Space size="middle">
                          <Text className={styles.icon}>
                            <i className="fas fa-heart" />
                          </Text>
                          <Text>{t('shop:main.bestSeller')}</Text>
                        </Space>
                      </Title>
                    </Col>
                    <Col className="text-right" span={8}>
                      <Link href="#">
                        <a className="hps-link">{t('common:viewAll')}</a>
                      </Link>
                    </Col>
                  </Row>
                  <ProductCard />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Shop
