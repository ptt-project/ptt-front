import React, { FC } from 'react'
import Helmet from 'react-helmet'
import { Typography, Button, Row, Col} from 'antd'
import t from '~/locales'
import styles from './Profile.module.scss'
import Link from 'next/link'

const { Text } = Typography
const Phone: FC = () => {
  return (  
    <main className="main account">
        <Helmet>
            <title>{t('meta.title')} | {t('accountProfile.form.title')}</title>
        </Helmet>
        <nav className="breadcrumb-nav">
            <div className="container">
                <ul className="breadcrumb">
                    <li><i className="d-icon-home"/></li>
                    <li>{t('accountProfile.setting')}</li>
                    <li>{t('accountProfile.personal_information')}</li>
                    <li>{t('accountProfile.title')}</li>
                </ul>
            </div>
        </nav>
        <div className="page-content mb-9">
            <div className="container">
                <Row gutter={48}>
                    <Col xl={6} lg={0}>
                        Menu
                    </Col> 
                    <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 3 }} md={24}>
                        <Text><h4 className={`text-center mb-5 ${styles.textPrimary}`}>{t('accountProfile.phone.titleEdit')}</h4></Text>
                        <Row gutter={[16, 8]}>
                            <Col md={12} xs={12}>
                                <Text className={styles.textPrimary}>{t('accountProfile.phone.phoneList')}</Text>
                            </Col>
                            <Col md={12} xs={12} className='text-right'>
                                <Link href="/personal-info/add-phone">
                                    <Button className={styles.textPrimary}><i className={`fas fa-plus ${styles.paddingRight5}`}/>{t('accountProfile.button.addPhone')}</Button>
                                </Link>
                            </Col>
                            <Col md={24} xs={64} className="alert alert-message alert-light alert-primary">
                                <Text className={`${styles.textUnderline} ${styles.paddingRight5}`} >081-111-1111</Text>
                                <Button><i className={`fas fa-star ${styles.paddingRight5}`}/>{t('accountProfile.button.mainNumber')}</Button>
                            </Col>
                        </Row>
                    </Col> 
                </Row>
            </div>
        </div>
    </main> 
  )
}

export default Phone
