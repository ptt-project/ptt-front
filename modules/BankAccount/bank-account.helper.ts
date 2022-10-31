/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { keyBy } from 'lodash'
import { useCallback, useMemo } from 'react'
import { ConfigService } from '~/services'

export const useGetBankMeta = (bankCode?: string) => {
  const { data: configOptions } = ConfigService.useGetConfigOptions()

  const bankMasterHash = useMemo(() => {
    return keyBy(configOptions?.bank || [], (d) => d.value)
  }, [configOptions])

  const getBankMeta = useCallback(
    (code: string) => {
      return bankMasterHash[code]
    },
    [bankMasterHash]
  )

  const bankMeta = useMemo(() => {
    return bankMasterHash[bankCode]
  }, [bankMasterHash])
  return { bankMeta, getBankMeta }
}
