import React, { useState } from 'react'
import { Typography, Button, Row, Col, Space, Modal, notification } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import { compact } from 'lodash'
import styles from './Address.module.scss'
import AddressCard from './components/AddressCard'
import { IAddressFormValues } from '~/model/Address'
import { useVisible } from '~/utils/main/custom-hook'
import addresses from './components/AddressForm/mock-data/mock-addresses.json'
import t from '~/locales'

const { Text } = Typography

const Address: React.FC = () => {
  const router: NextRouter = useRouter()
  // const [addressPage, setAddressPage] = useState<string>(AddressPages.LIST)
  // const [editAddressId, setEditAddressId] = useState<string>()

  // eslint-disable-next-line @typescript-eslint/typedef
  const deleteAddressVisible = useVisible()

  const [favoriteAddressId, setFavoriteAddressId] = useState<string>()
  const [deleteAddressId, setDeleteAddressId] = useState<string>()

  function onAddAddressClick(): void {
    router.push('/personal-info/address/add')
  }

  function onEditAddressClick(addressId: string): void {
    router.push(`/personal-info/address/${addressId}`)
  }

  function onFavoriteAddressClick(addressId: string): void {
    setFavoriteAddressId(addressId)
    notification.success({
      message: 'Set Favorite Address Success'
    })
  }

  function onDeleteAddressClick(addressId: string): void {
    setDeleteAddressId(addressId)
    deleteAddressVisible.show()
  }

  async function onConfirmDeleteAddressClick(): Promise<void> {
    console.log({ deleteAddressId })
    setDeleteAddressId('')
    deleteAddressVisible.hide()
    notification.success({
      message: 'Delete Address Success'
    })
  }

  const deleteAddressData: IAddressFormValues = (addresses as IAddressFormValues[]).find(
    (address: IAddressFormValues) => address.id === deleteAddressId
  )

  return (
    <Space className={`${styles.page}`} direction="vertical">
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
            {(addresses as IAddressFormValues[]).map((address: IAddressFormValues) => (
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
      <Modal
        className={styles.hintModal}
        visible={deleteAddressVisible.visible}
        onCancel={deleteAddressVisible.hide}
        title={
          <Col span={24}>
            <Text>
              <h4 className="mb-0 text-center">
                <i className={`${styles.cInfo} fas fa-info-circle mr-2`} />
                ลบที่อยู่
              </h4>
            </Text>
          </Col>
        }
        footer={[
          <Col span={24}>
            <Space>
              <Button type="text" onClick={deleteAddressVisible.hide}>
                ยกเลิก
              </Button>
              <Button type="primary" onClick={onConfirmDeleteAddressClick}>
                ลบที่อยู่
              </Button>
            </Space>
          </Col>
        ]}
      >
        <Space size={4} direction="vertical">
          <Space className={styles.contentLayout} size={4} direction="vertical">
            <Text>ยืนยันการลบที่อยู่ {deleteAddressData?.fullName}</Text>
            <Text>
              {compact([
                deleteAddressData?.addressDetails,
                deleteAddressData?.district,
                deleteAddressData?.province,
                deleteAddressData?.postalCode
              ]).join(' ')}
            </Text>
          </Space>
          <Text>{deleteAddressData?.mobileNo}</Text>
          <Text type="danger">ข้อมูลจะถูกลบและไม่สามารถกู้คืนได้</Text>
        </Space>
      </Modal>
    </Space>
  )
}

export default Address
