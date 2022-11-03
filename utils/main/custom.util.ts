import { useCallback, useState } from 'react'

export function CustomHookUseVisibleUtil(): {
  visible: boolean
  show: VoidFunction
  hide: VoidFunction
} {
  const [visible, setVisible] = useState<boolean>(false)
  const show: VoidFunction = useCallback(() => {
    setVisible(true)
  }, [])

  const hide: VoidFunction = useCallback(() => {
    setVisible(false)
  }, [])

  return {
    visible,
    show,
    hide
  }
}

export function CustomUrlUtil(pathname: string, locale: string): string {
  const localeVal: string = locale === 'th' ? '' : `/${locale}`

  return `${localeVal}${pathname}`
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function CustomPagingUtil(options?: { defaultLimit?: number; defaultPage?: number }) {
  const { defaultLimit = 5, defaultPage = 1 } = options || {}
  const [limit, setLimit] = useState<number>(defaultLimit)
  const [page, setPage] = useState<number>(defaultPage)

  // eslint-disable-next-line @typescript-eslint/typedef
  const onPageChange = useCallback((newPage: number) => {
    setPage(Math.max(0, newPage))
  }, [])

  // eslint-disable-next-line @typescript-eslint/typedef
  const onLimitChange = useCallback((newLimit: number) => {
    setLimit(newLimit)
  }, [])

  return {
    page,
    limit,
    onPageChange,
    onLimitChange
  }
}
