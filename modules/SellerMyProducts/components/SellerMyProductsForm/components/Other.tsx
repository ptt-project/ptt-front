import React, { useState } from 'react'
import { Typography, Radio, Col, Form, Input, Row, Select } from 'antd'
import HighlightLabel from '~/components/main/HighlightLabel'
import t from '~/locales'
import styles from '../SellerMyProductsForm.module.scss'

const { Text, Title } = Typography
const { TextArea } = Input
interface IFormProductFeaturesProps {
  label?: string
  value?: boolean
  onChange?: (value: boolean) => void
  onHintClick?: () => void
  disabled?: boolean
}
const Other: React.FC<IFormProductFeaturesProps> = (props: IFormProductFeaturesProps) => {
  return (
    <>
      <HighlightLabel title={t('sellerProducts.form.other.title')} />
      <Row gutter={[16, 8]}>
        <Col md={12}>
          <Form.Item label={t('sellerProducts.form.other.prepareDeliver')} name="condition">
            <Radio.Group>
              <Radio value={1}>{t('sellerProducts.form.other.yes')}</Radio>
              <Radio value={2} className="ml-10">
                {t('sellerProducts.form.other.no')}
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col md={12}>
          <Form.Item label={t('sellerProducts.form.other.iNeedTime')} name="shelfLife">
            <Input suffix={<Text type="secondary">{t('sellerProducts.form.other.day')}</Text>} />
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
