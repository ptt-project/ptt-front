import { IVoucherFormData } from '~/interfaces'

export const voucherMock: IVoucherFormData[] = [
  {
    voucherName: '001',
    code: '001',
    periodCode: '',
    typeDiscount: 'โดย%',
    valueDiscount: '50',
    maxDiscount: 'ไม่จำกัด',
    minDiscount: '100',
    amountAvailable: '100',
    id: '1'
  },
  {
    voucherName: '002',
    code: '002',
    periodCode: '',
    typeDiscount: 'โดย%',
    valueDiscount: '50',
    maxDiscount: 'ไม่จำกัด',
    minDiscount: '100',
    amountAvailable: '100',
    id: '2'
  }
]
