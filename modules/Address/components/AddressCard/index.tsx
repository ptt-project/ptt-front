import { Card, Col, Image, Row, Space, Typography } from 'antd'
import { compact } from 'lodash'
import React from 'react'
import { IAddressFormValues } from '~/model/Address'
import styles from './AddressCard.module.scss'

const { Text } = Typography

interface IAddressCard {
  data: IAddressFormValues
  onEditClick: () => void
  onFavoriteClick: () => void
  onDeleteClick: () => void
}

const AddressCard: React.FC<IAddressCard> = (props: IAddressCard) => {
  const { data, onEditClick, onFavoriteClick, onDeleteClick } = props

  return (
    <Card className={styles.layout}>
      <Row
        gutter={{
          md: 24,
          sm: 12
        }}
      >
        <Col md={20} sm={12}>
          <Space size={8} direction="vertical">
            <Space size={4} direction="horizontal">
              {data.addressType === 'home' && (
                <Image preview={false} src="./images/main/buyer/address-tag-home-active.svg" />
              )}
              {data.addressType === 'office' && (
                <Image preview={false} src="./images/main/buyer/address-tag-office-active.svg" />
              )}
              {data.isDefault && (
                <Image preview={false} src="./images/main/buyer/address-tag-default.svg" />
              )}
            </Space>
            <Space className={styles.contentLayout} size={4} direction="vertical">
              <Text>{data.fullName}</Text>
              <Text>
                {compact([data.addressDetails, data.district, data.province, data.postalCode]).join(
                  ' '
                )}
              </Text>
            </Space>
            <Space size={4} direction="horizontal" align="end">
              <Image preview={false} src="./images/main/buyer/icon-phone.svg" />
              <Text>{data.mobileNo}</Text>
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
          {!data.isDefault && (
            <Image
              className={[styles.clickable, styles.actionIcon].join(' ')}
              preview={false}
              src="./images/main/buyer/icon-favorite.svg"
              onClick={onFavoriteClick}
            />
          )}
          {!data.isDefault && (
            <Image
              className={[styles.clickable, styles.actionIcon].join(' ')}
              preview={false}
              src="./images/main/buyer/icon-delete.svg"
              onClick={onDeleteClick}
            />
          )}
        </Col>
      </Row>
    </Card>
  )
}

export default AddressCard
