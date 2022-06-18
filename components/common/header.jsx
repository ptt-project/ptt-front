import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ALink from '~/components/features/custom-link'
import CartMenu from '~/components/common/partials/cart-menu'
import MainMenu from '~/components/common/partials/main-menu'
import SearchBox from '~/components/common/partials/search-box'
import LoginModal from '~/components/features/modals/login-modal'
import { HiddenHeader } from '~/constants'
import { headerBorderRemoveList } from '~/utils/data/menu'
import t from '~/locales'
export default function Header(props) {
  const router = useRouter()

  useEffect(() => {
    let header = document.querySelector('header')
    if (header) {
      if (
        headerBorderRemoveList.includes(router.pathname) &&
        header.classList.contains('header-border')
      )
        header.classList.remove('header-border')
      else if (!headerBorderRemoveList.includes(router.pathname))
        document.querySelector('header').classList.add('header-border')
    }
  }, [router.pathname])

  const showMobileMenu = () => {
    document.querySelector('body').classList.add('mmenu-active')
  }
    return (
        <header className="header">
            <div className="header-top">
                <div className="container">
                    <div className="header-left">
                        <i class="fas fa-store"></i>
                        <p className="ml-1 welcome-msg"> {t('header.titleSellerCentre')}</p>
                    </div>
                    <div className="header-right">
                        <div className="dropdown ml-5">
                            <ALink href="#">TH</ALink>
                            <ul className="dropdown-box">
                                <li>
                                    <ALink href="#">TH</ALink>
                                </li>
                                <li>
                                    <ALink href="#">ENG</ALink>
                                </li>
                            </ul>
                        </div>
                        <span className="divider"></span>
                        <LoginModal />
                    </div>
                </div>
            </div>
            
      <div className="header-middle sticky-header fix-top sticky-content">
        <div className="container">
          <div className="header-left">
            <ALink href="#" className="mobile-menu-toggle" onClick={showMobileMenu}>
              <i className="d-icon-bars2"></i>
            </ALink>
            <ALink href="/" className="logo">
              <img src="./images/logo.png" alt="logo" width="153" height="44" />
            </ALink>
            <SearchBox />
          </div>
          <div className="header-right">
            <ALink href="tel:#" className="icon-box icon-box-side">
              <div className="icon-box-icon mr-0 mr-lg-2">
                <i className="d-icon-phone"></i>
              </div>
              <div className="icon-box-content d-lg-show">
                <h4 className="icon-box-title">Call Us Now:</h4>
                <p>0(800) 123-456</p>
              </div>
            </ALink>
            <span className="divider"></span>
            <ALink href="/pages/wishlist" className="wishlist">
              <i className="d-icon-heart"></i>
            </ALink>
            <span className="divider"></span>
            {/* <CartMenu /> */}
          </div>
        </div>
      </div>
      {!HiddenHeader.includes(router.pathname) ? (
        <div className="container">
          <div className="header-bottom d-lg-show w-100">
            <div className="header-left">
              <MainMenu />
            </div>
            <div className="header-right">
              <ALink href="#">Limited Time Offer</ALink>
              <a href="https://d-themes.com/buynow/riodereact" className="ml-6">
                Buy Riode!
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
