import React, { FC } from 'react'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import { isEmpty } from 'lodash'
import SellerCategory from '~/modules/SellerCategory'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse } from '~/interfaces'
import { ShopService } from '~/services'
import { IShopCategory } from '~/interfaces/shop.interface'
import { AuthCheckAuthenticate } from '~/utils/main'

interface ICategoryPageProps {
  category?: IShopCategory[]
}

export async function getServerSideProps(context: NextPageContext): Promise<any> {
  const authenticate: boolean = AuthCheckAuthenticate(context)
  if (!isEmpty(authenticate)) {
    return authenticate
  }

  let category: IShopCategory[] = []
  const { req } = context

  if (req) {
    try {
      const option: AxiosRequestConfig = { headers: { Cookie: req.headers.cookie } }
      const { data }: IApiResponse = await ShopService.getCategory(option)
      category = data
    } catch (error) {
      console.log(error)

      return {
        redirect: {
          destination: '/error',
          permanent: true
        }
      }
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        ...LocaleNamespaceConst,
        'seller.category'
      ])),
      category
    }
  }
}

const SellerCategoryPage: FC<ICategoryPageProps> = (props: ICategoryPageProps) => (
  <SellerCategory category={props.category} />
)

SellerCategoryPage.defaultProps = {
  category: []
}

export default SellerCategoryPage
