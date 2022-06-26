import React, { useState } from 'react'
import { useRouter, NextRouter } from 'next/router'
import { Typography, Button, Row, Col } from 'antd'
import NextLink from 'next/link'
import styles from './Address.module.scss'
// import t from '~/locales'

const { Text } = Typography

// eslint-disable-next-line @typescript-eslint/typedef
const AddressPages = {
  LIST: 'list',
  ADD: 'add',
  EDIT: 'edit'
} as const

const Address: React.FC = () => {
  const router: NextRouter = useRouter()
  const [addressPage, setAddressPage] = useState(AddressPages.LIST)

  return (
    <Col className={`${styles.page}`}>
      <Text className={`title title-center ${styles.title}`}>
        <h4>บัญชีผู้ใช้</h4>
      </Text>
      <Col className="col">
        <Row>
          <Col md={22} xs={24}>
            <Text>ที่อยู่</Text>
          </Col>
          <Col md={2} xs={24}>
            <Button>+ เพิ่มที่อยู่</Button>
          </Col>
        </Row>
      </Col>
    </Col>
  )
}

export default Address
