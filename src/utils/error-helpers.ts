import { MP } from '../interfaces/masterpass'

export const handleValidationType = (errorResponse: MP.IServiceFaultDetail) => {
  switch (errorResponse.ResponseCode) {
    case '5001' || '5008':
      return 'showOTP'
    case '5010':
      return 'show3D'
    case '5015':
      return 'showMpin'
    default:
      return ''
  }
}

export const handleValidationTypeForPurchase = (errorResponse: MP.IServiceFaultDetail) => {
  switch (errorResponse.ResponseCode) {
    case '5001':
      return 'showOTP'
    case '5010':
      return 'show3D'
    case '5002':
      return 'showMpin'
    default:
      return ''
  }
}
