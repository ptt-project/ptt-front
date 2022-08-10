const baseUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`

export const EndPointUrlConst: any = {
  AUTH: {
    REGISTER_VALIDATE: `${baseUrl}/auth/register/validate`,
    REGISTER: `${baseUrl}/auth/register`,
    LOGIN: `${baseUrl}/auth/login`
  },
  OTP: {
    REQUEST: `${baseUrl}/otp/request`
  },
  MEMBER: {
    PROFILE: `${baseUrl}/members/profile`
  }
}
