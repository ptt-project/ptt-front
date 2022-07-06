import { useCallback, useState } from 'react'

export const useVisible = (): {
  visible: boolean
  show: VoidFunction
  hide: VoidFunction
} => {
  const [visible, setVisible] = useState(false)
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
