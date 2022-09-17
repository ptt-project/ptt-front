import React, { FC } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import SellerEditCategory from '~/modules/SellerCategory/components/EditCategory'
import { IApiResponse, ICategory } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { ShopService } from '~/services'
import { withSellerAuth } from '../../../../../hocs/with-seller'

interface ISellerEditCategoryContext {
  params: {
    categoryId: string
  }
}

interface ISellerEditCategoryPageProps {
  category: ICategory
}

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext & ISellerEditCategoryContext) => {
    let category: ICategory
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
)

const SellerEditCategoryPage: FC<ISellerEditCategoryPageProps> = (
  props: ISellerEditCategoryPageProps
) => <SellerEditCategory category={props.category} />

export default SellerEditCategoryPage
