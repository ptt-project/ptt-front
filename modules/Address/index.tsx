import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import Helmet from 'react-helmet'
import AddressCard from './components/AddressCard'
import SettingSidebar from '~/components/main/SettingSidebar'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import HighlightLabel from '~/components/main/HighlightLabel'
import styles from './Address.module.scss'
import { Typography, Button, Row, Col, Space, Modal, Image, message } from 'antd'
import { NextRouter, useRouter } from 'next/router'
import { compact, orderBy } from 'lodash'
import { useTranslation } from 'next-i18next'
import { IAddress, IAddressFormValues, IApiResponse, ICustomHookUseVisibleUtil } from '~/interfaces'
import { CustomHookUseVisibleUtil, CustomUrlUtil } from '~/utils/main'
import { LocaleNamespaceConst } from '~/constants'
import { MemberService } from '~/services'

const { Text, Title, Link } = Typography

export interface IAddressProps {
  isSeller?: boolean
  addresses?: IAddress[]
}
const Address: FC<IAddressProps> = (props: IAddressProps) => {
  const { addresses: addressesFromServerSide } = props

  const router: NextRouter = useRouter()

  const { t } = useTranslation([...LocaleNamespaceConst, 'address', 'setting-sidebar'])
  const [addresses, setAddresses] = useState<IAddress[]>(addressesFromServerSide || [])
  const deleteAddressVisible: ICustomHookUseVisibleUtil = CustomHookUseVisibleUtil()

  const rootMenu: string = props.isSeller ? '/seller' : ''
  const prefixMenu: string = props.isSeller ? 'management' : 'account'

  const [deleteAddressId, setDeleteAddressId] = useState<string>()

  const fetchAddresses: () => Promise<void> = useCallback(async (): Promise<void> => {
    try {
      const { data }: IApiResponse = await MemberService.getAddresses()
      setAddresses(data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    if (!addressesFromServerSide?.length) {
      fetchAddresses()
    }
  }, [addressesFromServerSide, fetchAddresses])

  function onAddAddressClick(): void {
    router.push(`${rootMenu}/settings/${prefixMenu}/address/add`)
  }

  function onEditAddressClick(addressId: string): void {
    router.push(`${rootMenu}/settings/${prefixMenu}/address/${addressId}`)
  }

  async function onSetMainAddressClick(addressId: string): Promise<void> {
    try {
      await MemberService.setMainAddress(addressId)
      await fetchAddresses()
      message.success(t('common:dataUpdated'))
    } catch (error) {
      //
    }
  }

  function onDeleteAddressClick(addressId: string): void {
    setDeleteAddressId(addressId)
    deleteAddressVisible.show()
  }

  async function onConfirmDeleteAddressClick(): Promise<void> {
    try {
      await MemberService.deleteAddress(deleteAddressId)
      await fetchAddresses()
      message.success(t('common:dataUpdated'))
      setDeleteAddressId('')
    } catch (error) {
      //
    }
    deleteAddressVisible.hide()
  }

  const deleteAddressData: IAddress = useMemo(
    () => addresses.find((address: IAddress) => address.id === deleteAddressId),
    [addresses, deleteAddressId]
  )

  return (
    <main className="main">
      <Helmet>
        {t('common:meta.title')} | {t('address:title')}
      </Helmet>
      <Breadcrumbs
        items={
          props.isSeller
            ? [
                { title: t('setting-sidebar:seller.management.title') },
                { title: t('setting-sidebar:seller.management.address') }
              ]
            : [
                { title: t('address:breadcrumbs.setting') },
                { title: t('address:breadcrumbs.account') },
                { title: t('address:breadcrumbs.address') }
              ]
        }
      />
      <div className="page-content mb-9">
        <div className="container">
          <Row>
            <Col xl={6} lg={0}>
              <SettingSidebar sidebarType={props.isSeller ? 'seller' : 'buyer'} />
            </Col>
            <Col
              className="mx-auto"
              xl={{ span: 15, offset: 1 }}
              lg={{ span: 18, offset: 3 }}
              sm={24}
              xs={24}
            >
              <Row>
                <Col span={24}>
                  <Title className="hps-title" level={4}>
                    {props.isSeller
                      ? t('setting-sidebar:seller.management.address')
                      : t('address:listAddressTitle')}
                  </Title>
                </Col>
                <Col span={24}>
                  <Row className={styles.addressListHead}>
                    <HighlightLabel
                      className={styles.highlightLabel}
                      title={t('address:addressLabel')}
                    />
                    <Col>
                      <Button className="hps-btn-secondary" onClick={onAddAddressClick}>
                        <i className="fa fa-plus mr-2" />
                        {t('address:addAddressTitle')}
                      </Button>
                    </Col>
                  </Row>

                  <Row className="mt-4" gutter={[0, 16]}>
                    {addresses.length ? (
                      orderBy(addresses, (v: IAddressFormValues) => (v.isMain ? 1 : 0), [
                        'desc'
                      ]).map((address: IAddressFormValues) => (
                        <Col key={`${address.id}`} span={24}>
                          <AddressCard
                            data={address}
                            onEditClick={onEditAddressClick.bind(null, address.id)}
                            onSetMainClick={onSetMainAddressClick.bind(null, address.id)}
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
                              alt="address-empty-list"
                            />
                          </div>
                        </div>
                        <div className="mt-4 text-center">
                          <Text>
                            {t('address:emptyAddress')}
                            <Link
                              className="ml-1"
                              href={CustomUrlUtil(
                                `${rootMenu}/settings/${prefixMenu}/address/add`,
                                router.locale
                              )}
                              underline
                            >
                              {t('address:addAddressTitle')}
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
                      <Title className="mb-0" level={4}>
                        <i className={`${styles.cError} fas fa-info-circle mr-2`} />
                        {t('address:deleteAddress')}
                      </Title>
                    </Col>
                  }
                  footer={
                    <Col span={24}>
                      <Space>
                        <Button type="text" onClick={deleteAddressVisible.hide}>
                          {t('common:cancel')}
                        </Button>
                        <Button type="primary" onClick={onConfirmDeleteAddressClick}>
                          {t('address:deleteAddress')}
                        </Button>
                      </Space>
                    </Col>
                  }
                >
                  <Space size={4} direction="vertical">
                    <Space className={styles.contentLayout} size={4} direction="vertical">
                      <Text>
                        {t('address:confirmDeleteAddress')} {deleteAddressData?.name}
                      </Text>
                      <Text>
                        {compact([
                          deleteAddressData?.address,
                          deleteAddressData?.district,
                          deleteAddressData?.province,
                          deleteAddressData?.postcode
                        ]).join(' ')}
                      </Text>
                    </Space>
                    <Text>{deleteAddressData?.mobile}</Text>
                    <Text type="danger">{t('address:warningMsgDeleteAddress')}</Text>
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

Address.defaultProps = {
  isSeller: false,
  addresses: []
}

export default Address
