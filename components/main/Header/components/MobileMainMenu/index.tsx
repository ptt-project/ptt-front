import React, { useEffect, FC } from 'react'
import ALink from '~/components/features/custom-link'
import Card from '~/components/features/accordion/card'
import styles from './MobileMainMenu.module.scss'
import { useTranslation } from 'next-i18next'
import { Input } from 'antd'
import { mainMenu } from '~/utils/data/menu'
import { LocaleNamespaceConst } from '~/constants'

interface IMobileMainMenuItem {
  title: string
  url: string
  hot?: boolean
  new?: boolean
  subPages?: {
    title: string
    url: string
  }[]
}

const MobileMainMenu: FC = () => {
  const { t } = useTranslation(LocaleNamespaceConst)

  useEffect(() => {
    window.addEventListener('resize', hideMobileMenuHandler)
    document.querySelector('body').addEventListener('click', onBodyClick)

    return () => {
      window.removeEventListener('resize', hideMobileMenuHandler)
      document.querySelector('body').removeEventListener('click', onBodyClick)
    }
  }, [])

  function hideMobileMenuHandler(): void {
    if (window.innerWidth > 991) {
      document.querySelector('body').classList.remove('mmenu-active')
    }
  }

  function hideMobileMenu(): void {
    document.querySelector('body').classList.remove('mmenu-active')
  }

  function onBodyClick(e: any): void {
    if (e.target.closest('.header-search')) {
      e.target.closest('.header-search').classList.contains('show-results')
      e.target.closest('.header-search').classList.add('show-results')
    }
    if (document.querySelector('.header-search.show')) {
      document.querySelector('.header-search.show').classList.remove('show')
    }
    if (document.querySelector('.header-search.show-results')) {
      document.querySelector('.header-search.show-results').classList.remove('show-results')
    }
  }

  function onSearch(value: string): void {
    console.log(value)
  }

  return (
    <div className="mobile-menu-wrapper">
      <div className="mobile-menu-overlay" onClick={hideMobileMenu} aria-hidden="true" />

      <ALink className="mobile-menu-close" href="#" onClick={hideMobileMenu}>
        <i className="d-icon-times" />
      </ALink>

      <div className="mobile-menu-container scrollable">
        <Input.Search
          className={styles.search}
          placeholder={t('header:bottom.search')}
          allowClear
          enterButton={<i className="d-icon-search" />}
          size="large"
          onSearch={onSearch}
        />

        <ul className="mobile-menu mmenu-anim">
          <li className="mobile-list">
            <ALink href="/">{t('header:bottom.a.title')}</ALink>
          </li>

          <li className="mobile-list">
            <Card title={t('header:bottom.b.title')} type="mobile" url="/shop">
              <ul>
                <li>
                  <Card title="Variations 1" type="mobile">
                    <ul className="mobile-submenu">
                      {mainMenu.shop.variation1.map((item: IMobileMainMenuItem) => (
                        <li key={`shop-${item.title}`}>
                          <ALink href={`/${item.url}`}>
                            {item.title}
                            {item.hot ? <span className="tip tip-hot">Hot</span> : ''}
                          </ALink>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </li>
                <li>
                  <Card title="Variations 2" type="mobile">
                    <ul className="mobile-submenu">
                      {mainMenu.shop.variation2.map((item: IMobileMainMenuItem) => (
                        <li key={`shop-${item.title}`}>
                          <ALink href={`/${item.url}`}>
                            {item.title}
                            {item.new ? <span className="tip tip-new">New</span> : ''}
                          </ALink>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </li>
              </ul>
            </Card>
          </li>

          <li className="mobile-list">
            <Card
              title={t('header:bottom.c.title')}
              type="mobile"
              url="/product/default/beyond-riode-original-t-shirt"
            >
              <ul>
                <li>
                  <Card title="Product Pages" type="mobile">
                    <ul className="mobile-submenu">
                      {mainMenu.product.pages.map((item: IMobileMainMenuItem) => (
                        <li key={`product-${item.title}`}>
                          <ALink href={`/${item.url}`}>
                            {item.title}
                            {item.hot ? <span className="tip tip-hot">Hot</span> : ''}
                          </ALink>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </li>
                <li>
                  <Card title="Product Layouts" type="mobile">
                    <ul className="mobile-submenu">
                      {mainMenu.product.layout.map((item: IMobileMainMenuItem) => (
                        <li key={`product-${item.title}`}>
                          <ALink href={`/${item.url}`}>
                            {item.title}
                            {item.new ? <span className="tip tip-new">New</span> : ''}
                          </ALink>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </li>
              </ul>
            </Card>
          </li>

          <li className="mobile-list">
            <Card title={t('header:bottom.d.title')} type="mobile" url="/pages/about-us">
              <ul>
                {mainMenu.other.map((item: IMobileMainMenuItem) => (
                  <li key={`other-${item.title}`}>
                    <ALink href={`/${item.url}`}>
                      {item.title}
                      {item.new ? <span className="tip tip-new">New</span> : ''}
                    </ALink>
                  </li>
                ))}
              </ul>
            </Card>
          </li>

          <li className="mobile-list">
            <Card title={t('header:bottom.e.title')} type="mobile" url="/blog/classic">
              <ul>
                {mainMenu.blog.map((item: IMobileMainMenuItem) =>
                  item.subPages ? (
                    <li key={`blog${item.title}`}>
                      <Card title={item.title} url={`${item.url}`} type="mobile">
                        <ul className="mobile-submenu">
                          {item.subPages.map((subItem: IMobileMainMenuItem) => (
                            <li key={`blog-${subItem.title}`}>
                              <ALink href={`/${subItem.url}`}>{subItem.title}</ALink>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </li>
                  ) : (
                    <li key={`blog${item.title}`} className={item.subPages ? 'submenu' : ''}>
                      <ALink href={`/${item.url}`}>{item.title}</ALink>
                    </li>
                  )
                )}
              </ul>
            </Card>
          </li>

          <li className="mobile-list">
            <Card title={t('header:bottom.f.title')} type="mobile" url="/elements">
              <ul>
                {mainMenu.element.map((item: IMobileMainMenuItem) => (
                  <li key={`elements-${item.title}`}>
                    <ALink href={`/${item.url}`}>{item.title}</ALink>
                  </li>
                ))}
              </ul>
            </Card>
          </li>

          <li className="mobile-list">
            <a href="/setting">{t('header:bottom.g.title')}</a>
          </li>

          <li className={`mobile-list ${styles.btNone}`}>
            <a href="https://d-themes.com/buynow/riodereact">{t('header:bottom.h.title')}</a>
          </li>
        </ul>

        {/* <ul className="mobile-menu mmenu-anim">
          <li>
            <ALink href="/pages/account">Login</ALink>
          </li>
          <li>
            <ALink href="/pages/cart">My Cart</ALink>
          </li>
          <li>
            <ALink href="/pages/wishlist">Wishlist</ALink>
          </li>
        </ul> */}
      </div>
    </div>
  )
}

export default React.memo(MobileMainMenu)
