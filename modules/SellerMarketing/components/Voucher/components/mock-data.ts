import { IVoucherFormData } from '~/interfaces'

export const bankMock: IVoucherFormData[] = [
  {
    name: '001',
    code: '001',
    periodCode: '2022-08-20-2022-08-25',
    typeDiscount: 'โดย%',
    valueDiscount: '50',
    maxDiscount: 'ไม่จำกัด',
    minDiscount: '100',
    amountAvailable: '100',
    id: '1'
  },
  {
    name: '002',
    code: '002',
    periodCode: '2022-08-20-2022-08-25',
    typeDiscount: 'โดย%',
    valueDiscount: '50',
    maxDiscount: 'ไม่จำกัด',
    minDiscount: '100',
    amountAvailable: '100',
    id: '2'
  }
]
