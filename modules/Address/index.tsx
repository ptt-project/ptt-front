import React, { useState } from 'react'
import { Typography, Button, Row, Col, Space } from 'antd'
import styles from './Address.module.scss'
import AddAddress from './components/AddAddress'
import EditAddress from './components/EditAddress'
import AddressCard from './components/AddressCard'
import { IAddressFormValues } from '~/model/Address'
// import t from '~/locales'

const { Text } = Typography

export const addresses: IAddressFormValues[] = [
  {
    id: '1',
    addressType: 'home',
    fullName: 'สมชาย ใจดี',
    addressDetails: '2034/28 ซ.สุขุมวิท 60/2 ถ.สุขุมวิท แขวงบางจาก',
    district: 'เขตพระโขนง',
    province: 'กรุงเทพมหานคร',
    postalCode: '10260',
    mobileNo: '0800000000',
    isDefault: true,
    isRefundStore: false,
    isStore: false,
    location: {
      lat: 13,
      lng: 99.3
    }
  },
  {
    id: '2',
    addressType: 'office',
    fullName: 'สมชาย2 ใจใจหน่อย',
    addressDetails: '2034/28 ซ.สุขุมวิท 60/2 ถ.สุขุมวิท แขวงบางจาก',
    district: 'เขตพระโขนง',
    province: 'กรุงเทพมหานคร',
    postalCode: '10260',
    mobileNo: '0800000000',
    isDefault: false,
    isRefundStore: false,
    isStore: false,
    location: {
      lat: 13,
      lng: 99.3
    }
  },
  {
    id: '3',
    addressType: 'home',
    fullName: 'สมชาย3 ใจเริ่มไม่ดีละ',
    addressDetails: '2034/28 ซ.สุขุมวิท 60/2 ถ.สุขุมวิท แขวงบางจาก',
    district: 'เขตพระโขนง',
    province: 'กรุงเทพมหานคร',
    postalCode: '10260',
    mobileNo: '0800000000',
    isDefault: false,
    isRefundStore: false,
    isStore: false,
    location: {
      lat: 13,
      lng: 99.3
    }
  },
  {
    id: 'ภ',
    fullName: 'สมชาย4 ใจ...?',
    addressDetails: '2034/28 ซ.สุขุมวิท 60/2 ถ.สุขุมวิท แขวงบางจาก',
    district: 'เขตพระโขนง',
    province: 'กรุงเทพมหานคร',
    postalCode: '10260',
    mobileNo: '0800000000',
    isDefault: false,
    isRefundStore: false,
    isStore: false,
    location: {
      lat: 13,
      lng: 99.3
    }
  }
]

// eslint-disable-next-line @typescript-eslint/typedef
const AddressPages = {
  LIST: 'list',
  ADD: 'add',
  EDIT: 'edit'
} as const

const Address: React.FC = () => {
  const [addressPage, setAddressPage] = useState<string>(AddressPages.LIST)
  const [editAddressId, setEditAddressId] = useState<string>()
  const [favoriteAddressId, setFavoriteAddressId] = useState<string>()
  const [deleteAddressId, setDeleteAddressId] = useState<string>()

  function onAddAddressClick(): void {
    setAddressPage(AddressPages.ADD)
  }

  function onEditAddressClick(addressId: string): void {
    setEditAddressId(addressId)
    setAddressPage(AddressPages.EDIT)
  }

  function onFavoriteAddressClick(addressId: string): void {
    setFavoriteAddressId(addressId)
  }

  function onDeleteAddressClick(addressId: string): void {
    setDeleteAddressId(addressId)
  }

  return (
    <Col className={`${styles.page}`}>
      {addressPage === AddressPages.LIST && (
        <>
          <Text className={`title title-center ${styles.title}`}>
            <h4>บัญชีผู้ใช้</h4>
          </Text>
          <Col>
            <Row>
              <Col md={22} xs={24}>
                <Text>ที่อยู่</Text>
              </Col>
              <Col md={2} xs={24}>
                <Button onClick={onAddAddressClick}>+ เพิ่มที่อยู่</Button>
              </Col>
            </Row>
            <Col>
              <Space
                className={styles.addressList}
                size={16}
                direction="vertical"
                style={{
                  width: '100%'
                }}
              >
                {addresses.map((address: IAddressFormValues) => (
                  <AddressCard
                    key={`${address.id}`}
                    data={address}
                    onEditClick={onEditAddressClick.bind(null, address.id)}
                    onFavoriteClick={onFavoriteAddressClick.bind(null, address.id)}
                    onDeleteClick={onDeleteAddressClick.bind(null, address.id)}
                  />
                ))}
              </Space>
            </Col>
          </Col>
        </>
      )}
      {addressPage === AddressPages.ADD && <AddAddress />}
      {addressPage === AddressPages.EDIT && <EditAddress addressId={editAddressId} />}
    </Col>
  )
}

export default Address
