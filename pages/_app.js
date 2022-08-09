import React, { useEffect } from 'react'
import App from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { useTranslation } from 'next-i18next'
import { useStore, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Helmet from 'react-helmet'
import Layout from '~/components/layout'
import Loading from '~/components/main/Loading'
import { wrapper } from '../store/index'
import { demoActions } from '~/store/demo'
import { currentDemo } from '~/server/queries'
import { LocaleNamespaceConst } from '../constants/locale.const'
import '~/public/less/style.less'
import '~/public/sass/style.scss'

const HappyShoppingApp = ({ Component, pageProps }) => {
  const { t } = useTranslation(LocaleNamespaceConst)
  const store = useStore()

  useEffect(() => {
    if (store.getState().demo.current !== currentDemo) {
      store.dispatch(demoActions.refreshStore(currentDemo))
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<Loading show />}>
        <Helmet>
          <title>{t('common:meta.title')}</title>
          <meta charSet="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="keywords" content="React Template" />
          <meta name="description" content="Riode - React eCommerce Template" />
          <meta name="author" content="D-THEMES" />
        </Helmet>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}

HappyShoppingApp.getInitialProps = async (appContext) => {
  const pageProps = await App.getInitialProps(appContext)
  return { ...pageProps }
}

export default wrapper.withRedux(appWithTranslation(HappyShoppingApp))
