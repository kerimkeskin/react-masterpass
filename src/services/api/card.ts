import { Card } from '../../interfaces/card'
import { MP } from '../../interfaces/masterpass'
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
}

export { card }
