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
