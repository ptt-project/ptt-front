import { Query, QueryClient } from '@tanstack/react-query'
import React, { FC, ReactNode, useState } from 'react'
import { createIDBPersister } from '~/utils/main'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { Persister } from '@tanstack/query-persist-client-core'

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
  const persister: Persister = createIDBPersister()

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
      {props.children}
    </PersistQueryClientProvider>
  )
}

export default WrapPersistQueryClientProvider
