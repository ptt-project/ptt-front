const baseUrl: string = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`

// eslint-disable-next-line @typescript-eslint/typedef
export const EndPointUrlConst = {
  AUTH: {
    REGISTER_VALIDATE: `${baseUrl}/auth/register/validate`,
    REGISTER: `${baseUrl}/auth/register`,
    LOGIN: `${baseUrl}/auth/login`
  },
  OTP: {
    REQUEST: `${baseUrl}/otp/request`
  },
  MEMBER: {
    PROFILE: `${baseUrl}/members/profile`,
    ADDRESSES: `${baseUrl}/members/addresses`
  }
} as const
