import { handleValidationTypeForPurchase } from './../../utils/error-helpers'
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
   * @memberof purchase
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
    }

    const cvc = RSA.encrypt(params.cvc)

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

    if (errorResponse.ResponseCode === '0000' || errorResponse.ResponseCode === '') {
      return {
        data: response.Data.Body.Response,
      }
    } else {
      return {
        validationToken: response.Data.Body.Fault.Detail.ServiceFaultDetail.Token,
        validationType: handleValidationTypeForPurchase(errorResponse),
        errorMessage: errorResponse.ResponseDesc,
      }
    }
  }
}

export { payment }
