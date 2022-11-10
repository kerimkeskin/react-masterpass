import { MP } from '../../interfaces/masterpass'
import { OTP } from '../../interfaces/otp'
import { RSA } from '../../utils/RSA'
import { handleValidationType } from '../../utils/error-helpers'
import request from '../request'

class otp {
  /**
   *
   * otp transaction verification
   *
   * @static
   * @memberof otp
   */
  static verify = async ({ params, type }: OTP.IOTPVerifyRequest) => {
    const defaultParams = {
      sendSms: 'Y',
      fp: null,
    }
    const validationCode = type === 'mpin' ? RSA.encrypt(params.validationCode) : params.validationCode

    const serviceParams: OTP.IReqOTPVerify = {
      ...defaultParams,
      ...params,
      ...{ validationCode },
    }

    const response: MP.IRes = await request.post(`/validateTransaction`, serviceParams)

    if (response.error)
      return {
        errorMessage: response.error,
      }

    const errorResponse = response.Data.Body.Fault.Detail.ServiceFaultDetail

    if (errorResponse.ResponseCode === '0000' || errorResponse.ResponseCode === '') {
      return {
        data: response.Data.Body.Response,
        validationToken: response.Data.Body.Response.Result.TransactionBody.Token,
      }
    } else {
      return {
        validationToken: response.Data.Body.Fault.Detail.ServiceFaultDetail.Token,
        validationType: handleValidationType(errorResponse),
        errorMessage: errorResponse.ResponseDesc,
      }
    }
  }
}

export { otp }
