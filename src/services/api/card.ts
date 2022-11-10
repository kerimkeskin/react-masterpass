import { Card } from '../../interfaces/card'
import { MP } from '../../interfaces/masterpass'
import { handleValidationType } from '../../utils/error-helpers'
import { RSA } from '../../utils/RSA'
import request from '../request'

class card {
  /**
   *
   * card list
   *
   * @static
   * @memberof card
   */
  static list = async ({ params }: Card.IListRequest) => {
    const response: MP.IRes = await request.post(`/listManagement`, params)

    if (response.error)
      return {
        errorMessage: response.error,
      }

    const responseCode = response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseCode

    if (responseCode === '0000' || responseCode === '') {
      return {
        data: response.Data.Body.Response.Result.TransactionBody.ListItems?.ListItem,
      }
    } else {
      return {
        errorMessage: response.Data.Body.Fault.Detail.ServiceFaultDetail.ResponseDesc,
      }
    }
  }

  /**
   *
   * card register
   *
   * @static
   * @memberof card
   */
  static register = async ({ params }: Card.IRegisterRequest) => {
    const defaultParams = {
      cardHolderName: null,
      email: null,
      lastName: null,
      firstName: null,
      homePostalCode: null,
      homeCountryCode: null,
      homeState: null,
      homeCity: null,
      homeAddress: null,
      accountAliasName: null,
      uiChannelType: '6',
      timeZone: '+01',
      sendSms: 'N',
      mobileAccountConfig: 'MWA',
      identityVerificationFlag: 'Y',
      mmrpConfig: '110010',
      defaultAccount: 'Y',
      cpinFlag: 'Y',
      cardTypeFlag: '05',
      eActionType: 'A',
      delinkReason: null,
      actionType: 'A',
      fp: null,
    }

    const serviceParams: Card.IReqCardRegister = {
      ...defaultParams,
      ...params,
      ...{ rtaPan: RSA.encrypt(params.rtaPan), cvc: RSA.encrypt(params.cvc) },
    }

    const response: MP.IRes = await request.post(`/register`, serviceParams)

    if (response.error)
      return {
        errorMessage: response.error,
      }

    const errorResponse = response.Data.Body.Fault.Detail.ServiceFaultDetail

    if (errorResponse.ResponseCode === '0000' || errorResponse.ResponseCode === '') {
      return {
        data: response.Data.Body.Response,
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

  /**
   *
   * card delete
   *
   * @static
   * @memberof card
   */
  static delete = async ({ params }: Card.IDeleteRequest) => {
    const defaultParams = {
      timeZone: '03',
      uiChannelType: '6',
      mobileAccountConfig: 'WMA',
      sendSms: 'Y',
      mmrpConfig: '110010',
      identityVerificationFlag: 'Y',
      eActionType: 'A',
      delinkReason: '',
      actionType: 'A',
      defaultAccount: 'Y',
      cpinFlag: 'Y',
      cardTypeFlag: '05',
      fp: '',
    }

    const serviceParams: Card.IReqCardDelete = { ...defaultParams, ...params }

    const response: MP.IRes = await request.post(`/deleteCard`, serviceParams)

    if (response.error)
      return {
        errorMessage: response.error,
      }

    const errorResponse = response.Data.Body.Fault.Detail.ServiceFaultDetail

    if (errorResponse.ResponseCode === '0000' || errorResponse.ResponseCode === '') {
      return {
        data: response.Data.Body.Response,
      }
    } else {
      return {
        errorMessage: errorResponse.ResponseDesc,
      }
    }
  }
}

export { card }
