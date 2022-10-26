import { Persister } from '@tanstack/query-persist-client-core'
import { Query, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import React, { FC, ReactNode, Suspense, useMemo, useState } from 'react'
import { ConfigService, MemberService } from '~/services'
import { HelperCreateIDBPersister } from '~/utils/main'

interface IDehydrateStateProps {
  children: ReactNode
}

const WrapPersistQueryClientProvider: FC<IDehydrateStateProps> = (props: IDehydrateStateProps) => {
  const [queryClient] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2
          }
        }
      })
  )
  const persister: Persister = useMemo(() => HelperCreateIDBPersister(), [])

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        dehydrateOptions: {
          dehydrateMutations: false,
          shouldDehydrateQuery: (query: Query): boolean => {
            const { meta } = query
            const { persist } = meta || {}
            return !!persist
          }
        }
      }}
    >
      <Suspense fallback={<div>loading...</div>}>
        <PrefetchQuery />
        {props.children}
      </Suspense>
    </PersistQueryClientProvider>
  )
}

const PrefetchQuery: FC = () => {
  ConfigService.useGetConfigOptions()
  MemberService.useGetProfile()
  return <></>
}

export default WrapPersistQueryClientProvider
