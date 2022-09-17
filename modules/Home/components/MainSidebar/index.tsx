import React, { useState, useEffect, FC } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { Typography, Button, Menu, MenuProps } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import { LocaleNamespaceConst } from '~/constants'

const { Text, Title } = Typography

interface IMenuItem {
  href?: string
  label: string
  key: string
  icon?: React.ReactNode
  children?: MenuItem[]
  type?: 'group'
}

type MenuItem = Required<MenuProps>['items'][number]

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): IMenuItem =>
  ({
    key,
    icon,
    children,
    label,
    type
  } as IMenuItem)

const MainSidebar: FC = () => {
  const { t } = useTranslation(LocaleNamespaceConst)
  const router: NextRouter = useRouter()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentSelected, setCurrentSelected] = useState<string[]>([])

  const items: MenuProps['items'] = [
    getItem(t('home:sidebar.a'), 'a', <i className="fas fa-tshirt" />),
    getItem(t('home:sidebar.b'), 'b', <i className="fas fa-shoe-prints" />),
    getItem(t('home:sidebar.c'), 'c', <i className="fas fa-utensils" />),
    getItem(t('home:sidebar.d'), 'd', <i className="fas fa-glass-cheers" />),
    getItem(t('home:sidebar.e'), 'e', <i className="fas fa-heartbeat" />),
    getItem(t('home:sidebar.f'), 'f', <i className="fas fa-baby-carriage" />),
    getItem(t('home:sidebar.g'), 'g', <i className="fas fa-gem" />),
    getItem(t('home:sidebar.h'), 'h', <i className="fas fa-mobile-alt" />),
    getItem(t('home:sidebar.i'), 'i', <i className="fas fa-tv" />),
    getItem(t('home:sidebar.j'), 'j', <i className="fas fa-basketball-ball" />),
    getItem(t('home:sidebar.k'), 'k', <i className="fas fa-gamepad" />),
    getItem(t('home:sidebar.l'), 'l', <i className="fas fa-couch" />),
    getItem(t('home:sidebar.m'), 'm', <i className="fas fa-dog" />),
    getItem(t('home:sidebar.n'), 'n', <i className="fas fa-clock" />),
    getItem(t('home:sidebar.o'), 'o', <i className="fas fa-glasses" />),
    getItem(t('home:sidebar.p'), 'p', <i className="fas fa-shopping-bag" />),
    getItem(t('home:sidebar.q'), 'q', <i className="fas fa-ticket-alt" />),
    getItem(t('home:sidebar.r'), 'r', <i className="fas fa-pencil-alt" />),
    getItem(t('home:sidebar.s'), 's', <i className="fas fa-car" />),
    getItem(t('home:sidebar.t'), 't', <i className="fas fa-music" />)
  ]

  useEffect(() => {
    calcCollapsed()
    initCurrentSelected()
    window.addEventListener('resize', calcCollapsed)

    return (): void => {
      window.removeEventListener('resize', calcCollapsed)
    }
  }, [])

  function initCurrentSelected(): void {
    const selected: string[] = []
    items.forEach((item: IMenuItem) => {
      if (item.children && item.children.length) {
        item.children.forEach((i: IMenuItem) => {
          if (router.pathname.includes(i.key)) {
            selected.push(i.key)
          }
        })
      }
    })
    setCurrentSelected(selected)
  }

  function calcCollapsed(): void {
    if (window.innerWidth >= 1200) {
      setCollapsed(false)
    } else {
      setCollapsed(true)
    }
  }

  function getClassName(): string {
    if (collapsed) {
      if (isOpen) {
        return 'main-sidebar ms-collapsed ms-active'
      }
      return 'main-sidebar ms-collapsed'
    }
    return 'main-sidebar'
  }

  function getDefaultOpenKey(): string[] {
    const selected: string[] = []
    items.forEach((item: IMenuItem) => {
      selected.push(item.key)
    })
    return selected
  }

  function onClick(e: MenuInfo): void {
    console.log(e)
    router.push('/search')
  }

  function onClose(e: any): void {
    if (e.target.className === 'ms-bar') {
      setIsOpen(false)
    }
  }

  return (
    <div className={getClassName()}>
      <div className="ms-open">
        <Button
          icon={<i className="fas fa-chevron-right" />}
          size="large"
          onClick={(): void => setIsOpen(true)}
        />
      </div>
      <div className="ms-bar" onClick={onClose} aria-hidden="true">
        <div className="ms-close">
          <Text onClick={(): void => setIsOpen(false)}>
            <i className="d-icon-times" />
          </Text>
        </div>
        <div className="ms-frame">
          <div className="ms-frame-wrapper hps-scroll">
            <div className="ms-label">
              <Title level={5}>{t('home:sidebar.title')}</Title>
            </div>
            <Menu
              onClick={onClick}
              defaultOpenKeys={getDefaultOpenKey()}
              selectedKeys={currentSelected}
              mode="inline"
              items={items}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainSidebar
