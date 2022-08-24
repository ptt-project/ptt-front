import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import Helmet from 'react-helmet'
import ALink from '~/components/features/custom-link'
import { LocaleNamespaceConst } from '~/constants'

export async function getStaticProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst]))
    }
  }
}

const Error404: FC = () => (
  <main className="main">
    <Helmet>
      <title>Riode React eCommerce Template | 404</title>
    </Helmet>
    <h1 className="d-none">Riode React eCommerce Template - 404</h1>
    <div className="page-content">
      <section className="error-section d-flex flex-column justify-content-center align-items-center text-center pl-3 pr-3">
        <h1 className="mb-2 ls-m">Error 404</h1>
        <img src="./images/subpages/404.png" alt="error 404" width="609" height="131" />
        <h4 className="mt-7 mb-0 ls-m text-uppercase">Ooopps! That page can’t be found.</h4>
        <p className="text-gray font-primary ls-m">
          It looks like nothing was found at this location.
        </p>
        <ALink href="/" className="btn btn-primary btn-rounded mb-4">
          Go home
        </ALink>
      </section>
    </div>
  </main>
)

export default Error404
