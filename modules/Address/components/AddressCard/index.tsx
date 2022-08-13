import { Col, Image, Row, Space, Typography } from 'antd'
import { compact } from 'lodash'
import React from 'react'
import { IAddress } from '~/interfaces'
import styles from './AddressCard.module.scss'

const { Text } = Typography

interface IAddressCard {
  data: IAddress
  onEditClick: () => void
  onSetMainClick: () => void
  onDeleteClick: () => void
}

const AddressCard: React.FC<IAddressCard> = (props: IAddressCard) => {
  const { data, onEditClick, onSetMainClick, onDeleteClick } = props

  return (
    <Row
      className={styles.layout}
      gutter={{
        md: 24,
        sm: 12
      }}
    >
      <Col md={20} sm={12}>
        <Space size={8} direction="vertical">
          <Space size={4} direction="horizontal">
            {data.isHome && (
              <Image preview={false} src="./images/main/buyer/address-tag-home-active.svg" />
            )}
            {data.isWork && (
              <Image preview={false} src="./images/main/buyer/address-tag-office-active.svg" />
            )}
            {data.isMain && (
              <Image preview={false} src="./images/main/buyer/address-tag-default.svg" />
            )}
          </Space>
          <Space className={styles.contentLayout} size={4} direction="vertical">
            <Text>{data.name}</Text>
            <Text>
              {compact([data.address, data.district, data.province, data.postcode]).join(' ')}
            </Text>
          </Space>
          <Space size={4} direction="horizontal" align="end">
            <Image preview={false} src="./images/main/buyer/icon-phone.svg" />
            <Text>{data.mobile}</Text>
          </Space>
        </Space>
      </Col>
      <Col className={styles.actionLayout} md={4} sm={12}>
        <Image
          className={[styles.clickable, styles.actionIcon].join(' ')}
          preview={false}
          src="./images/main/buyer/icon-edit.svg"
          onClick={onEditClick}
        />
        {!data.isMain && (
          <Image
            className={[styles.clickable, styles.actionIcon].join(' ')}
            preview={false}
            src="./images/main/buyer/icon-favorite.svg"
            onClick={onSetMainClick}
          />
        )}
        {!data.isMain && (
          <Image
            className={[styles.clickable, styles.actionIcon].join(' ')}
            preview={false}
            src="./images/main/buyer/icon-delete.svg"
            onClick={onDeleteClick}
          />
        )}
      </Col>
    </Row>
  )
}

export default AddressCard
