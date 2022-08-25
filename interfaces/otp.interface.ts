import { OtpTypeEnum } from '~/enums'

export interface IOtpRequestPayload {
  reference: string
  type: OtpTypeEnum
}

export interface IOtp {
  otpCode: string
  refCode: string
  reference: string
}
