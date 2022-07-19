import { NextRouter, useRouter } from 'next/router'
import th from './th'
import en from './en'

const Translate = (key: string): string => {
  const router: NextRouter = useRouter()
  const { locale } = router
  const lang: any = locale === 'en' ? en : th
  try {
    return key.split('.').reduce((a: string, b: string) => a[b], lang)
  } catch (error) {
    return `error key ${key}`
  }
}

export default Translate
