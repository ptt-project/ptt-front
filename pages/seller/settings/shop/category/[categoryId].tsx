import React, { FC } from 'react'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { AxiosRequestConfig } from 'axios'
import EditCategory from '~/modules/SellerCategory/components/EditCategory'
import { IApiResponse, IShopCategory } from '~/interfaces'
import { LocaleNamespaceConst } from '~/constants'
import { withSellerAuth } from '~/utils/main'
import { ShopService } from '~/services'

interface IEditCategoryContext {
  params: {
    categoryId: string
  }
}

interface IEditCategoryPageProps {
  category: IShopCategory
}

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext & IEditCategoryContext) => {
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
)

const EditCategoryPage: FC<IEditCategoryPageProps> = (props: IEditCategoryPageProps) => (
  <EditCategory category={props.category} />
)

export default EditCategoryPage
