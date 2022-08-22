export interface IVoucherFormData {
  id?: string
  fullName: string
  citizenNo: string
  bankFullName: string
  bankAccountName: string
  bankAccountNo: string
  isDefault: boolean
}

export type IVoucherFormValues = IVoucherFormData
