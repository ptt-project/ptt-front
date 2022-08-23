export interface IVoucherFormData {
  id?: string
  voucherName: string
  code: string
  periodCode: string
  typeDiscount: string
  valueDiscount: string
  maxDiscount: string
  minDiscount: string
  amountAvailable: string
}

export type IVoucherFormValues = IVoucherFormData
