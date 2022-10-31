import { takeRight } from 'lodash'
import { ImageSizeEnum } from '~/enums'
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

export const HelperGetImageUtil = (imageId: string, size: ImageSizeEnum): string =>
  `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}/images/${imageId}/${size}`

/**
 * Creates an Indexed DB persister
 * @see https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
 */
export function HelperCreateIDBPersister(idbValidKey: IDBValidKey = 'reactQuery'): Persister {
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

export const blobToFile = async (blobData: Blob, filename: string): Promise<File> => {
  return new File([blobData], `${filename}`, {
    type: blobData.type,
    lastModified: new Date().getTime()
  })
}
