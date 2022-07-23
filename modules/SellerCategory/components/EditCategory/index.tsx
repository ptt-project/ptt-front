import React, { useState, FC, ChangeEvent, Key } from 'react'
import Helmet from 'react-helmet'
import { isEmpty } from 'lodash'
import { Typography, Row, Col, Button, Table, Switch, Space, Input, Modal } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import SettingSidebar from '~/components/main/SettingSidebar'
import ConfirmationModal from '~/components/main/ConfirmationModal'
import EmptyTableData from '../EmptyTableData'
import AddCategoryModal from '../AddCategoryModal'
import { IProductData, ICategoryData } from '~/model/Seller'
import t from '~/locales'
import styles from './EditCategory.module.scss'

const { Text, Title } = Typography

interface IEditCategoryProps {
  category: ICategoryData
}

const dataSource: IProductData[] = [
  {
    key: '1',
    productName: 'WelStore FITTERGEAR Femmine Training Gloves',
    brand: 'WelStore',
    amount: 599,
    quantity: 10,
    sold: 3,
    status: 2
  },
  {
    key: '2',
    productName: 'WelStore FITTERGEAR Male Training Gloves',
    brand: 'WelStore',
    amount: 500,
    quantity: 15,
    sold: 5,
    status: 0
  }
]

const EditCategory: FC<IEditCategoryProps> = (props: IEditCategoryProps) => {
  const columns: ColumnsType<IProductData> = [
    {
      title: t('sellerCategory.edit.table.header.a'),
      dataIndex: 'productName',
      key: 'productName',
      sorter: (a: IProductData, b: IProductData) => a.productName.localeCompare(b.productName),
      width: 220,
      ellipsis: true
    },
    {
      title: t('sellerCategory.edit.table.header.b'),
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      sorter: (a: IProductData, b: IProductData) => a.amount - b.amount
    },
    {
      title: t('sellerCategory.edit.table.header.c'),
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
      sorter: (a: IProductData, b: IProductData) => a.quantity - b.quantity
    },
    {
      title: t('sellerCategory.edit.table.header.d'),
      key: 'status',
      render: (text: string, recode: IProductData, index: number): string => {
        switch (recode.status) {
          case 0:
            return 'รอ Approve'
          case 1:
            return 'Approve'
          case 2:
            return 'ขายอยู่'
          default:
            return 'ไม่ระบุ'
        }
      },
      sorter: (a: IProductData, b: IProductData) => a.status - b.status
    },
    {
      title: t('sellerCategory.edit.table.header.e'),
      key: 'action',
      align: 'right',
      render: (text: string, record: IProductData, index: number): JSX.Element => (
        <Text className={styles.action} onClick={(): void => toggleRemove(record)}>
          <i className="fa fa-trash-alt" />
        </Text>
      )
    }
  ]
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false)
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)
  const [isOpenRemove, setIsOpenRemove] = useState<boolean>(false)
  const [isOpenMultiRemove, setIsOpenMultiRemove] = useState<boolean>(false)
  const [categoryName, setCategoryName] = useState<string>(props.category.categoryName)
  const [selection, setSelection] = useState<IProductData[]>([])
  const multiRemoveText: any = t('sellerCategory.edit.multiRemove')

  function toggleAdd(): void {
    setIsOpenAdd(!isOpenAdd)
  }

  function toggleEdit(): void {
    setIsOpenEdit(!isOpenEdit)
  }

  function toggleRemove(record?: IProductData): void {
    if (record) {
      console.log(record)
    }
    setIsOpenRemove(!isOpenRemove)
  }

  function toggleMultiRemove(): void {
    setIsOpenMultiRemove(!isOpenMultiRemove)
  }

  function onChangeCategoryName(e: ChangeEvent<HTMLInputElement>): void {
    setCategoryName(e.target.value)
  }

  function onChangeSwitch(checked: boolean): void {
    console.log(checked)
  }

  function onChangeSelectRow(selectedRowKeys: Key[], selectedRows: IProductData[]): void {
    console.log(selectedRows)
    setSelection(selectedRows)
  }

  function onSearch(value: string): void {
    console.log(value)
  }

  function onConfirmAdd(products: IProductData[]): void {
    console.log(products)
    toggleAdd()
  }

  function onConfirmEdit(): void {
    console.log(categoryName)
    toggleEdit()
  }

  function onConfirmRemove(): void {
    console.log('remove')
    toggleRemove()
  }

  function onConfirmMultiRemove(): void {
    console.log('multi remove')
    toggleMultiRemove()
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
          {
            title: t('settingSidebar.seller.shop.category'),
            href: '/seller/settings/shop/category'
          },
          { title: props.category.categoryName }
        ]}
      />
      <AddCategoryModal isOpen={isOpenAdd} toggle={toggleAdd} onSubmit={onConfirmAdd} />
      <Modal
        title={
          <Title className="mb-0" level={4}>
            <i className={`${styles.cInfo} fas fa-info-circle mr-2`} />
            {t('sellerCategory.modal.edit.title')}
          </Title>
        }
        visible={isOpenEdit}
        onCancel={toggleEdit}
        footer={
          <Row>
            <Col className="text-right" span={24}>
              <Button type="default" onClick={toggleEdit}>
                {t('common.cancel')}
              </Button>
              <Button type="primary" disabled={!categoryName} onClick={onConfirmEdit}>
                {t('common.confirm')}
              </Button>
            </Col>
          </Row>
        }
      >
        <div className={styles.label}>
          <Text className={styles.required}>*</Text>
          <Text>{t('sellerCategory.modal.edit.form.category')}</Text>
        </div>
        <Input showCount maxLength={40} onChange={onChangeCategoryName} value={categoryName} />
      </Modal>
      <ConfirmationModal
        type="error"
        title={t('sellerCategory.modal.remove.title')}
        content={t('sellerCategory.modal.remove.content')}
        isOpen={isOpenRemove}
        toggle={toggleRemove}
        onSubmit={onConfirmRemove}
      />
      <ConfirmationModal
        type="error"
        title={`${multiRemoveText.title} ${selection.length} ${multiRemoveText.placeholderB}`}
        content={t('sellerCategory.modal.remove.content')}
        isOpen={isOpenMultiRemove}
        toggle={toggleMultiRemove}
        onSubmit={onConfirmMultiRemove}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row gutter={48}>
            <Col xl={6}>
              <SettingSidebar sidebarType="seller" />
            </Col>
            <Col xl={{ span: 15, offset: 1 }} lg={{ span: 18, offset: 2 }} md={24}>
              <Row align="middle">
                <Col span={18}>
                  <Space align="center">
                    <Title className={styles.title} level={4}>
                      {props.category.categoryName}
                    </Title>
                    <Text className={styles.edit} onClick={toggleEdit}>
                      <i className="fa fa-pen" />
                    </Text>
                  </Space>
                  <div className="d-block">
                    <Space size="middle">
                      <Text type="secondary">
                        {t('sellerCategory.edit.createdBy')}: {props.category.createdBy}
                      </Text>
                      <Text type="secondary">
                        {t('sellerCategory.edit.quantity')}: {props.category.quantity}
                      </Text>
                    </Space>
                  </div>
                </Col>
                <Col className="text-right" span={6}>
                  <Switch
                    className="hps-switch"
                    defaultChecked={props.category.status === 1}
                    onChange={onChangeSwitch}
                  />
                </Col>
              </Row>
              <Row>
                <Col className={styles.searchWrapper} span={24}>
                  <Row align="middle">
                    <Col span={12}>
                      <Title className={styles.subLabel} level={5}>
                        {t('sellerCategory.edit.label')}
                      </Title>
                    </Col>
                    <Col className="text-right" span={12}>
                      <Button type="primary" onClick={toggleAdd}>
                        {t('sellerCategory.edit.add')}
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-3" sm={12} xs={24}>
                      <Input.Search
                        placeholder={t('sellerCategory.edit.search')}
                        allowClear
                        onSearch={onSearch}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              {!isEmpty(selection) ? (
                <Row>
                  <Col className="text-right mb-3" span={24}>
                    <Space size="middle">
                      <Text type="secondary">
                        {multiRemoveText.placeholderA} {selection.length}{' '}
                        {multiRemoveText.placeholderB}
                      </Text>
                      <Button type="primary" danger ghost onClick={toggleMultiRemove}>
                        {multiRemoveText.title}
                      </Button>
                    </Space>
                  </Col>
                </Row>
              ) : null}
              <Row>
                <Col span={24}>
                  <Table
                    className="hps-table hps-scroll"
                    size="middle"
                    rowSelection={{
                      type: 'checkbox',
                      onChange: onChangeSelectRow
                    }}
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

export default EditCategory
