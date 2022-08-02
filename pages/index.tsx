import React, { FC } from 'react'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Home from '~/modules/Home'

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common']))
    }
  }
}

const HomePage: FC = () => <Home />

export default HomePage
