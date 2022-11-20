import { NextRouter } from 'next/router'

export enum labelKey {
  TH = 'labelTh',
  EN = 'labelEn'
}

export function OptionKeyLabelUtil(router: NextRouter): string {
  return router.locale === 'en' ? labelKey.EN : labelKey.TH
}
