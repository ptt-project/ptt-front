export enum BankName {
  /**
   * @description บมจ. ธนาคารไทยพาณิชย์
   */
  SCB = 'SCB',
  /**
   * @description บมจ. ธนาคารกรุงเทพ
   */
  BBL = 'BBL',
  /**
   * @description บมจ. ธนาคารกสิกรไทย
   */
  KBANK = 'KBANK',
  /**
   * @description บมจ. ธนาคารยูโอบี
   */
  UOB = 'UOB',
  /**
   * @description บมจ. ธนาคารกรุงศรีอยธุยา
   */
  BAY = 'BAY',
  /**
   * @description บมจ. ธนาคารกรุงไทย
   */
  KTB = 'KTB',
  /**
   * @description บมจ. ธนาคารทหารไทย
   */
  TMB = 'TMB',
  /**
   * @description บมจ. ธนาคารธนชาติ
   */
  TBANK = 'TBANK',
  /**
   * @description บมจ. ธนาคารซีไอเอ็มบีไทย
   */
  CIMB = 'CIMB',
  /**
   * @description บมจ. ธนาคารแลนด์แอนด์เฮ้าส์จำกัด
   */
  LH = 'LH'
}

export enum BankStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export interface IBankAccountData {
  id?: string
  fullName: string
  citizenNo: string
  status: BankStatus
  bankFullName: string
  bankName: BankName
  bankAccountName: string
  bankAccountNo: string
  isDefault: boolean
}

export interface IBankOptionData {
  bankFullName: string
  bankName: BankName
}

export type IBankAccountFromValues = IBankAccountData
