import React, { useState } from 'react'
import { Typography, Button, Row, Col } from 'antd'
import styles from './Address.module.scss'
import AddAddress from './components/AddAddress'
import EditAddress from './components/EditAddress'
// import t from '~/locales'

const { Text } = Typography

// eslint-disable-next-line @typescript-eslint/typedef
const AddressPages = {
  LIST: 'list',
  ADD: 'add',
  EDIT: 'edit'
} as const

const Address: React.FC = () => {
  const [addressPage, setAddressPage] = useState<string>(AddressPages.LIST)

  function onAddAddressClick(): void {
    setAddressPage(AddressPages.ADD)
  }

  return (
    <Col className={`${styles.page}`}>
      {addressPage === AddressPages.LIST && (
        <>
          <Text className={`title title-center ${styles.title}`}>
            <h4>บัญชีผู้ใช้</h4>
          </Text>
          <Col className="col">
            <Row>
              <Col md={22} xs={24}>
                <Text>ที่อยู่</Text>
              </Col>
              <Col md={2} xs={24}>
                <Button onClick={onAddAddressClick}>+ เพิ่มที่อยู่</Button>
              </Col>
            </Row>
          </Col>
        </>
      )}
      {addressPage === AddressPages.ADD && <AddAddress />}
      {addressPage === AddressPages.EDIT && <EditAddress />}
    </Col>
  )
}

export default Address
