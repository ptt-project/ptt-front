import React, { useEffect, FC } from 'react'
import numeral from 'numeral'
import MainMenu from './components/MainMenu'
import styles from './Header.module.scss'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { Typography, Input, Space, Badge, Avatar } from 'antd'
import { HiddenHeaderConst, LocaleNamespaceConst } from '~/constants'
import { headerBorderRemoveList } from '~/utils/data/menu'
import { AuthGetUserInfoUtil, CustomUrlUtil } from '~/utils/main'
import { IAuthUserInfo } from '~/interfaces'

const { Text, Link, Title } = Typography

const Header: FC = () => {
  const { t } = useTranslation(LocaleNamespaceConst)
  const router: NextRouter = useRouter()
  const userInfo: IAuthUserInfo | undefined = AuthGetUserInfoUtil()

  useEffect(() => {
    const header: HTMLHeadElement = document.querySelector('header')
    if (header) {
      if (
        headerBorderRemoveList.includes(router.pathname) &&
        header.classList.contains('header-border')
      ) {
        header.classList.remove('header-border')
      } else if (!headerBorderRemoveList.includes(router.pathname)) {
        document.querySelector('header').classList.add('header-border')
      }
    }
  }, [router.pathname])

  function showMobileMenu(): void {
    document.querySelector('body').classList.add('mmenu-active')
  }

  function onSearch(value: string): void {
    router.push(`/search?keyword=${value}`)
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-right">
            <Link
              href={CustomUrlUtil('/auth/register-seller', router.locale)}
              target="_blank"
              className={styles.topLink}
            >
              <i className="fas fa-store mr-1" />
              {t('header:top.shop')}
            </Link>
            <div className="divider" />
            <div className="dropdown">
              <a className={styles.topLink}>
                {router.locale === 'en' ? t('header:top.lang.en') : t('header:top.lang.th')}
              </a>
              <ul className="dropdown-box">
                <li>
                  <Link href={CustomUrlUtil(router.pathname, 'th')} className={styles.topLink}>
                    {t('header:top.lang.th')}
                  </Link>
                </li>
                <li>
                  <Link href={CustomUrlUtil(router.pathname, 'en')} className={styles.topLink}>
                    {t('header:top.lang.en')}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="divider" />
            {userInfo ? (
              <Link
                href={CustomUrlUtil('/settings/account/info', router.locale)}
                className={styles.name}
              >
                <Avatar className={styles.avatar} icon={<i className="fas fa-user" />} size={24}>
                  {userInfo.firstName}
                </Avatar>
                <Text type="secondary" className="mr-1">
                  {t('header:top.welcome')}
                </Text>
                {userInfo.firstName}
              </Link>
            ) : (
              <>
                <Link href={CustomUrlUtil('/auth/login', router.locale)} className={styles.topLink}>
                  {t('header:top.signIn')}
                </Link>
                <span className={styles.slash}>/</span>
                <Link
                  href={CustomUrlUtil('/auth/register', router.locale)}
                  className={styles.topLink}
                >
                  {t('header:top.signUp')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="header-middle sticky-header fix-top sticky-content">
        <div className="container">
          <div className="header-left">
            <Link className={`${styles.toggleBar} mobile-menu-toggle`} onClick={showMobileMenu}>
              <i className="fas fa-bars" />
            </Link>
            <Link href={CustomUrlUtil('/', router.locale)} className="logo">
              <img src="./images/main/logo.png" alt="logo" width="100" />
            </Link>
            <Input.Search
              className={styles.search}
              placeholder={t('header:middle.search')}
              allowClear
              enterButton={<i className="d-icon-search" />}
              size="large"
              onSearch={onSearch}
            />
          </div>
          <div className="header-right">
            <Space size="middle">
              <Link href="tel:#" className={`${styles.headLink} icon-box icon-box-side`}>
                <div className="icon-box-icon">
                  <i className="fas fa-phone-alt" />
                </div>
                <div className="icon-box-content d-lg-show">
                  <Text className="hps-text-small">{t('header:middle.tel.title')}</Text>
                  <Title className={styles.headText} level={5}>
                    {t('header:middle.tel.no')}
                  </Title>
                </div>
              </Link>
              <Link href="/cart" className={`${styles.headLink} icon-box icon-box-side`}>
                <div className="icon-box-content d-lg-show">
                  <Text className="hps-text-small">{t('header:middle.cart.title')} (0):</Text>
                  <Title className={styles.headText} level={5}>
                    ฿{numeral(0).format('0,0.00')}
                  </Title>
                </div>
                <Badge className={styles.badge} count={0} showZero>
                  <div className="icon-box-icon mr-0">
                    <i className="fas fa-shopping-cart" />
                  </div>
                </Badge>
              </Link>
            </Space>
          </div>
        </div>
      </div>

      {!HiddenHeaderConst.includes(router.pathname) ? (
        <div className="container">
          <div className="header-bottom d-lg-show w-100">
            <div className="header-left">
              <MainMenu />
            </div>
            <div className="header-right" />
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Header
