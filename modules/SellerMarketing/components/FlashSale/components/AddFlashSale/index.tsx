import React, { FC } from 'react'
import Helmet from 'react-helmet'
import Breadcrumbs from '../../../../../../components/main/Breadcrumbs'
import SettingSidebar from '../../../../../../components/main/SettingSidebar'
import HighlightLabel from '../../../../../../components/main/HighlightLabel'
import EmptySellerTable from '../../../../../../components/main/EmptySellerTable'
import styles from './AddFlashSale.module.scss'
import { useTranslation } from 'next-i18next'
import { Button, Col, DatePicker, Form, Input, Row, Select, Table, Typography } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { LocaleNamespaceConst } from '../../../../../../constants'
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker'

const { Title } = Typography

interface IAddFlashSaleData {
  key: string
  title: string
  discount: number
  promotionStock: number
  limit: number
  action: boolean
}

const dataSource: IAddFlashSaleData[] = []

const AddFlashSale: FC = () => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.marketing'])

  const columns: ColumnsType<IAddFlashSaleData> = [
    {
      title: t('seller.marketing:flashSale.add.table.a'),
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: t('seller.marketing:flashSale.add.table.b'),
      dataIndex: 'discount',
      key: 'discount'
    },
    {
      title: t('seller.marketing:flashSale.add.table.c'),
      dataIndex: 'promotionStock',
      key: 'promotionStock'
    },
    {
      title: t('seller.marketing:flashSale.add.table.d'),
      key: 'limit',
      dataIndex: 'limit'
    },
    {
      title: t('seller.marketing:flashSale.add.table.e'),
      key: 'action',
      dataIndex: 'action'
    }
  ]

  function onChange(
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string
  ): void {
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString)
  }

  function onOk(value: DatePickerProps['value'] | RangePickerProps['value']): void {
    console.log('onOk: ', value)
  }

  function onSearch(value: string): void {
    console.log(value)
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('common:meta.title')} | {t('seller.product:list.myProduct')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('seller.marketing:title'), href: '/seller/settings/marketing' },
          {
            title: t('seller.marketing:flashSale.title'),
            href: '/seller/settings/marketing/flash-sale'
          },
          { title: t('seller.marketing:flashSale.add.title') }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 2 }} md={24}>
              <Title className={styles.title} level={4}>
                {t('seller.marketing:flashSale.add.title')}
              </Title>
              <HighlightLabel
                className="mb-3"
                title={t('seller.marketing:flashSale.add.label')}
                color="secondary"
              />
              <Form layout="vertical" initialValues={{ timeCycle: '' }}>
                <Row gutter={[16, 16]}>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      label={t('seller.marketing:flashSale.add.filters.activeDate')}
                      name="activeDate"
                    >
                      <DatePicker.RangePicker
                        style={{ width: '100%' }}
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={onChange}
                        onOk={onOk}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={12} xs={24}>
                    <Form.Item
                      label={t('seller.marketing:flashSale.add.filters.timeCycle')}
                      name="timeCycle"
                    >
                      <Select>
                        <Select.Option value="">{t('common:form.option')}</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
              <Row className={styles.filter} gutter={[16, 16]}>
                <Col span={24}>
                  <div className={styles.labelBox}>
                    <h6 className={styles.label}>
                      {t('seller.marketing:flashSale.add.filters.label')}
                    </h6>
                    <Button type="primary">
                      <i className="fa fa-plus mr-2" />
                      {t('seller.marketing:flashSale.add.filters.button')}
                    </Button>
                  </div>
                </Col>
                <Col sm={12} xs={24}>
                  <Input.Search
                    placeholder={t('seller.marketing:flashSale.add.filters.placeholder')}
                    allowClear
                    onSearch={onSearch}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table
                    className={`${styles.table} hps-table hps-scroll`}
                    size="middle"
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{ position: ['none', 'none'] as any }}
                    locale={{ emptyText: <EmptySellerTable /> }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default AddFlashSale
