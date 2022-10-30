import React, { FC } from 'react'
import styles from './ProductFeedback.module.scss'
import { useTranslation } from 'next-i18next'
import { Button, Col, Rate, Row, Space, Typography } from 'antd'
import { LocaleNamespaceConst } from '../../../../constants'

const { Title, Text } = Typography

const ProductFeedback: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'product'])

  function renderFeedback(): JSX.Element[] {
    const items: JSX.Element[] = []

    for (let i: number = 0; i < 5; i++) {
      items.push(
        <Row className={styles.feedback}>
          <Col className={styles.feedbackLeft} lg={5} xs={24}>
            <Rate className={`${styles.rate} hps-rating mb-2`} disabled defaultValue={5} />
            <Title className="mb-2" level={5}>
              WizardGuineaPig
            </Title>
            <Text type="secondary" className="hps-text-small d-block mb-2">
              09/07/2022 10:42
            </Text>
          </Col>
          <Col className={styles.feedbackRight} lg={19} xs={24}>
            <Title className="mb-2" level={5}>
              Nunc, senectus platea malesuada aliquam est morbi. Cras ac aenean in nulla tortor a
              quis felis elementum. Enim metus lorem turpis nec at. Neque massa neque id eleifend
              lacus scelerisque donec. Tristique suscipit mauris tristique urna. Penatibus et
              pharetra cras eu.
            </Title>
            <Title className="mb-0" level={5}>
              {t('product:main.rating.feedback')}
            </Title>
            <Text type="secondary">
              Nunc, senectus platea malesuada aliquam est morbi. Cras ac aenean in nulla tortor a
              quis felis elementum. Enim metus lorem turpis nec at. Neque massa neque id eleifend
              lacus scelerisque donec. Tristique suscipit mauris tristique urna. Penatibus et
              pharetra cras eu.
            </Text>
          </Col>
        </Row>
      )
    }

    return items
  }

  return (
    <>
      <div className={`${styles.ratingTab} mb-4`}>
        <Space className="mb-2" size="middle">
          <Title className={styles.highlight} level={3}>
            {t('product:main.rating.title')}
          </Title>
          <div>
            <Space>
              <Title className={styles.highlight} level={3}>
                4.4
              </Title>
              <Text className={styles.hint} type="secondary">
                /
              </Text>
              <Text className={styles.hint} type="secondary">
                5
              </Text>
            </Space>
          </div>
        </Space>
        <Space wrap>
          <Button>{t('product:main.rating.all')} (0)</Button>
          <Button>{t('product:main.rating.five')} (0)</Button>
          <Button>{t('product:main.rating.four')} (0)</Button>
          <Button>{t('product:main.rating.three')} (0)</Button>
          <Button>{t('product:main.rating.two')} (0)</Button>
          <Button>{t('product:main.rating.one')} (0)</Button>
        </Space>
      </div>
      {renderFeedback()}
    </>
  )
}

export default ProductFeedback
