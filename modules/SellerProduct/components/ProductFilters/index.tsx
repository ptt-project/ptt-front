import React, { FC, useEffect } from 'react'
import styles from './ProductFilters.module.scss'
import { useTranslation } from 'next-i18next'
import { Button, Row, Col, Form, Input, Select } from 'antd'
import { LocaleNamespaceConst } from '~/constants'
import { ICategory } from '../../../../interfaces'
import { NextRouter, useRouter } from 'next/router'

interface IProductFiltersForm {
  keyword: string
  categoryId: string
  groupSearch: string
}

interface IProductFiltersProps {
  categories: ICategory[]
  query: {
    keyword: string
    categoryId: string
    groupSearch: string
    approval: boolean
    status?: string
    page: number
  }
}

const ProductFilters: FC<IProductFiltersProps> = (props: IProductFiltersProps) => {
  const router: NextRouter = useRouter()
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.product'])
  const [form] = Form.useForm()

  function onSubmit(values: IProductFiltersForm): void {
    const query: {
      keyword: string
      categoryId: string
      groupSearch: string
      page: number
    } = {
      keyword: values.keyword,
      categoryId: values.categoryId,
      groupSearch: values.groupSearch,
      page: 1
    }

    router.push({
      pathname: '/seller/settings/product',
      query
    })
  }

  function onResetFilters(): void {
    router.push('/seller/settings/product')
  }

  useEffect(() => {
    form.setFieldValue('keyword', props.query.keyword)
    form.setFieldValue('categoryId', props.query.categoryId)
    form.setFieldValue('groupSearch', props.query.groupSearch)
  }, [props.query])

  return (
    <Form
      className={styles.highlight}
      layout="vertical"
      name="productFiltersForm"
      form={form}
      initialValues={{
        keyword: props.query.keyword,
        groupSearch: props.query.groupSearch,
        categoryId: props.query.categoryId
      }}
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:list.filters.group')} name="groupSearch">
            <Select defaultValue="">
              <Select.Option value="">{t('common:form.option')}</Select.Option>
              <Select.Option value="jack">Jack</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:list.filters.keyword')} name="keyword">
            <Input />
          </Form.Item>
        </Col>
        <Col md={12} xs={24}>
          <Form.Item label={t('seller.product:list.filters.category')} name="categoryId">
            <Select defaultValue="">
              <Select.Option value="">{t('common:form.option')}</Select.Option>
              {props.categories.map((category: ICategory) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Form.Item className="mb-0">
          <Button className="mr-3" htmlType="submit" type="primary">
            {t('common:search')}
          </Button>
        </Form.Item>
        <Form.Item className="mb-0">
          <Button htmlType="reset" onClick={onResetFilters}>
            {t('common:reset')}
          </Button>
        </Form.Item>
      </Row>
    </Form>
  )
}

export default ProductFilters
