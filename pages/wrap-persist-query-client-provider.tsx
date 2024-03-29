/* eslint-disable @typescript-eslint/typedef */
import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { Persister } from '@tanstack/query-persist-client-core'
import {
  Query,
  QueryCache,
  QueryClient,
  useIsRestoring,
  useQueryClient
} from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { ConfigService, MemberService } from '~/services'
import { HelperCreateIDBPersisterUtil } from '~/utils/main'
import { EndPointUrlConst } from '~/constants'

interface IDehydrateStateProps {
  children: ReactNode
}

const WrapPersistQueryClientProvider: FC<IDehydrateStateProps> = (props: IDehydrateStateProps) => {
  const [queryClient] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            refetchOnWindowFocus: false
          }
        }
      })
  )
  const persister: Persister = useMemo(() => HelperCreateIDBPersisterUtil(), [])
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        dehydrateOptions: {
          dehydrateMutations: false,
          shouldDehydrateQuery: (query: Query): boolean => {
            const { meta, state } = query
            const { persist } = meta || {}
            const isPersist: boolean = !state.error && state.status === 'success' && !!persist
            // isPersist && console.log({ query, isPersist })
            return isPersist
          }
        }
      }}
    >
      <ErrorBoundary>
        <PrefetchQuery />
      </ErrorBoundary>
      {props.children}
    </PersistQueryClientProvider>
  )
}

const PrefetchQuery: FC = () => {
  const isPersistRestoring: boolean = useIsRestoring()
  const queryClient: QueryClient = useQueryClient()

  useEffect(() => {
    // console.log({
    //   configData,
    //   profileData,
    //   configCache,
    //   profileCache,
    //   isPersistRestoring
    // })
    if (!isPersistRestoring) {
      const queryCache: QueryCache = queryClient.getQueryCache()
      const configCache = queryCache.find([EndPointUrlConst.CONFIG.OPTIONS])
      const profileCache = queryCache.find([EndPointUrlConst.MEMBERS.PROFILE])
      if (!configCache) {
        queryClient.prefetchQuery(
          [EndPointUrlConst.CONFIG.OPTIONS],
          async () => {
            const { data } = await ConfigService.getConfigOptions()
            return data
          },
          {
            cacheTime: Infinity,
            // staleTime: 5 * 60 * 1000,
            staleTime: 10 * 1000,
            meta: {
              persist: true
            }
          }
        )
      }
      if (!profileCache) {
        queryClient.prefetchQuery(
          [EndPointUrlConst.MEMBERS.PROFILE],
          async () => {
            const { data } = await MemberService.getProfile()
            return data
          },
          {
            cacheTime: Infinity,
            // staleTime: 10 * 60 * 100,
            staleTime: 10 * 1000,
            meta: {
              persist: true
            }
          }
        )
      }
    }
  }, [isPersistRestoring])

  return <div></div>
}

export default WrapPersistQueryClientProvider
