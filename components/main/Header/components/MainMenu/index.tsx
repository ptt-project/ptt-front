import React, { FC } from 'react'
import ALink from '~/components/features/custom-link'
import { useTranslation } from 'next-i18next'
import { NextRouter, useRouter } from 'next/router'
import { mainMenu } from '~/utils/data/menu'
import { LocaleNamespaceConst } from '~/constants'

interface IMainMenuItem {
  title: string
  url: string
  hot?: boolean
  new?: boolean
  subPages?: {
    title: string
    url: string
  }[]
}

const MainMenu: FC = () => {
  const { t } = useTranslation(LocaleNamespaceConst)
  const router: NextRouter = useRouter()
  const { pathname } = router

  return (
    <nav className="main-nav">
      <ul className="menu">
        <li id="menu-home" className={pathname === '/' ? 'active' : undefined}>
          <ALink href="/">{t('header:bottom.a.title')}</ALink>
        </li>

        <li className={pathname.includes('/shop') ? 'submenu active' : 'submenu'}>
          <ALink href="/shop">{t('header:bottom.b.title')}</ALink>
          <div className="megamenu">
            <div className="row">
              <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                <h4 className="menu-title">Variations 1</h4>
                <ul>
                  {mainMenu.shop.variation1.map((item: IMainMenuItem) => (
                    <li key={`shop-${item.title}`}>
                      <ALink href={`/${item.url}`}>
                        {item.title}
                        {item.hot ? <span className="tip tip-hot">Hot</span> : ''}
                      </ALink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                <h4 className="menu-title">Variations 2</h4>
                <ul>
                  {mainMenu.shop.variation2.map((item: IMainMenuItem) => (
                    <li key={`shop-${item.title}`}>
                      <ALink href={`/${item.url}`}>
                        {item.title}
                        {item.new ? <span className="tip tip-new">New</span> : ''}
                      </ALink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-4 menu-banner menu-banner1 banner banner-fixed">
                <figure>
                  <img
                    src="./images/menu/banner-1.jpg"
                    alt="Menu banner"
                    width="221"
                    height="330"
                  />
                </figure>
                <div className="banner-content y-50">
                  <h4 className="banner-subtitle font-weight-bold text-primary ls-m">Sale.</h4>
                  <h3 className="banner-title font-weight-bold">
                    <span className="text-uppercase">Up to</span>70% Off
                  </h3>
                  <ALink className="btn btn-link btn-underline" href="/shop">
                    shop now
                    <i className="d-icon-arrow-right" />
                  </ALink>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li
          className={
            pathname.includes('/product') && !pathname.includes('/elements')
              ? 'submenu active'
              : 'submenu'
          }
        >
          <ALink href="/product/default/beyond-riode-original-t-shirt">
            {t('header:bottom.c.title')}
          </ALink>
          <div className="megamenu">
            <div className="row">
              <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                <h4 className="menu-title">Product Pages</h4>
                <ul>
                  {mainMenu.product.pages.map((item: IMainMenuItem) => (
                    <li key={`product-${item.title}`}>
                      <ALink href={`/${item.url}`}>
                        {item.title}
                        {item.hot ? <span className="tip tip-hot">Hot</span> : ''}
                      </ALink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-4">
                <h4 className="menu-title">Product Layouts</h4>
                <ul>
                  {mainMenu.product.layout.map((item: IMainMenuItem) => (
                    <li key={`product-${item.title}`}>
                      <ALink href={`/${item.url}`}>
                        {item.title}
                        {item.new ? <span className="tip tip-new">New</span> : ''}
                      </ALink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-6 col-sm-4 col-md-3 col-lg-4 menu-banner menu-banner2 banner banner-fixed">
                <figure>
                  <img
                    src="./images/menu/banner-2.jpg"
                    alt="Menu banner"
                    width="221"
                    height="330"
                  />
                </figure>
                <div className="banner-content x-50 text-center">
                  <h3 className="banner-title text-white text-uppercase">Sunglasses</h3>
                  <h4 className="banner-subtitle font-weight-bold text-white mb-0">
                    $23.00 - $120.00
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </li>

        <li className={pathname.includes('/pages') ? 'submenu active' : 'submenu'}>
          <ALink href="/pages/about-us">{t('header:bottom.d.title')}</ALink>
          <ul>
            {mainMenu.other.map((item: IMainMenuItem) => (
              <li key={`other-${item.title}`}>
                <ALink href={`/${item.url}`}>
                  {item.title}
                  {item.new ? <span className="tip tip-new">New</span> : ''}
                </ALink>
              </li>
            ))}
          </ul>
        </li>

        <li
          className={
            pathname.includes('/blog') && !pathname.includes('/elements')
              ? 'submenu active'
              : 'submenu'
          }
        >
          <ALink href="/blog/classic">{t('header:bottom.e.title')}</ALink>
          <ul>
            {mainMenu.blog.map((item: IMainMenuItem) => (
              <li key={`blog ${item.title}`} className={item.subPages ? 'submenu' : undefined}>
                <ALink href={`/${item.url}`}>{item.title}</ALink>

                {item.subPages ? (
                  <ul>
                    {item.subPages.map((subItem: IMainMenuItem) => (
                      <li key={`blog-${subItem.title}`}>
                        <ALink href={`/${subItem.url}`}>{subItem.title}</ALink>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ''
                )}
              </li>
            ))}
          </ul>
        </li>

        <li
          className={
            pathname.includes('/elements') ? 'd-xl-show submenu active' : 'd-xl-show submenu'
          }
        >
          <ALink href="/elements">{t('header:bottom.f.title')}</ALink>
          <ul>
            {mainMenu.element.map((item: IMainMenuItem) => (
              <li key={`elements-${item.title}`}>
                <ALink href={`/${item.url}`}>{item.title}</ALink>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <ALink href="/setting">{t('header:bottom.g.title')}</ALink>
        </li>

        <li>
          <ALink href="/pages/about-us">{t('header:bottom.h.title')}</ALink>
        </li>
      </ul>
    </nav>
  )
}

export default MainMenu
