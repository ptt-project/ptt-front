import React, { FC } from 'react'
import Helmet from 'react-helmet'
import { Typography, Row, Col, Button, Table, Switch, Space, Image, Input } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import SettingSidebar from '~/components/main/SettingSidebar'
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
    amount: 599,
    quantity: 10,
    status: 2
  },
  {
    key: '2',
    productName: 'WelStore FITTERGEAR Male Training Gloves',
    amount: 500,
    quantity: 15,
    status: 0
  }
]

const EditCategory: FC<IEditCategoryProps> = (props: IEditCategoryProps) => {
  // const router: NextRouter = useRouter()
  const columns: ColumnsType<IProductData> = [
    {
      title: t('sellerCategory.edit.table.header.a'),
      dataIndex: 'productName',
      key: 'productName',
      sorter: (a: IProductData, b: IProductData) => a.productName.localeCompare(b.productName)
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
        <Text className={styles.action} onClick={(): void => onRemove(record)}>
          <i className="fa fa-trash-alt" />
        </Text>
      )
    }
  ]

  function onChangeSwitch(checked: boolean): void {
    console.log(checked)
  }

  function onSearch(value: string): void {
    console.log(value)
  }

  function onRemove(item: IProductData): void {
    console.log(item)
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
          {t('meta.title')} | {t('sellerCategory.title')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('settingSidebar.seller.shop.title') },
          {
            title: t('settingSidebar.seller.shop.category'),
            href: '/seller/setting/shop/category'
          },
          { title: props.category.categoryName }
        ]}
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
                  <Title className={styles.title} level={4}>
                    {props.category.categoryName}
                  </Title>
                  <Space size="middle">
                    <Text type="secondary">
                      {t('sellerCategory.edit.createdBy')}: {props.category.createdBy}
                    </Text>
                    <Text type="secondary">
                      {t('sellerCategory.edit.quantity')}: {props.category.quantity}
                    </Text>
                  </Space>
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
                <Col className={styles.filtersWrapper} span={24}>
                  <Row align="middle">
                    <Col span={12}>
                      <Title className={styles.label} level={5}>
                        {t('sellerCategory.edit.label')}
                      </Title>
                    </Col>
                    <Col className="text-right" span={12}>
                      <Button type="primary">{t('sellerCategory.edit.add')}</Button>
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
              <Row>
                <Col span={24}>
                  <Table
                    className="hps-table hps-scroll"
                    size="middle"
                    rowSelection={{
                      type: 'checkbox'
                      // ...rowSelection
                    }}
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

export default EditCategory
