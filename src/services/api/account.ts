import { handleValidationType } from './../../utils/error-helpers'
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
      dateTime: new Date().toISOString(),
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
  /**
   *
   * link card to masterpass
   *
   * @static
   * @memberof account
   */
  static link = async ({ params }: Account.ILinkAccountRequest) => {
    const defaultParams = {
      sendSms: 'Y',
      referenceNo: '',
      cardAliasName: '',
      fp: '',
      dateTime: new Date().toISOString(),
    }

    const serviceParams: Account.IReqLinkAccount = { ...defaultParams, ...params }

    const response: MP.IRes = await request.post(`/linkCardToClient`, serviceParams)

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
        validationToken: response.Data.Body.Fault.Detail.ServiceFaultDetail.Token,
        validationType: handleValidationType(errorResponse),
        errorMessage: errorResponse.ResponseDesc,
        url3D: errorResponse.Url3D,
      }
    }
  }
}

export { account }
