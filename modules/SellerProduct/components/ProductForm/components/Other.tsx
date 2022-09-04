import React from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Radio, Col, Form, Input, Row } from 'antd'
import HighlightLabel from '~/components/main/HighlightLabel'
import { LocaleNamespaceConst } from '~/constants'
import styles from '../ProductForm.module.scss'

const { Text } = Typography

interface IFormProductFeaturesProps {
  label?: string
  value?: boolean
  onChange?: (value: boolean) => void
  onHintClick?: () => void
  disabled?: boolean
}

const Other: React.FC<IFormProductFeaturesProps> = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])

  return (
    <>
      <HighlightLabel title={t('seller.product:form.other.title')} />
      <Row gutter={16}>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:form.other.prepareDeliver')} name="condition">
            <Radio.Group className={styles.radio}>
              <Radio value={1}>{t('seller.product:form.other.yes')}</Radio>
              <Radio value={2}>{t('seller.product:form.other.no')}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:form.other.iNeedTime')} name="shelfLife">
            <Input suffix={<Text type="secondary">{t('seller.product:form.other.day')}</Text>} />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

Other.defaultProps = {
  value: false,
  onChange: undefined,
  onHintClick: undefined,
  disabled: false
}

export default Other
