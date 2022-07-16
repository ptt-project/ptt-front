import React, { useState, FC } from 'react'
import Helmet from 'react-helmet'
import { Typography, Row, Col, Button, Table, Switch, Space, Image } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import SettingSidebar from '~/components/main/SettingSidebar'
import ConfirmationModal from '~/components/main/ConfirmationModal'
import t from '~/locales'
import styles from './SellerCategory.module.scss'

const { Text, Title } = Typography

interface IDataType {
  key: string
  categoryName: string
  createdBy: string
  quantity: number
  status: number
}

const dataSource: IDataType[] = [
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
  const columns: ColumnsType<IDataType> = [
    {
      title: t('sellerCategory.table.header.a'),
      dataIndex: 'categoryName',
      key: 'categoryName',
      sorter: (a: IDataType, b: IDataType) => a.categoryName.localeCompare(b.categoryName)
    },
    {
      title: t('sellerCategory.table.header.b'),
      dataIndex: 'createdBy',
      key: 'createdBy',
      sorter: (a: IDataType, b: IDataType) => a.createdBy.localeCompare(b.createdBy)
    },
    {
      title: t('sellerCategory.table.header.c'),
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a: IDataType, b: IDataType) => a.quantity - b.quantity
    },
    {
      title: t('sellerCategory.table.header.d'),
      key: 'status',
      render: (text: string, recode: IDataType, index: number): JSX.Element => (
        <Switch
          className="hps-switch"
          key={index}
          defaultChecked={recode.status === 1}
          onChange={onChange}
        />
      ),
      sorter: (a: IDataType, b: IDataType) => a.status - b.status
    },
    {
      title: t('sellerCategory.table.header.e'),
      key: 'action',
      render: (text: string, record: IDataType, index: number): JSX.Element => {
        const disabled: boolean = record.quantity > 0
        return (
          <Space size="middle">
            <Text className={styles.edit}>
              <i className="fa fa-pen" />
            </Text>
            <Text
              className={styles.edit}
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
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function toggle(): void {
    setIsOpen(!isOpen)
  }

  function onChange(checked: boolean): void {
    console.log(checked)
  }

  function onRemove(item: IDataType, disabled?: boolean): void {
    console.log(item)
    if (!disabled) {
      toggle()
    }
  }

  function onConfirmRemove(): void {
    console.log('remove')
  }

  function renderEmptyData(): JSX.Element {
    return (
      <div className={styles.tableEmpty}>
        <div className={styles.imgContainer}>
          <Image
            rootClassName={styles.imgWrapper}
            preview={false}
            src="./images/main/seller/shop-category-empty.png"
            alt="register-success"
          />
        </div>
        <Text type="secondary">{t('sellerCategory.table.empty')}</Text>
      </div>
    )
  }

  return (
    <main className="main">
      <Helmet>
        <title>
          {t('meta.title')} | {t('accountProfile.form.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('settingSidebar.seller.shop.title') },
          { title: t('settingSidebar.seller.shop.category') }
        ]}
      />
      <ConfirmationModal
        type="error"
        title={t('sellerCategory.modal.remove.title')}
        content={t('sellerCategory.modal.remove.content')}
        isOpen={isOpen}
        toggle={toggle}
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
                  <Button type="primary">{t('sellerCategory.addCategory')}</Button>
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
                    locale={{ emptyText: renderEmptyData() }}
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
