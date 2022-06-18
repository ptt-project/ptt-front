import React, { FC } from 'react'
import t from '~/locales'
import Helmet from 'react-helmet'
import ALink from '~/components/features/custom-link'

const Register: FC = (props: any) => {
  return (
    <main className="main account">
      <Helmet>
        <title>
          {t('meta.title')} | {t('auth.register.title')}
        </title>
      </Helmet>
      <nav className="breadcrumb-nav">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <ALink {...props} href="/">
                <i className="d-icon-home"></i>
              </ALink>
            </li>
            <li>{t('auth.register.title')}</li>
          </ul>
        </div>
      </nav>
      <div className="page-content mt-4 mb-10 pb-6">
        <div className="container">
          <h2 className="title title-center mb-10">{t('auth.register.title')}</h2>
        </div>
      </div>
    </main>
  )
}

export default Register
