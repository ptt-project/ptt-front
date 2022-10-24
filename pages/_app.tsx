import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import { appWithTranslation, SSRConfig, useTranslation } from 'next-i18next'
import { useStore, Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Helmet from 'react-helmet'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from '~/components/layout'
import Loading from '~/components/main/Loading'
import { wrapper } from '../store/index'
import { demoActions } from '~/store/demo'
import { currentDemo } from '~/server/queries'
import { LocaleNamespaceConst } from '../constants/locale.const'
import '~/public/less/style.less'
import '~/public/sass/style.scss'

interface IAppProps extends AppProps {
  pageProps: SSRConfig & {
    dehydratedState: any
  }
}

const App = ({ Component, pageProps }: IAppProps): JSX.Element => {
  const { t } = useTranslation(LocaleNamespaceConst)
  const store: any = useStore()
  const [queryClient] = useState<QueryClient>(() => new QueryClient())

  useEffect(() => {
    if (store.getState().demo.current !== currentDemo) {
      store.dispatch(demoActions.refreshStore(currentDemo))
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={store.__persistor} loading={<Loading show />}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Helmet>
              <title>{t('common:meta.title')}</title>
              <meta charSet="UTF-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
              <meta name="keywords" content={t('common:meta.keywords')} />
              <meta name="description" content={t('common:meta.description')} />
              <meta name="author" content="PTT" />
            </Helmet>
            <Layout>
              <Component {...pageProps} />
              {process.env.REACT_QUERY_DEBUG === 'true' && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </Layout>
          </Hydrate>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}

export default wrapper.withRedux(appWithTranslation<IAppProps>(App))
