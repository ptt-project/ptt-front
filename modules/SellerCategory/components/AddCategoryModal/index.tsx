import React, { useState, FC, ChangeEvent, Key } from 'react'
import numeral from 'numeral'
import { Modal, Row, Col, Typography, Input, Button, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import EmptyTableData from '../EmptyTableData'
import { RegExpConst } from '~/constants'
import { IProductData } from '~/model/Seller'
import t from '~/locales'
import styles from './AddCategoryModal.module.scss'

const { Title, Text } = Typography

interface IAddCategoryModalProps {
  isOpen: boolean
  toggle: () => void
  onSubmit: (selection: IProductData[]) => void
}

const dataSource: IProductData[] = [
  {
    key: '1',
    productName: 'WelStore FITTERGEAR Training gloves mech revolution',
    brand: 'WelStore',
    amount: 499,
    quantity: 10,
    sold: 3,
    status: 2
  },
  {
    key: '2',
    productName: 'WelStore FITTERGEAR Femmine Training Gloves',
    brand: 'WelStore',
    amount: 599,
    quantity: 10,
    sold: 27,
    status: 2
  },
  {
    key: '3',
    productName: 'WelStore FITTERGEAR Uni Training Gloves',
    brand: 'WelStore',
    amount: 579,
    quantity: 4,
    sold: 5,
    status: 2
  },
  {
    key: '4',
    productName: 'WelStore FITTERGEAR Male Training Gloves',
    brand: 'WelStore',
    amount: 500,
    quantity: 15,
    sold: 12,
    status: 2
  },
  {
    key: '5',
    productName: 'Everlast Weight Lifting Gloves',
    brand: 'WelStore',
    amount: 490,
    quantity: 200,
    sold: 36,
    status: 2
  },
  {
    key: '6',
    productName: 'Everlast SINGLE TUBE HANDLE',
    brand: 'WelStore',
    amount: 550,
    quantity: 150,
    sold: 45,
    status: 2
  },
  {
    key: '7',
    productName: 'Everlast PAIR TUBE HANDLE',
    brand: 'WelStore',
    amount: 1000,
    quantity: 226,
    sold: 70,
    status: 2
  },
  {
    key: '8',
    productName: 'Everlast SINGLE TUBE HANDLE',
    brand: 'WelStore',
    amount: 550,
    quantity: 63,
    sold: 10,
    status: 2
  },
  {
    key: '9',
    productName: 'EVERLAST WEIGHTED เสื้อถ่วงน้ำหนัก',
    brand: 'WelStore',
    amount: 1500,
    quantity: 12,
    sold: 2,
    status: 2
  }
]

const AddCategoryModal: FC<IAddCategoryModalProps> = (props: IAddCategoryModalProps) => {
  const columns: ColumnsType<IProductData> = [
    {
      title: t('sellerCategory.add.table.header.a'),
      dataIndex: 'productName',
      key: 'productName',
      width: 300,
      ellipsis: true,
      sorter: (a: IProductData, b: IProductData) => a.productName.localeCompare(b.productName)
    },
    {
      title: t('sellerCategory.add.table.header.b'),
      dataIndex: 'brand',
      key: 'brand',
      width: 100,
      sorter: (a: IProductData, b: IProductData) => a.brand.localeCompare(b.brand)
    },
    {
      title: t('sellerCategory.add.table.header.c'),
      dataIndex: 'sold',
      key: 'sold',
      align: 'right',
      width: 100,
      sorter: (a: IProductData, b: IProductData) => a.sold - b.sold
    },
    {
      title: t('sellerCategory.add.table.header.d'),
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      width: 100,
      sorter: (a: IProductData, b: IProductData) => a.amount - b.amount,
      render: (text: string, recode: IProductData, index: number): string =>
        numeral(recode.amount).format('0,0.00')
    },
    {
      title: t('sellerCategory.add.table.header.e'),
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
      width: 100,
      sorter: (a: IProductData, b: IProductData) => a.quantity - b.quantity
    }
  ]
  const [keyword, setKeyword] = useState<string>()
  const [min, setMin] = useState<string>('')
  const [max, setMax] = useState<string>('')
  const [selection, setSelection] = useState<IProductData[]>([])

  function onChangeKeyword(e: ChangeEvent<HTMLInputElement>): void {
    setKeyword(e.target.value)
  }

  function onChangeNumber(e: ChangeEvent<HTMLInputElement>): void {
    let value: string = ''
    if (!e.target.value || RegExpConst.CHECK_NUMBER.test(e.target.value)) {
      value = e.target.value
    } else {
      value = e.target.value.replace(RegExpConst.ALLOW_NUMBER, '')
    }
    if (e.target.name === 'min') {
      setMin(value)
    }
    if (e.target.name === 'max') {
      setMax(value)
    }
  }

  function onChangeSelectRow(selectedRowKeys: Key[], selectedRows: IProductData[]): void {
    console.log(selectedRows)
    setSelection(selectedRows)
  }

  return (
    <Modal
      width={800}
      title={
        <Title className="mb-0" level={4}>
          <i className={`${styles.cInfo} fas fa-info-circle mr-2`} />
          {t('sellerCategory.add.title')}
        </Title>
      }
      visible={props.isOpen}
      onCancel={props.toggle}
      footer={
        <Row>
          <Col className="text-right" span={24}>
            <Button type="default" onClick={props.toggle}>
              {t('common.cancel')}
            </Button>
            <Button
              type="primary"
              disabled={selection.length === 0}
              onClick={(): void => props.onSubmit(selection)}
            >
              {t('common.confirm')}
            </Button>
          </Col>
        </Row>
      }
    >
      <Row>
        <Col className={styles.searchWrapper} span={24}>
          <Row gutter={16}>
            <Col lg={12} xs={24}>
              <Text className={styles.label}>{t('sellerCategory.add.search.name')}</Text>
              <Input name="keyword" onChange={onChangeKeyword} value={keyword} />
            </Col>
            <Col lg={6} xs={12}>
              <Text className={styles.label}>{t('sellerCategory.add.search.min')}</Text>
              <Input name="min" onChange={onChangeNumber} value={min} />
            </Col>
            <Col lg={6} xs={12}>
              <Text className={styles.label}>{t('sellerCategory.add.search.max')}</Text>
              <Input name="max" onChange={onChangeNumber} value={max} />
            </Col>
            <Col className="mt-3" span={24}>
              <Button className="mr-3" type="primary">
                {t('common.search')}
              </Button>
              <Button>{t('common.reset')}</Button>
            </Col>
          </Row>
        </Col>
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
    </Modal>
  )
}

export default AddCategoryModal
