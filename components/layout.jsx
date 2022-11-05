import { Fragment, useEffect, useLayoutEffect } from 'react'
import { connect } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/router'
import ALink from '~/components/features/custom-link'
import Header from '~/components/main/Header'
import Footer from '~/components/main/Footer'
import MobileMainMenu from '~/components/main/Header/components/MobileMainMenu'
import Quickview from '~/components/features/product/common/quickview-modal'
import VideoModal from '~/components/features/modals/video-modal'
import { modalActions } from '~/store/modal'
import {
  showScrollTopHandler,
  scrollTopHandler,
  stickyHeaderHandler,
  stickyFooterHandler,
  resizeHandler
} from '~/utils'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-image-lightbox/style.css'
import 'react-input-range/lib/css/index.css'

function Layout({ children, closeQuickview }) {
  const router = useRouter()

  useLayoutEffect(() => {
    document.querySelector('body') && document.querySelector('body').classList.remove('loaded')
  }, [router.pathname])

  useEffect(() => {
    window.addEventListener('scroll', showScrollTopHandler, true)
    window.addEventListener('scroll', stickyHeaderHandler, true)
    window.addEventListener('scroll', stickyFooterHandler, true)
    window.addEventListener('resize', stickyHeaderHandler)
    window.addEventListener('resize', stickyFooterHandler)
    window.addEventListener('resize', resizeHandler)
    return () => {
      window.removeEventListener('scroll', showScrollTopHandler, true)
      window.removeEventListener('scroll', stickyHeaderHandler, true)
      window.removeEventListener('scroll', stickyFooterHandler, true)
      window.removeEventListener('resize', stickyHeaderHandler)
      window.removeEventListener('resize', stickyFooterHandler)
      window.removeEventListener('resize', resizeHandler)
    }
  }, [])

  useEffect(() => {
    closeQuickview()
    let bodyClasses = [...document.querySelector('body').classList]
    for (let i = 0; i < bodyClasses.length; i++) {
      document.querySelector('body').classList.remove(bodyClasses[i])
    }
    setTimeout(() => {
      document.querySelector('body').classList.add('loaded')
    }, 50)
  }, [router.pathname])

  return (
    <Fragment>
      <div className="page-wrapper">
        {/* <Header /> */}
        {children}
        <Footer />
      </div>
      <ALink
        id="scroll-top"
        href="#"
        title="Top"
        role="button"
        className="scroll-top"
        onClick={() => scrollTopHandler(false)}
      >
        <i className="d-icon-arrow-up"></i>
      </ALink>
      {/* <MobileMainMenu /> */}
      <ToastContainer
        autoClose={3000}
        duration={300}
        newestOnTo={true}
        className="toast-container"
        position="bottom-left"
        closeButton={false}
        hideProgressBar={true}
        newestOnTop={true}
      />
      <Quickview />
      <VideoModal />
    </Fragment>
  )
}

export default connect(null, { closeQuickview: modalActions.closeQuickview })(Layout)
