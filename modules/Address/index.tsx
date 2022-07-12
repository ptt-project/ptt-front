import React, { useState } from 'react'
import { Typography, Button, Row, Col, Space, Modal, notification, Image } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import { compact, orderBy } from 'lodash'
import Helmet from 'react-helmet'
import styles from './Address.module.scss'
import AddressCard from './components/AddressCard'
import { IAddressFormValues } from '~/model/Address'
import { useVisible } from '~/utils/main/custom-hook'
import addressesMock from './components/AddressForm/mock-data/mock-addresses.json'
import t from '~/locales'
import { CustomUrl } from '~/utils/main'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import HighlightLabel from '~/components/main/HighlightLabel'

const { Text, Link } = Typography

const Address: React.FC = () => {
  const router: NextRouter = useRouter()
  // eslint-disable-next-line @typescript-eslint/typedef
  const deleteAddressVisible = useVisible()

  const addresses: IAddressFormValues[] = (addressesMock || []) as IAddressFormValues[]

  const [deleteAddressId, setDeleteAddressId] = useState<string>()

  function onAddAddressClick(): void {
    router.push('/settings/account/address/add', '/settings/account/address/add', {
      locale: router.locale
    })
  }

  function onEditAddressClick(addressId: string): void {
    router.push(
      `/settings/account/address/${addressId}`,
      `/settings/account/address/${addressId}`,
      {
        locale: router.locale
      }
    )
  }

  function onFavoriteAddressClick(/* addressId: string */): void {
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

    notification.success({
      message: 'Delete Address Success'
    })
    deleteAddressVisible.hide()
  }

  const deleteAddressData: IAddressFormValues = (addresses as IAddressFormValues[]).find(
    (address: IAddressFormValues) => address.id === deleteAddressId
  )

  return (
    <main className="main account">
      <Helmet>
        <title>
          {t('meta.title')} | {t('address.listAddressTitle')}
        </title>
      </Helmet>
      <Breadcrumbs
        items={[
          { title: t('address.breadcrumbs.setting') },
          { title: t('address.breadcrumbs.account') },
          {
            title: t('address.breadcrumbs.address'),
            href: CustomUrl.href('/settings/account/address', router.locale)
          }
        ]}
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row>
            <Col xl={6} lg={0}>
              <SettingSidebar sidebarType="buyer" />
            </Col>
            <Col
              className="mx-auto"
              xl={{ span: 15, offset: 1 }}
              lg={{ span: 18, offset: 3 }}
              sm={24}
              xs={24}
            >
              <Row>
                <Col className="mb-4" span={24}>
                  <Text className={`text-center ${styles.title}`}>
                    <h4>{t('address.listAddressTitle')}</h4>
                  </Text>
                </Col>
                <Col span={24}>
                  <Row className={styles.addressListHead}>
                    <HighlightLabel
                      className={styles.highlightLabel}
                      title={t('address.addressLabel')}
                    />
                    <Col>
                      <Button className="hps-btn-secondary" onClick={onAddAddressClick}>
                        {t('address.addAddress')}
                      </Button>
                    </Col>
                  </Row>

                  <Row className="mt-4" gutter={[0, 16]}>
                    {addresses.length ? (
                      orderBy(addresses, (v: IAddressFormValues) => (v.isDefault ? 1 : 0), [
                        'desc'
                      ]).map((address: IAddressFormValues) => (
                        <Col key={`${address.id}`} span={24}>
                          <AddressCard
                            data={address}
                            onEditClick={onEditAddressClick.bind(null, address.id)}
                            onFavoriteClick={onFavoriteAddressClick.bind(null, address.id)}
                            onDeleteClick={onDeleteAddressClick.bind(null, address.id)}
                          />
                        </Col>
                      ))
                    ) : (
                      <Col className="w-100">
                        <div className={`mx-auto ${styles.wrapImageEmptyAddress}`}>
                          <div className={styles.imgContainer}>
                            <Image
                              rootClassName={styles.imgWrapper}
                              preview={false}
                              width="100%"
                              src="./images/main/buyer/address-empty-list.svg"
                            />
                          </div>
                        </div>
                        <div className="mt-4 text-center">
                          <Text>
                            {t('address.emptyAddress')}
                            <Link
                              className="ml-1"
                              href={CustomUrl.href('/settings/account/address/add', router.locale)}
                              underline
                            >
                              {t('address.addAddressTitle')}
                            </Link>
                          </Text>
                        </div>
                      </Col>
                    )}
                  </Row>
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
                          {t('address.deleteAddress')}
                        </h4>
                      </Text>
                    </Col>
                  }
                  footer={[
                    <Col span={24}>
                      <Space>
                        <Button type="text" onClick={deleteAddressVisible.hide}>
                          {t('common.cancel')}
                        </Button>
                        <Button type="primary" onClick={onConfirmDeleteAddressClick}>
                          {t('address.deleteAddress')}
                        </Button>
                      </Space>
                    </Col>
                  ]}
                >
                  <Space size={4} direction="vertical">
                    <Space className={styles.contentLayout} size={4} direction="vertical">
                      <Text>
                        {t('address.confirmDeleteAddress')} {deleteAddressData?.fullName}
                      </Text>
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
                    <Text type="danger">{t('address.warningMsgDeleteAddress')}</Text>
                  </Space>
                </Modal>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </main>
  )
}

export default Address
