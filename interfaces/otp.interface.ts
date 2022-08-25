import { OtpTypeEnum } from '~/enums'

export interface IOtpRequestPayload {
  reference: string
  type: OtpTypeEnum
}

export interface IOtpData {
  otpCode: string
  refCode: string
  reference: string
}
