import React from 'react'
import Image from '../../../../components/main/Image'
import styles from './AddressCard.module.scss'
import { Col, Row, Space, Typography } from 'antd'
import { compact } from 'lodash'
import { IAddress } from '~/interfaces'

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
              <Image src="./images/main/buyer/address-tag-home-active.svg" alt="address-tag-home" />
            )}
            {data.isWork && (
              <Image
                src="./images/main/buyer/address-tag-office-active.svg"
                alt="address-tag-office"
              />
            )}
            {data.isMain && (
              <Image src="./images/main/buyer/address-tag-default.svg" alt="address-tag-default" />
            )}
          </Space>
          <Space className={styles.contentLayout} size={4} direction="vertical">
            <Text>{data.name}</Text>
            <Text>
              {compact([
                data.address,
                data.tambon,
                data.district,
                data.province,
                data.postcode
              ]).join(' ')}
            </Text>
          </Space>
          <Space size={4} direction="horizontal" align="end">
            <Image src="./images/main/buyer/icon-phone.svg" alt="" />
            <Text>{data.mobile}</Text>
          </Space>
        </Space>
      </Col>
      <Col className={styles.actionLayout} md={4} sm={12}>
        <div onClick={onEditClick}>
          <Image
            className={[styles.clickable, styles.actionIcon].join(' ')}
            src="./images/main/buyer/icon-edit.svg"
            alt=""
          />
        </div>
        {!data.isMain && (
          <div onClick={onSetMainClick}>
            <Image
              className={[styles.clickable, styles.actionIcon].join(' ')}
              src="./images/main/buyer/icon-favorite.svg"
              alt=""
            />
          </div>
        )}
        {!data.isMain && (
          <div onClick={onDeleteClick}>
            <Image
              className={[styles.clickable, styles.actionIcon].join(' ')}
              src="./images/main/buyer/icon-delete.svg"
              alt=""
            />
          </div>
        )}
      </Col>
    </Row>
  )
}

export default AddressCard
