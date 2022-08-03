import { BankNameEnum, BankStatusEnum } from '~/enums'
import { IBankAccountData } from '~/interfaces'

export const bankMock: IBankAccountData[] = [
  {
    fullName: 'สมชาย2 ใจใจหน่อยasdasd',
    citizenNo: '4466666666666',
    bankName: BankNameEnum.KBANK,
    bankAccountNo: '1234567999999',
    bankAccountName: '3213123123',
    bankFullName: 'กสิกรไทย',
    status: BankStatusEnum.PENDING,
    isDefault: true,
    id: '1'
  },
  {
    fullName: 'สมชาย3 ใจเริ่มไม่ดีละ  ddsdfsdfsfsdf',
    citizenNo: '2343243242322',
    bankName: BankNameEnum.BAY,
    bankAccountNo: '1234567890987',
    bankAccountName: 'sdasdasdasd',
    bankFullName: 'กรุงศรี',
    status: BankStatusEnum.APPROVED,
    id: '2',
    isDefault: false
  }
]
