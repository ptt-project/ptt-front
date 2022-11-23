import React, { FC, useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import SettingSidebar from '~/components/main/SettingSidebar'
import Loading from '~/components/main/Loading'
import OtpModal from '~/components/main/OtpModal'
import ConfirmationModal from '~/components/main/ConfirmationModal'
import Breadcrumbs from '~/components/main/Breadcrumbs'
import HighlightLabel from '~/components/main/HighlightLabel'
import styles from './AccountMobile.module.scss'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { Typography, Button, Row, Col, Space, message } from 'antd'
import { IOtp, IMemberMobile, IUpdateMemberMobilePayload, IApiResponse } from '~/interfaces'
import { CustomUrlUtil, HelperMobileFormatUtil } from '~/utils/main'
import { LocaleNamespaceConst } from '~/constants'
import { OtpTypeEnum } from '~/enums'
import { MemberService } from '~/services'
import { AxiosError } from 'axios'

const { Text } = Typography

interface IAccountMobileProps {
  isSeller?: boolean
  mobiles: IMemberMobile[]
}

enum SelectedType {
  MAIN = 'main',
  REMOVE = 'remove'
}

const AccountMobile: FC<IAccountMobileProps> = (props: IAccountMobileProps) => {
  const router: NextRouter = useRouter()
  const rootMenu: string = props.isSeller ? '/seller' : ''
  const prefixMenu: string = props.isSeller ? 'management/account' : 'account/info'
  const { t } = useTranslation([...LocaleNamespaceConst, 'account-info', 'setting-sidebar'])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpenOtp, setIsOpenOtp] = useState<boolean>(false)
  const [isOpenRemove, setIsOpenRemove] = useState<boolean>(false)
  const [mobiles, setMobiles] = useState<IMemberMobile[]>(props.mobiles)
  const [selected, setSelected] = useState<{ mobileNo: string; type: SelectedType } | null>(null)

  function toggleOtp(): void {
    setIsOpenOtp(!isOpenOtp)
  }

  function toggleRemove(): void {
    setIsOpenRemove(!isOpenRemove)
  }

  function onSelected(mobileNo: string, type: SelectedType): void {
    setSelected({
      mobileNo,
      type
    })
  }

  function getOtpMobileNo(): string {
    const mobile: IMemberMobile | undefined = props.mobiles.find(
      (item: IMemberMobile) => item.isPrimary === true
    )

    if (selected?.type === SelectedType.MAIN) {
      return selected?.mobileNo
    }

    if (selected?.type === SelectedType.REMOVE) {
      return mobile?.mobile
    }

    return ''
  }

  async function fetchData(): Promise<void> {
    try {
      const res: IApiResponse = await MemberService.getMobiles()

      if (res.data) {
        setMobiles(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function handlerSubmitOtp(otp: IOtp): void {
    if (selected?.type === SelectedType.MAIN) {
      onSubmitMain(otp)
    }

    if (selected?.type === SelectedType.REMOVE) {
      onSubmitRemove(otp)
    }
  }

  async function onSubmitMain(otp: IOtp): Promise<void> {
    try {
      setIsLoading(true)

      const payload: IUpdateMemberMobilePayload = {
        mobile: selected?.mobileNo,
        otpCode: otp.otpCode,
        refCode: otp.refCode
      }

      await MemberService.setMainMobile(payload)

      message.success(t('common:apiMessage.success'))
    } catch (e) {
      if (e instanceof AxiosError && e.response && e.response.data && e.response.data.code) {
        switch (e.response.data.code) {
          default:
            message.error(t('common:apiMessage.error'))
            break
        }
      }
    } finally {
      toggleOtp()
      setIsLoading(false)
    }
  }

  async function onSubmitRemove(otp: IOtp): Promise<void> {
    try {
      setIsLoading(true)

      const payload: IUpdateMemberMobilePayload = {
        mobile: selected.mobileNo,
        otpCode: otp.otpCode,
        refCode: otp.refCode
      }

      await MemberService.deleteMobile(payload)
      await fetchData()

      message.success(t('common:apiMessage.success'))
    } catch (e) {
      if (e instanceof AxiosError && e.response && e.response.data && e.response.data.code) {
        switch (e.response.data.code) {
          default:
            message.error(t('common:apiMessage.error'))
            break
        }
      }
    } finally {
      toggleOtp()
      setIsLoading(false)
    }
  }

  function renderMobiles(): JSX.Element {
    const mainIdex: number = mobiles.findIndex((item: IMemberMobile) => item.isPrimary === true)

    let primaryItem: JSX.Element = null

    if (mainIdex >= 0) {
      primaryItem = (
        <Row className={styles.highlight}>
          <Col span={20} offset={2}>
            <Space size="middle">
              <Text className={styles.colorPrimaryDark}>
                {HelperMobileFormatUtil(mobiles[mainIdex].mobile)}
              </Text>
              <Button>
                <i className="fas fa-star mr-2" />
                {t('account-info:button.mainNumber')}
              </Button>
            </Space>
          </Col>
        </Row>
      )
    }

    const items: JSX.Element[] = []

    mobiles.forEach((item: IMemberMobile) => {
      if (item.isPrimary) {
        return null
      }

      items.push(
        <Col span={20} offset={2}>
          <div className={styles.mobileRow}>
            <div className={styles.mobileNo}>
              <Text className={styles.colorPrimaryDark}>{HelperMobileFormatUtil(item.mobile)}</Text>
            </div>
            <Space size="middle">
              <a onClick={(): void => onSelected(item.mobile, SelectedType.MAIN)}>
                <i className="fas fa-star" />
              </a>
              <a onClick={(): void => onSelected(item.mobile, SelectedType.REMOVE)}>
                <i className="fas fa-trash-alt" />
              </a>
            </Space>
          </div>
        </Col>
      )
    })

    return (
      <>
        {primaryItem}
        <Row gutter={[16, 16]}>{items}</Row>
      </>
    )
  }

  useEffect(() => {
    if (selected?.mobileNo) {
      if (selected?.type === SelectedType.MAIN) {
        toggleOtp()
      }

      if (selected?.type === SelectedType.REMOVE) {
        toggleRemove()
      }
    }
  }, [selected])

  return (
    <>
      <Loading show={isLoading} />
      <OtpModal
        title={`${t('account-info:mobile.titleOtp')} ${HelperMobileFormatUtil(getOtpMobileNo())}`}
        mobile={getOtpMobileNo()}
        action={OtpTypeEnum.REGISTER}
        isOpen={isOpenOtp}
        toggle={toggleOtp}
        onSubmit={handlerSubmitOtp}
      />
      <ConfirmationModal
        isOpen={isOpenRemove}
        toggle={toggleRemove}
        type="error"
        title={t('account-info:mobile.deletePhone')}
        content={`${t('account-info:mobile.confirmDelete')} ${
          selected ? HelperMobileFormatUtil(selected.mobileNo) : ''
        }`}
        contentWarning={t('account-info:mobile.msgConfirmDelete')}
        onSubmit={(): void => {
          toggleRemove()
          toggleOtp()
        }}
      />
      <main className="main">
        <Helmet>
          <title>
            {t('common:meta.title')} | {t('account-info:mobile.titleEdit')}
          </title>
        </Helmet>
        <Breadcrumbs
          items={
            props.isSeller
              ? [
                  { title: t('setting-sidebar:seller.management.title') },
                  {
                    title: t('setting-sidebar:seller.management.account'),
                    href: `${rootMenu}/settings/${prefixMenu}`
                  },
                  { title: t('account-info:mobile.titleEdit') }
                ]
              : [
                  { title: t('account-info:setting') },
                  { title: t('account-info:title') },
                  {
                    title: t('account-info:personalInfo'),
                    href: `${rootMenu}/settings/${prefixMenu}`
                  },
                  { title: t('account-info:mobile.titleEdit') }
                ]
          }
        />
        <div className="page-content mb-9">
          <div className="container">
            <Row gutter={48}>
              <Col xl={6}>
                <SettingSidebar sidebarType={props.isSeller ? 'seller' : 'buyer'} />
              </Col>
              <Col xs={24} xl={18} lg={24}>
                <Text>
                  <h4 className={`text-center mb-5 ${styles.textSecondary}`}>
                    {t('account-info:mobile.titleEdit')}
                  </h4>
                </Text>
                <Row>
                  <Col md={12}>
                    <HighlightLabel title={t('account-info:mobile.mobileList')} />
                  </Col>
                  <Col md={12} xs={18} className="text-right">
                    <Button
                      className="hps-btn-secondary mt-3"
                      href={CustomUrlUtil(
                        `${rootMenu}/settings/${prefixMenu}/add-mobile`,
                        router.locale
                      )}
                    >
                      <i className="fas fa-plus mr-2" />
                      {t('account-info:button.addPhone')}
                    </Button>
                  </Col>
                </Row>
                {renderMobiles()}
              </Col>
            </Row>
          </div>
        </div>
      </main>
    </>
  )
}

export default AccountMobile
