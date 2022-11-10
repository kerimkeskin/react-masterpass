export namespace OTP {
  export interface IOTPVerifyRequest {
    params: IReqOTPVerify
    type: 'mpin' | 'otp'
  }
  export interface IReqOTPVerify {
    validationCode: string
    pinType?: string
    validationRefNo: string
    token: string
    sendSms: string
    fp: string | null
  }
}
