import React, { useState, useEffect, FC } from 'react'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { Typography, Button, Menu, MenuProps } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import { LocaleNamespaceConst } from '~/constants'

const { Text } = Typography

interface ISettingSidebarProps {
  sidebarType: string
}

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

const SettingSidebar: FC<ISettingSidebarProps> = (props: ISettingSidebarProps) => {
  const { t } = useTranslation(LocaleNamespaceConst)
  const router: NextRouter = useRouter()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentSelected, setCurrentSelected] = useState<string[]>([])

  // ===========================
  // ========== Buyer ==========
  // ===========================
  const buyerItems: MenuProps['items'] = [
    getItem(t('setting-sidebar:buyer.account.title'), 'account', <i className="fas fa-user" />, [
      getItem(t('setting-sidebar:buyer.account.info'), 'account:info'),
      getItem(t('setting-sidebar:buyer.account.address'), 'account:address'),
      getItem(t('setting-sidebar:buyer.account.password'), 'account:password'),
      getItem(t('setting-sidebar:buyer.account.relation'), 'account:relation')
    ]),
    getItem(t('setting-sidebar:buyer.wallet.title'), 'finance', <i className="fas fa-wallet" />, [
      getItem(t('setting-sidebar:buyer.wallet.eWallet'), 'finance:e-wallet'),
      getItem(t('setting-sidebar:buyer.wallet.bank'), 'finance:bank'),
      getItem(t('setting-sidebar:buyer.wallet.point'), 'finance:happy-point')
    ]),
    getItem(t('setting-sidebar:buyer.coupon.title'), 'coupon', <i className="fas fa-ticket-alt" />),
    getItem(
      t('setting-sidebar:buyer.history.title'),
      'history',
      <i className="fas fa-shopping-cart" />
    ),
    getItem(
      t('setting-sidebar:buyer.notification.title'),
      'notification',
      <i className="fas fa-bell" />
    )
  ]

  // ============================
  // ========== Seller ==========
  // ============================
  const sellerItems: MenuProps['items'] = [
    getItem(t('setting-sidebar:seller.delivery.title'), 'delivery', <i className="fas fa-truck" />),
    getItem(
      t('setting-sidebar:seller.order.title'),
      'order',
      <i className="fas fa-file-invoice-dollar" />
    ),
    getItem(t('setting-sidebar:seller.product.title'), 'product', <i className="fas fa-box" />, [
      getItem(t('setting-sidebar:seller.product.list'), 'product:index'),
      getItem(t('setting-sidebar:seller.product.add'), 'product:add')
    ]),
    getItem(t('setting-sidebar:seller.marketing.title'), 'marketing', <i className="fas fa-tag" />),
    getItem(t('setting-sidebar:seller.payment.title'), 'payment', <i className="fas fa-wallet" />),
    getItem(
      t('setting-sidebar:seller.report.title'),
      'report',
      <i className="fas fa-chart-line" />
    ),
    getItem(t('setting-sidebar:seller.shop.title'), 'shop', <i className="fas fa-store" />, [
      getItem(t('setting-sidebar:seller.shop.point'), 'shop:point'),
      getItem(t('setting-sidebar:seller.shop.detail'), 'shop:detail'),
      getItem(t('setting-sidebar:seller.shop.category'), 'shop:category'),
      getItem(t('setting-sidebar:seller.shop.recommended'), 'shop:recommended')
    ]),
    getItem(
      t('setting-sidebar:seller.management.title'),
      'management',
      <i className="fas fa-cog" />,
      [
        getItem(t('setting-sidebar:seller.management.address'), 'management:address'),
        getItem(t('setting-sidebar:seller.management.account'), 'management:account')
      ]
    ),
    getItem(
      t('setting-sidebar:seller.service.title'),
      'service',
      <i className="fas fa-comment-dots" />
    )
  ]
  const items: MenuProps['items'] = props.sidebarType === 'seller' ? sellerItems : buyerItems

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
    const prefixPath: string = props.sidebarType === 'seller' ? '/seller/settings' : '/settings'
    items.forEach((item: IMenuItem) => {
      if (item.children?.length) {
        item.children.forEach((i: IMenuItem) => {
          const key: string = i.key.replace(/:/g, '/').replace('index', '')
          if (
            router.pathname.replace(prefixPath, '').includes(`/${key}`) ||
            router.pathname.replace(prefixPath, '') === `/${key}`
          ) {
            selected.push(i.key)
          }
        })
      } else {
        const key: string = item.key.replace(/:/g, '/').replace('index', '')
        if (router.pathname.replace(prefixPath, '') === `/${key}`) {
          selected.push(item.key)
        }
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
        return 'setting-sidebar ss-collapsed ss-active'
      }
      return 'setting-sidebar ss-collapsed'
    }
    return 'setting-sidebar'
  }

  function getDefaultOpenKey(): string[] {
    const selected: string[] = []
    items.forEach((item: IMenuItem) => {
      selected.push(item.key)
    })
    return selected
  }

  function onClick(e: MenuInfo): void {
    let pathname: string = ''
    if (e.keyPath?.length) {
      pathname += props.sidebarType === 'seller' ? '/seller/settings' : '/settings'
      e.keyPath.reverse().forEach((key: string, i: number) => {
        let currentKey: string = key
        if (i === e.keyPath.length - 1) {
          const tempKey: string[] = key.split(':')
          if (tempKey.length > 1) {
            tempKey.shift()
            currentKey = tempKey[0]
          }
        }
        if (currentKey !== 'index') {
          pathname += `/${currentKey}`
        }
      })
    }
    if (pathname) {
      router.push(pathname)
    }
  }

  function onClose(e: any): void {
    if (e.target.className === 'ss-bar') {
      setIsOpen(false)
    }
  }

  return (
    <div className={getClassName()}>
      <div className="ss-open">
        <Button
          icon={<i className="fas fa-chevron-right" />}
          size="large"
          onClick={(): void => setIsOpen(true)}
        />
      </div>
      <div className="ss-bar" onClick={onClose} aria-hidden="true">
        <div className="ss-close">
          <Text onClick={(): void => setIsOpen(false)}>
            <i className="d-icon-times" />
          </Text>
        </div>
        <Menu
          className="hps-scroll"
          onClick={onClick}
          defaultOpenKeys={getDefaultOpenKey()}
          selectedKeys={currentSelected}
          mode="inline"
          items={items}
        />
      </div>
    </div>
  )
}

export default SettingSidebar
