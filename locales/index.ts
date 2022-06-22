import { NextRouter, useRouter } from 'next/router'
import th from './th'
import en from './en'

const t = (key: string): string => {
  const router: NextRouter = useRouter()
  const { locale } = router
  const lang: any = locale === 'en' ? en : th
  return key.split('.').reduce((a: string, b: string) => a[b], lang)
}

export default t
