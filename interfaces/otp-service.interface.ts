import { OtpTypeEnum } from '~/enums'

export interface IOtpRequestService {
  reference: string
  type: OtpTypeEnum
}
