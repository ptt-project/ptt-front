import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { EndPointUrlConst } from '~/constants'
import { ConfigService } from '~/services'
import { IAuthToken } from '../interfaces'
import { AuthGetServerSideTokenUtil } from '../utils/main'

export const withAuth =
  (gssp: GetServerSideProps) =>
  async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
    const { req, locale: rawLocale, resolvedUrl } = context
    const locale: string = rawLocale === 'th' ? '' : rawLocale

    const queryClient: QueryClient = new QueryClient()
    await queryClient.prefetchQuery([EndPointUrlConst.CONFIG.OPTIONS], async () => {
      const { data } = await ConfigService.getConfigOptions()
      return data
    })

    if (req) {
      const { accessToken, refreshToken }: IAuthToken = AuthGetServerSideTokenUtil(
        req.headers.cookie
      )

      if (!accessToken || !refreshToken) {
        return {
          redirect: {
            destination: `${locale}/auth/login?redirect=${resolvedUrl}`,
            permanent: false
          }
        }
      }
    }

    const gsspProps: GetServerSidePropsResult<any> = await gssp(context)

    return {
      ...gsspProps,
      props: {
        ...gsspProps?.['props'],
        dehydratedState: dehydrate(queryClient)
      }
    }
  }
