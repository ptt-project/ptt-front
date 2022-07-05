import React, { useState, useEffect, FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { Button, Menu, MenuProps } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import t from '~/locales'

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
  const router: NextRouter = useRouter()
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentSelected, setCurrentSelected] = useState<string[]>([])

  // ===========================
  // ========== Buyer ==========
  // ===========================
  const tBuyer: any = t('settingSidebar.buyer')
  const buyerItems: MenuProps['items'] = [
    getItem(tBuyer.account.title, 'account', <i className="fas fa-user" />, [
      getItem(tBuyer.account.info, 'info'),
      getItem(tBuyer.account.address, 'address'),
      getItem(tBuyer.account.password, 'password'),
      getItem(tBuyer.account.relation, 'relation')
    ]),
    getItem(tBuyer.wallet.title, 'wallet', <i className="fas fa-wallet" />, [
      getItem(tBuyer.wallet.eWallet, 'e-wallet'),
      getItem(tBuyer.wallet.bank, 'bank'),
      getItem(tBuyer.wallet.point, 'point')
    ]),
    getItem(tBuyer.coupon.title, 'coupon', <i className="fas fa-ticket-alt" />),
    getItem(tBuyer.history.title, 'history', <i className="fas fa-shopping-cart" />),
    getItem(tBuyer.notification.title, 'notification', <i className="fas fa-bell" />)
  ]

  // ============================
  // ========== Seller ==========
  // ============================
  const tSeller: any = t('settingSidebar.seller')
  const sellerItems: MenuProps['items'] = [
    getItem(tSeller.delivery.title, 'delivery', <i className="fas fa-truck" />),
    getItem(tSeller.order.title, 'order', <i className="fas fa-file-invoice-dollar" />),
    getItem(tSeller.product.title, 'product', <i className="fas fa-box" />),
    getItem(tSeller.marketing.title, 'marketing', <i className="fas fa-tag" />),
    getItem(tSeller.payment.title, 'payment', <i className="fas fa-wallet" />),
    getItem(tSeller.report.title, 'report', <i className="fas fa-chart-line" />),
    getItem(tSeller.shop.title, 'shop', <i className="fas fa-store" />, [
      getItem(tSeller.shop.point, 'point'),
      getItem(tSeller.shop.detail, 'detail'),
      getItem(tSeller.shop.category, 'category'),
      getItem(tSeller.shop.recommended, 'recommended')
    ]),
    getItem(tSeller.management.title, 'management', <i className="fas fa-cog" />, [
      getItem(tSeller.management.address, 'address'),
      getItem(tSeller.management.account, 'account')
    ]),
    getItem(tSeller.service.title, 'service', <i className="fas fa-comment-dots" />)
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
    if (window.innerWidth >= 992) {
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
    if (e.keyPath && e.keyPath.length > 1) {
      pathname += props.sidebarType === 'seller' ? '/seller/settings' : '/settings'
      e.keyPath.reverse().forEach((key: string) => {
        pathname += `/${key}`
      })
    }
    if (pathname) {
      router.push(pathname, pathname, { locale: router.locale })
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
          type="primary"
          icon={<i className="fas fa-chevron-right" />}
          size="large"
          onClick={(): void => setIsOpen(true)}
        />
      </div>
      <div className="ss-bar" onClick={onClose} aria-hidden="true">
        <div className="ss-close">
          <Button
            type="primary"
            icon={<i className="fas fa-times" />}
            size="large"
            onClick={(): void => setIsOpen(false)}
          />
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
  )
}

export default SettingSidebar
