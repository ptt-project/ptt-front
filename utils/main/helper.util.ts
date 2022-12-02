import { takeRight } from 'lodash'
import { get, set, del } from 'idb-keyval'
import { PersistedClient, Persister } from '@tanstack/react-query-persist-client'

export const HelperCensorBankAccountNoUtil = (bankAccountNo: string): string =>
  `*${takeRight(bankAccountNo, 4).join('')}`

export const HelperDecimalFormatUtil = (
  value: number,
  digit: number = 2,
  locale: 'th-TH' | 'en-EN' = 'en-EN',
  options: Intl.NumberFormatOptions = {}
): string =>
  Number(value || 0).toLocaleString(locale, {
    ...options,
    maximumFractionDigits: digit,
    minimumFractionDigits: digit
  })

export const HelperMobileFormatUtil = (mobile: string): string =>
  `${mobile.slice(0, 3)}-${mobile.slice(3, 6)}-${mobile.slice(6, 10)}`

/**
 * Creates an Indexed DB persister
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
export function HelperCreateIDBPersisterUtil(idbValidKey: IDBValidKey = 'reactQuery'): Persister {
  return {
    persistClient: async (client: PersistedClient) => {
      set(idbValidKey, client)
    },
    restoreClient: async () => {
      return await get<PersistedClient>(idbValidKey)
    },
    removeClient: async () => {
      await del(idbValidKey)
    }
  } as Persister
}

export const HelperBlobToFileUtil = (blobData: Blob, filename: string): File => {
  return new File([blobData], `${filename}`, {
    type: blobData.type,
    lastModified: new Date().getTime()
  })
}
