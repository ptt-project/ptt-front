import React, { useState, FC, ChangeEvent, Key } from 'react'
import numeral from 'numeral'
import EmptySellerTable from '~/components/main/EmptySellerTable'
import styles from './AddFlashSaleModal.module.scss'
import { useTranslation } from 'next-i18next'
import { Modal, Row, Col, Typography, Input, Button, Table, Select } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import { LocaleNamespaceConst } from '~/constants'
import { IProductData } from '~/interfaces'

const { Title, Text } = Typography

interface IAddFlashSaleModalProps {
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

const AddFlashSaleModal: FC<IAddFlashSaleModalProps> = (props: IAddFlashSaleModalProps) => {
  const { t } = useTranslation([...LocaleNamespaceConst, 'seller.flashSale'])
  const columns: ColumnsType<IProductData> = [
    {
      title: t('seller.marketing:flashSale.add.modal.table.a'),
      dataIndex: 'productName',
      key: 'productName',
      width: 300,
      ellipsis: true,
      sorter: (a: IProductData, b: IProductData) => a.productName.localeCompare(b.productName)
    },
    {
      title: t('seller.marketing:flashSale.add.modal.table.b'),
      dataIndex: 'sold',
      key: 'sold',
      align: 'right',
      width: 100,
      sorter: (a: IProductData, b: IProductData) => a.sold - b.sold
    },
    {
      title: t('seller.marketing:flashSale.add.modal.table.c'),
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      width: 100,
      sorter: (a: IProductData, b: IProductData) => a.amount - b.amount,
      render: (text: string, record: IProductData, index: number): string =>
        numeral(record.amount).format('0,0.00')
    },
    {
      title: t('seller.marketing:flashSale.add.modal.table.d'),
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
      width: 100,
      sorter: (a: IProductData, b: IProductData) => a.quantity - b.quantity
    }
  ]
  const [keyword, setKeyword] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [selection, setSelection] = useState<IProductData[]>([])

  function onChangeKeyword(e: ChangeEvent<HTMLInputElement>): void {
    setKeyword(e.target.value)
  }

  function onChangeCategory(value: string): void {
    setCategory(value)
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
          {t('seller.marketing:flashSale.add.modal.title')}
        </Title>
      }
      visible={props.isOpen}
      onCancel={props.toggle}
      footer={
        <Row>
          <Col className="text-right" span={24}>
            <Button type="default" onClick={props.toggle}>
              {t('common:cancel')}
            </Button>
            <Button
              type="primary"
              disabled={selection.length === 0}
              onClick={(): void => props.onSubmit(selection)}
            >
              {t('common:confirm')}
            </Button>
          </Col>
        </Row>
      }
    >
      <Row>
        <Col className={styles.searchWrapper} span={24}>
          <Row gutter={16}>
            <Col lg={12} xs={24}>
              <Text className={styles.label}>
                {t('seller.marketing:flashSale.add.modal.category')}
              </Text>
              <Select onChange={onChangeCategory} value={category} style={{ width: '100%' }}>
                <Select.Option value="">{t('common:form.option')}</Select.Option>
              </Select>
            </Col>
            <Col lg={12} xs={24}>
              <Text className={styles.label}>
                {t('seller.marketing:flashSale.add.modal.product')}
              </Text>
              <Input onChange={onChangeKeyword} value={keyword} />
            </Col>
            <Col className="mt-3" span={24}>
              <Button className="mr-3" type="primary">
                {t('common:search')}
              </Button>
              <Button>{t('common:reset')}</Button>
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
            locale={{ emptyText: <EmptySellerTable /> }}
          />
        </Col>
      </Row>
    </Modal>
  )
}

export default AddFlashSaleModal
