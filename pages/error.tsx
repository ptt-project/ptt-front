import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { FC } from 'react'
import { LocaleNamespaceConst } from '~/constants'

export async function getStaticProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [...LocaleNamespaceConst]))
    }
  }
}

const ErrorPage: FC = () => (
  <main className="main">
    <div className="page-content">
      <section className="error-section d-flex flex-column justify-content-center align-items-center text-center pl-3 pr-3">
        <h1 className="mb-2 ls-m">Error 500</h1>
      </section>
    </div>
  </main>
)

export default ErrorPage
