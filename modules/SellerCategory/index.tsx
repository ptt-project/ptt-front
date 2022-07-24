import React, { useState, FC, ChangeEvent } from 'react'
import { NextRouter, useRouter } from 'next/router'
import Helmet from 'react-helmet'
import { Typography, Row, Col, Button, Table, Switch, Space, Modal, Input } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import SettingSidebar from '~/components/main/SettingSidebar'
import ConfirmationModal from '~/components/main/ConfirmationModal'
import EmptyTableData from './components/EmptyTableData'
import { ICategoryData } from '~/model/Seller'
import t from '~/locales'
import styles from './SellerCategory.module.scss'

const { Text, Title } = Typography

const dataSource: ICategoryData[] = [
  {
    key: '1',
    categoryName: 'ดัมเบล',
    createdBy: 'ผู้ขาย',
    quantity: 10,
    status: 1
  },
  {
    key: '2',
    categoryName: 'รองเท้าวิ่ง',
    createdBy: 'ผู้ขาย',
    quantity: 5,
    status: 0
  },
  {
    key: '3',
    categoryName: 'อาหารเสริม',
    createdBy: 'ผู้ขาย',
    quantity: 0,
    status: 1
  }
]

const SellerCategory: FC = () => {
  const router: NextRouter = useRouter()
  const columns: ColumnsType<ICategoryData> = [
    {
      title: t('sellerCategory.table.header.a'),
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: (a: ICategoryData, b: ICategoryData) => a.categoryName.localeCompare(b.categoryName)
    },
    {
      title: t('sellerCategory.table.header.b'),
      dataIndex: 'createdBy',
      key: 'createdBy',
      sorter: (a: ICategoryData, b: ICategoryData) => a.createdBy.localeCompare(b.createdBy)
    },
    {
      title: t('sellerCategory.table.header.c'),
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
      sorter: (a: ICategoryData, b: ICategoryData) => a.quantity - b.quantity
    },
    {
      title: t('sellerCategory.table.header.d'),
      key: 'status',
      align: 'center',
      sorter: (a: ICategoryData, b: ICategoryData) => a.status - b.status,
      render: (text: string, recode: ICategoryData, index: number): JSX.Element => (
        <Switch
          className="hps-switch"
          key={index}
          defaultChecked={recode.status === 1}
          onChange={onChangeSwitch}
        />
      )
    },
    {
      title: t('sellerCategory.table.header.e'),
      key: 'action',
      align: 'right',
      render: (text: string, record: ICategoryData, index: number): JSX.Element => {
        const disabled: boolean = record.quantity > 0
        const pathname: string = `/seller/settings/shop/category/${record.key}`
        return (
          <Space size="middle">
            <Text
              className={styles.action}
              onClick={(): Promise<boolean> =>
                router.push(pathname, pathname, { locale: router.locale })
              }
            >
              <i className="fa fa-pen" />
            </Text>
            <Text
              className={styles.action}
              onClick={(): void => onRemove(record, disabled)}
              disabled={disabled}
            >
              <i className="fa fa-trash-alt" />
            </Text>
          </Space>
        )
      }
    }
  ]
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false)
  const [isOpenRemove, setIsOpenRemove] = useState<boolean>(false)
  const [category, setCategory] = useState<string>('')

  function toggleAdd(): void {
    setIsOpenAdd(!isOpenAdd)
  }

  function toggleRemove(): void {
    setIsOpenRemove(!isOpenRemove)
  }

  function onChangeSwitch(checked: boolean): void {
    console.log(checked)
  }

  function onChangeCategory(e: ChangeEvent<HTMLInputElement>): void {
    setCategory(e.target.value)
  }

  function onRemove(item: ICategoryData, disabled?: boolean): void {
    console.log(item)
    if (!disabled) {
      toggleRemove()
    }
  }

  function onConfirmRemove(): void {
    console.log('remove')
    toggleRemove()
  }

  function onSubmit(): void {
    console.log(category)
    toggleAdd()
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('meta.title')} | {t('sellerCategory.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('settingSidebar.seller.shop.title') },
          { title: t('settingSidebar.seller.shop.category') }
        ]}
      />
      <Modal
        title={
          <Title className="mb-0" level={4}>
            <i className={`${styles.cInfo} fas fa-info-circle mr-2`} />
            {t('sellerCategory.modal.add.title')}
          </Title>
        }
        visible={isOpenAdd}
        onCancel={toggleAdd}
        footer={
          <Row>
            <Col className="text-right" span={24}>
              <Button type="default" onClick={toggleAdd}>
                {t('common.cancel')}
              </Button>
              <Button type="primary" disabled={!category} onClick={onSubmit}>
                {t('common.confirm')}
              </Button>
            </Col>
          </Row>
        }
      >
        <div className={styles.label}>
          <Text className={styles.required}>*</Text>
          <Text>{t('sellerCategory.modal.add.form.category')}</Text>
        </div>
        <Input showCount maxLength={40} onChange={onChangeCategory} value={category} />
      </Modal>
      <ConfirmationModal
        type="error"
        title={t('sellerCategory.modal.remove.title')}
        content={t('sellerCategory.modal.remove.content')}
        isOpen={isOpenRemove}
        toggle={toggleRemove}
        onSubmit={onConfirmRemove}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 2 }} md={24}>
              <Row>
                <Col span={12}>
                  <Title className={styles.title} level={4}>
                    {t('settingSidebar.seller.shop.category')}
                  </Title>
                </Col>
                <Col className="text-right" span={12}>
                  <Button type="primary" onClick={toggleAdd}>
                    {t('sellerCategory.addCategory')}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table
                    className="hps-table hps-scroll"
                    size="middle"
                    columns={columns}
                    dataSource={dataSource}
                    pagination={{ position: ['none', 'none'] as any }}
                    locale={{ emptyText: <EmptyTableData /> }}
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

export default SellerCategory
