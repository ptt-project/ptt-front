import { useCallback, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useVisible = () => {
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
