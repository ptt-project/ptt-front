import React, { ChangeEvent, FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Typography, Radio, Col, Form, Input, Row, Select, FormInstance } from 'antd'
import HighlightLabel from '~/components/main/HighlightLabel'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { ProductConditionEnum } from '../../../../../enums'
import styles from '../ProductForm.module.scss'

const { Text } = Typography

interface IFeaturesProps {
  form: FormInstance
}

const Features: FC<IFeaturesProps> = (props: IFeaturesProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])

  function onChangeExp(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.value || RegExpConst.CHECK_NUMBER.test(e.target.value)) {
      props.form.setFieldValue('exp', e.target.value)
    } else {
      props.form.setFieldValue('exp', e.target.value.replace(RegExpConst.ALLOW_NUMBER, ''))
    }
  }

  function onChangeWeight(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.value || RegExpConst.CHECK_NUMBER.test(e.target.value)) {
      props.form.setFieldValue('weight', e.target.value)
    } else {
      props.form.setFieldValue(
        'weight',
        e.target.value.replace(RegExpConst.ALLOW_NUMBER_AND_DOT, '')
      )
    }
  }

  return (
    <>
      <HighlightLabel title={t('seller.product:form.features.title')} />
      <Row gutter={16}>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:form.features.brand')} name="brandId">
            <Select>
              <Select.Option value="">{t('common:form.option')}</Select.Option>
              <Select.Option value={1}>Adidas</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item
            label={t('seller.product:form.features.weight')}
            name="weight"
            // rules={[
            //   {
            //     required: true,
            //     message: `${t('common:form.required')} ${t('seller.product:form.features.weight')}`
            //   }
            // ]}
          >
            <Input
              suffix={<Text type="secondary">{t('seller.product:form.features.kg')}</Text>}
              onChange={onChangeWeight}
            />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:form.features.shelfLife')} name="exp">
            <Input
              suffix={<Text type="secondary">{t('seller.product:form.features.day')}</Text>}
              onChange={onChangeExp}
            />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:form.features.condition')} name="condition">
            <Radio.Group className={styles.radio}>
              <Radio value={ProductConditionEnum.OLD}>
                {t('seller.product:form.features.old')}
              </Radio>
              <Radio value={ProductConditionEnum.NEW}>
                {t('seller.product:form.features.new')}
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
    </>
  )
}

export default Features
