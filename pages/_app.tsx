import Helmet from 'react-helmet'
import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { appWithTranslation, SSRConfig, useTranslation } from 'next-i18next'
import { useStore, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from '~/components/layout'
import Loading from '~/components/main/Loading'
import { wrapper } from '../store/index'
import { demoActions } from '~/store/demo'
import { currentDemo } from '~/server/queries'
import { LocaleNamespaceConst } from '../constants/locale.const'
import '~/public/less/style.less'
import '~/public/sass/style.scss'
import WrapPersistQueryClientProvider from './wrap-persist-query-client-provider'

interface IAppProps extends AppProps {
  pageProps: SSRConfig & {
    dehydratedState: any
  }
}

const App = ({ Component, pageProps }: IAppProps): JSX.Element => {
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
        <WrapPersistQueryClientProvider>
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

            {process.env.NEXT_PUBLIC_REACT_QUERY_DEBUG === 'true' && (
              <ReactQueryDevtools initialIsOpen={false} />
            )}
          </Layout>
        </WrapPersistQueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default wrapper.withRedux(appWithTranslation<IAppProps>(App))
