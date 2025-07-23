import { handleValidationType, handleValidationTypeForPurchase } from './../../utils/error-helpers'
import { MP } from '../../interfaces/masterpass'
import { RSA } from '../../utils/RSA'
import request from '../request'
import { Payment } from '../../interfaces/payment'

class payment {
  /**
   *
   * purchase transaction
   *
   * @static
   * @memberof payment
   */
  static purchase = async ({ params }: Payment.IPurchaseRequest) => {
    const defaultParams = {
      aav: 'aav',
      sendSmsMerchant: 'Y',
      sendSms: 'Y',
      encCPin: '0',
      rewardValue: '',
      rewardName: '',
      paymentType: '',
      macroMerchantId: '',
      moneyCardInvoiceAmount: null,
      moneyCardMigrosDiscountAmount: null,
      moneyCardPaymentAmount: null,
      moneyCardExtraDiscountAmount: null,
      moneyCardProductBasedDiscountAmount: null,
      password: '',
      encPassword: '',
      fp: '',
      dateTime: new Date().toISOString(),
    }

    const cvc = await RSA.encrypt(params.cvc)

    const serviceParams: Payment.IReqPurchase = {
      ...defaultParams,
      ...params,
      ...{ cvc },
    }

    const response: MP.IRes = await request.post(`/remotePurchaseOther`, serviceParams)

    if (response.error)
      return {
        errorMessage: response.error,
      }

    const errorResponse = response.Data.Body.Fault.Detail.ServiceFaultDetail
    const isSuccess = errorResponse.ResponseCode === '0000' || errorResponse.ResponseCode === ''

    if (isSuccess) {
      return {
        data: response.Data.Body.Response,
      }
    } else {
      return {
        validationToken: response.Data.Body.Fault.Detail.ServiceFaultDetail.Token,
        validationType: handleValidationTypeForPurchase(errorResponse),
        errorMessage: errorResponse.ResponseDesc,
        errorCode: errorResponse.ResponseCode,
        url3D: errorResponse.Url3D,
      }
    }
  }
  /**
   *
   * purchase transaction and register card
   *
   * @static
   * @memberof payment
   */
  static purchaseAndRegister = async ({ params }: Payment.IPurchaseAndRegisterRequest) => {
    const defaultParams = {
      cardHolderName: '',
      orderNo: '',
      installmentCount: 0,
      rewardName: '',
      rewardValue: '',
      firstName: '',
      lastName: '',
      gender: '',
      paymentType: '',
      merchantId: '',
      macroMerchantId: '',
      actionType: 'A',
      moneyCardInvoiceAmount: null,
      moneyCardMigrosDiscountAmount: null,
      moneyCardPaymentAmount: null,
      moneyCardExtraDiscountAmount: null,
      moneyCardProductBasedDiscountAmount: null,
      sendSms: 'Y',
      fp: '',
      referenceNo: '',
      dateTime: new Date().toISOString(),
    }

    const cvc = await RSA.encrypt(params.cvc)
    const rtaPan = await RSA.encrypt(params.rtaPan)

    const serviceParams: Payment.IReqPurchaseAndRegister = {
      ...defaultParams,
      ...params,
      ...{ cvc, rtaPan },
    }

    const response: MP.IRes = await request.post(`/purchaseAndRegister`, serviceParams)

    if (response.error)
      return {
        errorMessage: response.error,
      }

    const errorResponse = response.Data.Body.Fault.Detail.ServiceFaultDetail
    const isSuccess = errorResponse.ResponseCode === '0000' || errorResponse.ResponseCode === ''

    if (isSuccess) {
      return {
        data: response.Data.Body.Response,
      }
    } else {
      return {
        validationToken: response.Data.Body.Fault.Detail.ServiceFaultDetail.Token,
        validationType: handleValidationType(errorResponse),
        errorMessage: errorResponse.ResponseDesc,
        errorCode: errorResponse.ResponseCode,
        url3D: errorResponse.Url3D,
      }
    }
  }
}

export { payment }
