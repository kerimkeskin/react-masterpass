import { MP } from '../../interfaces/masterpass'
import request from '../request'
import { Account } from '../../interfaces/account'

class account {
  /**
   *
   * check masterpass account status
   *
   * @static
   * @memberof account
   */
  static checkMasterpass = async ({ params }: Account.ICheckMasterpassRequest) => {
    const defaultParams = {
      sendSms: 'Y',
      fp: '',
      referenceNo: '',
    }

    const serviceParams: Account.IReqCheckMasterpass = { ...defaultParams, ...params }

    const response: MP.IRes = await request.post(`/checkMasterPassEndUser`, serviceParams)

    if (response.error)
      return {
        errorMessage: response.error,
      }

    const errorResponse = response.Data.Body.Fault.Detail.ServiceFaultDetail

    if (errorResponse.ResponseCode === '0000' || errorResponse.ResponseCode === '') {
      return {
        data: response.Data.Body.Response.Result.TransactionBody.AccountStatus,
      }
    } else {
      return {
        errorMessage: errorResponse.ResponseDesc,
      }
    }
  }
}

export { account }
