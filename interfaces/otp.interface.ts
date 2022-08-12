import { OtpTypeEnum } from '~/enums'

export interface IOtpRequestService {
  reference: string
  type: OtpTypeEnum
}

export interface IOtpData {
  otpCode: string
  refCode: string
  reference: string
}
