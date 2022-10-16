import React, { FC } from 'react'
import { GetServerSidePropsContext } from 'next'
import { AxiosRequestConfig } from 'axios'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Promotion from '~/modules/SellerMarketing/components/Promotion'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, IPromotionPayload } from '../../../../../interfaces'
import { PromotionService } from '../../../../../services'
import { withAuth } from '../../../../../hocs/with-user'
interface IPromotionPageProps {
  promotion: IPromotionPayload
}
export const getServerSideProps: any = withAuth(async (context: GetServerSidePropsContext) => {
  let promotion: IPromotionPayload
  const { req } = context

  if (req) {
    try {
      const option: AxiosRequestConfig = {
        headers: { Cookie: req.headers.cookie }
      }
      const { data }: IApiResponse = await PromotionService.getPromotions(option)
      promotion = data
    } catch (error) {
      console.error(error)

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
        'seller.marketing'
      ])),
      promotion
    }
  }
})

const PromotionPage: FC<IPromotionPageProps> = (props: IPromotionPageProps) => (
  <Promotion promotion={props.promotion} />
)

export default PromotionPage
