import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { Typography, Row, Col, Image } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import { CustomUrlUtil } from '~/utils/main'
import styles from './Footer.module.scss'

const { Text, Link } = Typography

const Footer: FC = () => {
  const { t } = useTranslation(LocaleNamespaceConst)
  const router: NextRouter = useRouter()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Row>
            <Col span={24}>
              <Link href={CustomUrlUtil('/', router.locale)}>
                <Image width={100} preview={false} src="./images/main/logo-white.png" alt="logo" />
              </Link>
            </Col>
          </Row>
        </div>

        <div className="footer-middle">
          <Row>
            <Col lg={8} xs={24}>
              <div className={styles.label}>
                <Text>
                  <h5>Menu</h5>
                </Text>
              </div>
              <div className={styles.space}>
                <Text>Sub Menu</Text>
              </div>
              <div className={styles.space}>
                <Text>Sub Menu</Text>
              </div>
              <div className={styles.space}>
                <Text>Sub Menu</Text>
              </div>
            </Col>
            <Col lg={8} xs={24}>
              <div className={styles.label}>
                <Text className={styles.label}>
                  <h5>Menu</h5>
                </Text>
              </div>
              <div className={styles.space}>
                <Text>Sub Menu</Text>
              </div>
              <div className={styles.space}>
                <Text>Sub Menu</Text>
              </div>
              <div className={styles.space}>
                <Text>Sub Menu</Text>
              </div>
              <div className={styles.space}>
                <Text>Sub Menu</Text>
              </div>
              <div className={styles.space}>
                <Text>Sub Menu</Text>
              </div>
            </Col>
            <Col lg={8} xs={24}>
              <div className={styles.label}>
                <Text className={styles.label}>
                  <h5>Menu</h5>
                </Text>
              </div>
              <div className={styles.space}>
                <Text>Sub Menu</Text>
              </div>
              <div className={styles.space}>
                <Text>Sub Menu</Text>
              </div>
              <div className={styles.space}>
                <Text>Sub Menu</Text>
              </div>
              <div className={styles.space}>
                <Text>Sub Menu</Text>
              </div>
              <div className={styles.space}>
                <Text>Sub Menu</Text>
              </div>
            </Col>
          </Row>
        </div>

        <div className="footer-bottom">
          <div className="footer-left">
            <figure className="payment">
              <img src="./images/payment.png" alt="payment" width="159" height="29" />
            </figure>
          </div>
          <div className="footer-center">
            <div className={styles.space}>
              <Text>{t('footer:copyRight')}</Text>
            </div>
          </div>
          <div className="footer-right">
            <div className="social-links">
              <Link href="#" className="social-link social-facebook fab fa-facebook-f" />
              <Link href="#" className="social-link social-twitter fab fa-twitter" />
              <Link href="#" className="social-link social-linkedin fab fa-linkedin-in" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
