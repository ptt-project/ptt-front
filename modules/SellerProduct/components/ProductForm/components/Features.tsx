import React, { ChangeEvent, FC } from 'react'
import HighlightLabel from '~/components/main/HighlightLabel'
import styles from '../ProductForm.module.scss'
import { useTranslation } from 'next-i18next'
import { Typography, Radio, Col, Form, Input, Row, Select, FormInstance } from 'antd'
import { LocaleNamespaceConst, RegExpConst } from '~/constants'
import { ProductConditionEnum } from '../../../../../enums'
import { ConfigService } from '../../../../../services'
import { IConfigOptionBrand } from '../../../../../interfaces'
import { NextRouter, useRouter } from 'next/router'
import { OptionKeyLabelUtil } from '../../../../../utils/main'

const { Text } = Typography

interface IFeaturesProps {
  form: FormInstance
}

const Features: FC<IFeaturesProps> = (props: IFeaturesProps) => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
  const { data: configOptions } = ConfigService.useGetConfigOptions()

  function onChangeExp(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.value || RegExpConst.MATCH_NUMBER.test(e.target.value)) {
      props.form.setFieldValue('exp', e.target.value)
    } else {
      props.form.setFieldValue('exp', e.target.value.replace(RegExpConst.ALLOW_NUMBER, ''))
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
              {configOptions?.brand.map((category: IConfigOptionBrand) => (
                <Select.Option key={category.value} value={category.value}>
                  {category[OptionKeyLabelUtil(router)]}
                </Select.Option>
              ))}
            </Select>
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
