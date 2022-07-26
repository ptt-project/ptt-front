import React, { useEffect, FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import numeral from 'numeral'
import { Typography, Input, Space, Badge } from 'antd'
import MainMenu from './components/MainMenu'
import { HiddenHeader } from '~/constants'
import { headerBorderRemoveList } from '~/utils/data/menu'
import t from '~/locales'
import styles from './Header.module.scss'

const { Text, Link, Title } = Typography

const Header: FC = () => {
  const router: NextRouter = useRouter()

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
    console.log(value)
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-right">
            <Link href="#" className={styles.topLink}>
              <i className="fas fa-store mr-1" />
              {t('components.header.top.shop')}
            </Link>
            <div className="divider" />
            <div className="dropdown">
              <Link href="#" className={styles.topLink}>
                {t('components.header.top.lang.th')}
              </Link>
              <ul className="dropdown-box">
                <li>
                  <Link href="#" className={styles.topLink}>
                    {t('components.header.top.lang.th')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className={styles.topLink}>
                    {t('components.header.top.lang.en')}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="divider" />
            <Link href="#" className={styles.topLink}>
              {t('components.header.top.signIn')}
            </Link>
            <span className={styles.slash}>/</span>
            <Link href="#" className={styles.topLink}>
              {t('components.header.top.signUp')}
            </Link>
          </div>
        </div>
      </div>

      <div className="header-middle sticky-header fix-top sticky-content">
        <div className="container">
          <div className="header-left">
            <Link className={`${styles.toggleBar} mobile-menu-toggle`} onClick={showMobileMenu}>
              <i className="fas fa-bars" />
            </Link>
            <Link href="/" className="logo">
              <img src="./images/main/logo.png" alt="logo" width="100" />
            </Link>
            <Input.Search
              className={styles.search}
              placeholder={t('components.header.middle.search')}
              allowClear
              enterButton={<i className="d-icon-search" />}
              size="large"
              onSearch={onSearch}
            />
          </div>
          <div className="header-right">
            <Space size="large">
              <Link href="tel:#" className={`${styles.headLink} icon-box icon-box-side`}>
                <div className="icon-box-icon">
                  <i className="fas fa-phone-alt" />
                </div>
                <div className="icon-box-content d-lg-show">
                  <Text className="hps-text-small">{t('components.header.middle.tel.title')}</Text>
                  <Title className={styles.headText} level={5}>
                    {t('components.header.middle.tel.no')}
                  </Title>
                </div>
              </Link>
              <Link href="/cart" className={`${styles.headLink} icon-box icon-box-side`}>
                <div className="icon-box-content d-lg-show">
                  <Text className="hps-text-small">
                    {t('components.header.middle.cart.title')} (0):
                  </Text>
                  <Title className={styles.headText} level={5}>
                    ฿{numeral(0).format('0,0.00')}
                  </Title>
                </div>
                <Badge count={0} showZero>
                  <div className="icon-box-icon ml-3 mr-0">
                    <i className="fas fa-shopping-cart" />
                  </div>
                </Badge>
              </Link>
            </Space>
          </div>
        </div>
      </div>

      {!HiddenHeader.includes(router.pathname) ? (
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
