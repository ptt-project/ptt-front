export interface IVoucherFormData {
  id?: string
  name: string
  code: string
  periodCode: string
  typeDiscount: string
  valueDiscount: string
  maxDiscount: string
  minDiscount: string
  amountAvailable: string
}

export type IVoucherFormValues = IVoucherFormData
