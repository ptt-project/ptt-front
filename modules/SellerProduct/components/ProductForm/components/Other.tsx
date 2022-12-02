import React, { ChangeEvent, FC } from 'react'
import HighlightLabel from '~/components/main/HighlightLabel'
import styles from '../ProductForm.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography, Radio, Col, Form, Input, Row, FormInstance } from 'antd'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'

const { Text } = Typography

interface IOtherProps {
  form: FormInstance
}

const Other: FC<IOtherProps> = (props: IOtherProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])

  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.value || RegExpConst.MATCH_NUMBER.test(e.target.value)) {
      props.form.setFieldValue('extraDay', e.target.value)
    } else {
      props.form.setFieldValue('extraDay', e.target.value.replace(RegExpConst.ALLOW_NUMBER, ''))
    }
  }

  return (
    <>
      <HighlightLabel title={t('seller.product:form.other.title')} />
      <Row gutter={16}>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:form.other.prepareDeliver')} name="isSendLated">
            <Radio.Group className={styles.radio}>
              <Radio value={1}>{t('seller.product:form.other.yes')}</Radio>
              <Radio value={0}>{t('seller.product:form.other.no')}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:form.other.iNeedTime')} name="extraDay">
            <Input
              suffix={<Text type="secondary">{t('seller.product:form.other.day')}</Text>}
              onChange={onChange}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default Other
