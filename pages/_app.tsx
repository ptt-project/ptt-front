import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { appWithTranslation, useTranslation } from 'next-i18next'
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

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { t } = useTranslation(LocaleNamespaceConst)
  const store: any = useStore()

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
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="keywords" content={t('common:meta.keywords')} />
          <meta name="description" content={t('common:meta.description')} />
          <meta name="author" content="PTT" />
        </Helmet>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}

export default wrapper.withRedux(appWithTranslation(App))
