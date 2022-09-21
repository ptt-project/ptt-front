import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import { Col, Row, Typography } from 'antd'
import Breadcrumbs from '../../components/main/Breadcrumbs'
import { LocaleNamespaceConst } from '../../constants'

const { Title } = Typography

const Product: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'search', 'product', 'shop'])

  return (
    <div className="main mt-6">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('product:main.title')}
        </title>
      </Helmet>
      <Breadcrumbs items={[]} />
      <Title className="d-none" level={1}>
        Arkham Horror: The Card Game Revised Core Set
      </Title>
      <div className="page-content">
        <div className="container">
          <Row gutter={24}>
            <Col md={12} xs={24} />
            <Col md={12} xs={24} />
          </Row>
          <Row gutter={24}>
            <Col span={24} />
          </Row>
          <Row gutter={24}>
            <Col span={24} />
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Product
