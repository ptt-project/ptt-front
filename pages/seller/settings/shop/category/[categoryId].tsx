import React, { FC } from 'react'
import { NextPageContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { isEmpty } from 'lodash'
import { AxiosRequestConfig } from 'axios'
import EditCategory from '~/modules/SellerCategory/components/EditCategory'
import { IApiResponse, IShopCategory } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { AuthCheckAuthenticateWithSeller } from '~/utils/main'
import { ShopService } from '~/services'

interface IEditCategoryContext {
  params: {
    categoryId: string
  }
}

interface IEditCategoryPageProps {
  category: IShopCategory
}

export async function getServerSideProps(
  context: NextPageContext & IEditCategoryContext
): Promise<any> {
  const authenticate: boolean = AuthCheckAuthenticateWithSeller(context)
  if (!isEmpty(authenticate)) {
    return authenticate
  }

  let category: IShopCategory
  const { req, params } = context

  if (req) {
    try {
      const option: AxiosRequestConfig = { headers: { Cookie: req.headers.cookie } }
      const { data }: IApiResponse = await ShopService.getCategory(params.categoryId, option)
      category = data
    } catch (error) {
      console.log(error)

      return { notFound: true }
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

const EditCategoryPage: FC<IEditCategoryPageProps> = (props: IEditCategoryPageProps) => (
  <EditCategory category={props.category} />
)

export default EditCategoryPage
