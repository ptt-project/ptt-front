import React, { useState, FC, ChangeEvent, Key } from 'react'
import { useTranslation } from 'next-i18next'
import Helmet from 'react-helmet'
import { isEmpty } from 'lodash'
import numeral from 'numeral'
import { Typography, Row, Col, Button, Table, Switch, Space, Input, Modal, message } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import SettingSidebar from '~/components/main/SettingSidebar'
import Loading from '~/components/main/Loading'
import ConfirmationModal from '~/components/main/ConfirmationModal'
import EmptyTableData from '../EmptyTableData'
import AddCategoryModal from '../AddCategoryModal'
import { ICategory, IProductData, IUpdateCategoryPayload } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { CategoryStatusEnum } from '~/enums'
import { ShopService } from '~/services'
import styles from './EditCategory.module.scss'

const { Text, Title } = Typography

interface IEditCategoryProps {
  category: ICategory
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
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.category'])
  const columns: ColumnsType<IProductData> = [
    {
      title: t('seller.category:edit.table.header.a'),
      dataIndex: 'productName',
      key: 'productName',
      width: 200,
      ellipsis: true,
      sorter: (a: IProductData, b: IProductData) => a.productName.localeCompare(b.productName)
    },
    {
      title: t('seller.category:edit.table.header.b'),
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      width: 100,
      sorter: (a: IProductData, b: IProductData) => a.amount - b.amount,
      render: (text: string, recode: IProductData, index: number): string =>
        numeral(recode.amount).format('0,0.00')
    },
    {
      title: t('seller.category:edit.table.header.c'),
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
      width: 100,
      sorter: (a: IProductData, b: IProductData) => a.quantity - b.quantity
    },
    {
      title: t('seller.category:edit.table.header.d'),
      key: 'status',
      width: 100,
      sorter: (a: IProductData, b: IProductData) => a.status - b.status,
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
      }
    },
    {
      title: t('seller.category:edit.table.header.e'),
      key: 'action',
      align: 'right',
      width: 100,
      render: (text: string, record: IProductData, index: number): JSX.Element => (
        <Text className={styles.action} onClick={(): void => toggleRemove(record)}>
          <i className="fas fa-trash-alt" />
        </Text>
      )
    }
  ]
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false)
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)
  const [isOpenRemove, setIsOpenRemove] = useState<boolean>(false)
  const [isOpenMultiRemove, setIsOpenMultiRemove] = useState<boolean>(false)
  const [currentCategoryName, setCurrentCategoryName] = useState<string>(props.category.name)
  const [currentCategoryStatus, setCurrentCategoryStatus] = useState<CategoryStatusEnum>(
    props.category.status
  )
  const [categoryName, setCategoryName] = useState<string>(props.category.name)
  const [selection, setSelection] = useState<IProductData[]>([])
  const multiRemoveText: any = t('seller.category:edit.multiRemove')

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

  async function onChangeSwitch(checked: boolean): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const status: CategoryStatusEnum = checked
        ? CategoryStatusEnum.ACTIVE
        : CategoryStatusEnum.INACTIVE
      await ShopService.changeCategoryStatus(props.category.id.toString(), status)
      isSuccess = true
      setCurrentCategoryStatus(checked ? CategoryStatusEnum.ACTIVE : CategoryStatusEnum.INACTIVE)
    } catch (error) {
      console.log(error)
    }
    if (isSuccess) {
      message.success(t('common:apiMessage.success'))
    } else {
      message.error(t('common:apiMessage.error'))
    }
    setIsLoading(false)
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

  async function onConfirmEdit(): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const payload: IUpdateCategoryPayload = { name: categoryName, productIds: [] }
      await ShopService.updateCategory(props.category.id.toString(), payload)
      isSuccess = true
      toggleEdit()
      setCurrentCategoryName(categoryName)
    } catch (error) {
      console.log(error)
    }
    if (isSuccess) {
      message.success(t('common:apiMessage.success'))
    } else {
      message.error(t('common:apiMessage.error'))
    }
    setIsLoading(false)
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
          {t('common:meta.title')} | {t('seller.category:title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('setting-sidebar:seller.shop.title') },
          {
            title: t('setting-sidebar:seller.shop.category'),
            href: '/seller/settings/shop/category'
          },
          { title: currentCategoryName }
        ]}
      />
      <Loading show={isLoading} />
      <AddCategoryModal isOpen={isOpenAdd} toggle={toggleAdd} onSubmit={onConfirmAdd} />
      <Modal
        title={
          <Title className="mb-0" level={4}>
            <i className={`${styles.cInfo} fas fa-info-circle mr-2`} />
            {t('seller.category:modal.edit.title')}
          </Title>
        }
        visible={isOpenEdit}
        onCancel={toggleEdit}
        footer={
          <Row>
            <Col className="text-right" span={24}>
              <Button type="default" onClick={toggleEdit}>
                {t('common:cancel')}
              </Button>
              <Button type="primary" disabled={!categoryName} onClick={onConfirmEdit}>
                {t('common:confirm')}
              </Button>
            </Col>
          </Row>
        }
      >
        <div className={styles.label}>
          <Text className={styles.required}>*</Text>
          <Text>{t('seller.category:modal.edit.form.category')}</Text>
        </div>
        <Input showCount maxLength={40} onChange={onChangeCategoryName} value={categoryName} />
      </Modal>
      <ConfirmationModal
        type="error"
        title={t('seller.category:modal.remove.title')}
        content={t('seller.category:modal.remove.content')}
        isOpen={isOpenRemove}
        toggle={toggleRemove}
        onSubmit={onConfirmRemove}
      />
      <ConfirmationModal
        type="error"
        title={`${multiRemoveText.title} ${selection.length} ${multiRemoveText.placeholderB}`}
        content={t('seller.category:modal.remove.content')}
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
                      {currentCategoryName}
                    </Title>
                    <Text className={styles.edit} onClick={toggleEdit}>
                      <i className="fas fa-pen" />
                    </Text>
                  </Space>
                  <div className="d-block">
                    <Space size="middle">
                      <Text type="secondary">
                        {t('seller.category:edit.createdBy')}: {props.category.createdBy}
                      </Text>
                      <Text type="secondary">
                        {t('seller.category:edit.quantity')}: {props.category.productCount}
                      </Text>
                    </Space>
                  </div>
                </Col>
                <Col className="text-right" span={6}>
                  <Switch
                    className="hps-switch"
                    defaultChecked={currentCategoryStatus === CategoryStatusEnum.ACTIVE}
                    onChange={onChangeSwitch}
                  />
                </Col>
              </Row>
              <Row>
                <Col className={styles.searchWrapper} span={24}>
                  <Row align="middle">
                    <Col span={12}>
                      <Title className={styles.subLabel} level={5}>
                        {t('seller.category:edit.label')}
                      </Title>
                    </Col>
                    <Col className="text-right" span={12}>
                      <Button type="primary" onClick={toggleAdd}>
                        {t('seller.category:edit.add')}
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-3" sm={12} xs={24}>
                      <Input.Search
                        placeholder={t('seller.category:edit.search')}
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
