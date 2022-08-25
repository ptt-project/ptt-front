import { IVoucherFormData } from '~/interfaces'

export const voucherMock: IVoucherFormData[] = [
  {
    voucherName: 'ลดราคากระเป๋าสีน้ำตาล',
    code: 'AOPP11',
    periodCode: '',
    typeDiscount: '2',
    valueDiscount: '50',
    maxDiscount: 2,
    minDiscount: '100',
    amountAvailable: '100',
    id: '1'
  },
  {
    voucherName: '002',
    code: '002',
    periodCode: '',
    typeDiscount: '1',
    valueDiscount: '50',
    maxDiscount: 1,
    minDiscount: '100',
    amountAvailable: '100',
    id: '2'
  }
]
