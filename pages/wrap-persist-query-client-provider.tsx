import React, { FC, ReactNode, useMemo, useState } from 'react'
import { Persister } from '@tanstack/query-persist-client-core'
import { Query, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
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
            const { meta, state } = query
            const { persist } = meta || {}
            return !state.error && !!persist
          }
        }
      }}
    >
      <PrefetchQuery />
      {props.children}
    </PersistQueryClientProvider>
  )
}

const PrefetchQuery: FC = () => {
  ConfigService.useGetConfigOptions()
  MemberService.useGetProfile()
  return <></>
}

export default WrapPersistQueryClientProvider
