import { BankName, BankStatus, IBankAccountData } from '.'

export const bankMock: IBankAccountData[] = [
  {
    fullName: 'สมชาย2 ใจใจหน่อยasdasd',
    citizenNo: '4466666666666',
    bankName: BankName.KBANK,
    bankAccountNo: '000000000000000000',
    bankAccountName: '3213123123',
    bankFullName: 'กสิกรไทย',
    status: BankStatus.PENDING,
    isDefault: true,
    id: '1'
  },
  {
    fullName: 'สมชาย3 ใจเริ่มไม่ดีละ  ddsdfsdfsfsdf',
    citizenNo: '2343243242322',
    bankName: BankName.BAY,
    bankAccountNo: 'EEERERERETEte',
    bankAccountName: 'sdasdasdasd',
    bankFullName: 'กรุงศรี',
    status: BankStatus.APPROVED,
    id: '2',
    isDefault: false
  }
]
