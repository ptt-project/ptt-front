import { useRouter } from 'next/router'
import th from './th'
import en from './en'

const t = (key) => {
  const router = useRouter()
  const { locale } = router
  const t = locale === 'en' ? en : th
  return key.split('.').reduce((a, b) => a[b], t)
}

export default t
