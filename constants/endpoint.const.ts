const baseUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`

export const EndPointUrlConst: any = {
  AUTH: {
    REGISTER_VALIDATE: `${baseUrl}/auth/register/validate`
  },
  MEMBER: {
    PROFILE: `${baseUrl}/members/profile`,

    REGISTER: `${baseUrl}/auth/register`
  },
  OTP: {
    REQUEST: `${baseUrl}/otp/request`
  }
}
