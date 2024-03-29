import React, { useState, FC, ChangeEvent } from 'react'
import Helmet from 'react-helmet'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import Loading from '~/components/main/Loading'
import SettingSidebar from '~/components/main/SettingSidebar'
import ConfirmationModal from '~/components/main/ConfirmationModal'
import EmptySellerTable from '../../components/main/EmptySellerTable'
import styles from './SellerCategory.module.scss'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { Typography, Row, Col, Button, Table, Switch, Space, Modal, Input, message } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { IApiResponse, ICreateCategoryPayload, ICategory } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { ShopService } from '~/services'
import { CategoryStatusEnum } from '~/enums'

const { Text, Title } = Typography

interface ISellerCategoryProps {
  categories: ICategory[]
}

const SellerCategory: FC<ISellerCategoryProps> = (props: ISellerCategoryProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.catefory'])
  const router: NextRouter = useRouter()
  const columns: ColumnsType<ICategory> = [
    {
      title: t('seller.category:table.header.a'),
      dataIndex: 'name',
      key: 'name',
      sorter: (a: ICategory, b: ICategory) => a.name.localeCompare(b.name)
    },
    {
      title: t('seller.category:table.header.b'),
      dataIndex: 'createdBy',
      key: 'createdBy',
      sorter: (a: ICategory, b: ICategory) => a.createdBy.localeCompare(b.createdBy)
    },
    {
      title: t('seller.category:table.header.c'),
      dataIndex: 'productCount',
      key: 'productCount',
      align: 'right',
      sorter: (a: ICategory, b: ICategory) => a.productCount - b.productCount
    },
    {
      title: t('seller.category:table.header.d'),
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: (a: ICategory, b: ICategory) => a.status.localeCompare(b.status),
      render: (text: string, record: ICategory, index: number): JSX.Element => (
        <Switch
          className="hps-switch"
          key={index}
          defaultChecked={record.status === CategoryStatusEnum.ACTIVE}
          onChange={(checked: boolean): Promise<void> => onChangeSwitch(checked, record)}
        />
      )
    },
    {
      title: t('seller.category:table.header.e'),
      key: 'action',
      align: 'right',
      render: (text: string, record: ICategory, index: number): JSX.Element => {
        const disabled: boolean = record.productCount > 0
        const pathname: string = `/seller/settings/shop/category/${record.id}`
        return (
          <Space size="middle">
            <Text className={styles.action} onClick={(): Promise<boolean> => router.push(pathname)}>
              <i className="fas fa-pen" />
            </Text>
            <Text
              className={styles.action}
              onClick={(): void => onRemove(record, disabled)}
              disabled={disabled}
            >
              <i className="fas fa-trash-alt" />
            </Text>
          </Space>
        )
      }
    }
  ]
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false)
  const [isOpenRemove, setIsOpenRemove] = useState<boolean>(false)
  const [categoryName, setCategoryName] = useState<string>('')
  const [category, setCategory] = useState<ICategory[]>(props.categories)
  const [removeCategory, setRemoveCategory] = useState<ICategory>()

  async function fetchData(): Promise<void> {
    setIsLoading(true)
    try {
      const { data }: IApiResponse = await ShopService.getCategories()
      setCategory(data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  function toggleAdd(): void {
    setIsOpenAdd(!isOpenAdd)
  }

  function toggleRemove(): void {
    setIsOpenRemove(!isOpenRemove)
  }

  async function onChangeSwitch(checked: boolean, item: ICategory): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const status: CategoryStatusEnum = checked
        ? CategoryStatusEnum.ACTIVE
        : CategoryStatusEnum.INACTIVE
      await ShopService.changeCategoryStatus(item.id.toString(), status)
      isSuccess = true
      fetchData()
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

  function onChangeCategoryName(e: ChangeEvent<HTMLInputElement>): void {
    setCategoryName(e.target.value)
  }

  function onRemove(item: ICategory, disabled?: boolean): void {
    setRemoveCategory(item)
    if (!disabled) {
      toggleRemove()
    }
  }

  async function onConfirmRemove(): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      await ShopService.deleteCategotry(removeCategory.id.toString())
      isSuccess = true
      toggleRemove()
      fetchData()
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

  async function onSubmit(): Promise<void> {
    setIsLoading(true)
    let isSuccess: boolean = false
    try {
      const payload: ICreateCategoryPayload = { name: categoryName }
      await ShopService.createCategory(payload)
      isSuccess = true
      toggleAdd()
      fetchData()
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
          { title: t('setting-sidebar:seller.shop.category') }
        ]}
      />
      <Loading show={isLoading} />
      <Modal
        title={
          <Title className="mb-0" level={4}>
            <i className={`${styles.cInfo} fas fa-info-circle mr-2`} />
            {t('seller.category:modal.add.title')}
          </Title>
        }
        visible={isOpenAdd}
        onCancel={toggleAdd}
        footer={
          <Row>
            <Col className="text-right" span={24}>
              <Button type="default" onClick={toggleAdd}>
                {t('common:cancel')}
              </Button>
              <Button type="primary" disabled={!categoryName} onClick={onSubmit}>
                {t('common:confirm')}
              </Button>
            </Col>
          </Row>
        }
      >
        <div className={styles.label}>
          <Text className={styles.required}>*</Text>
          <Text>{t('seller.category:modal.add.form.category')}</Text>
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
                    {t('setting-sidebar:seller.shop.category')}
                  </Title>
                </Col>
                <Col className="text-right" span={12}>
                  <Button type="primary" onClick={toggleAdd}>
                    {t('seller.category:addCategory')}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table
                    className="hps-table hps-scroll"
                    size="middle"
                    columns={columns}
                    dataSource={category}
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

export default SellerCategory
