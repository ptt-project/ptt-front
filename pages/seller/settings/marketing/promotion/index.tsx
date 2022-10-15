import React, { FC } from 'react'
import { GetServerSidePropsContext } from 'next'
import { AxiosRequestConfig } from 'axios'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Promotion from '~/modules/SellerMarketing/components/Promotion'
import { LocaleNamespaceConst } from '~/constants'
import { IApiResponse, IPromotion } from '../../../../../interfaces'
import { withSellerAuth } from '../../../../../hocs/with-seller'
import { PromotionService } from '../../../../../services'

export const getServerSideProps: any = withSellerAuth(
  async (context: GetServerSidePropsContext) => {
    let promotions: IPromotion[] = []
    const { req } = context

    if (req) {
      try {
        const option: AxiosRequestConfig = { headers: { Cookie: req.headers.cookie } }
        const { data }: IApiResponse = await PromotionService.getPromotions(option)
        console.log(data)
        promotions = data
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
          'seller.marketing'
        ])),
        promotions
      }
    }
  }
)

const PromotionPage: FC = () => <Promotion />

export default PromotionPage
