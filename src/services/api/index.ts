import { account } from './account'
import { card } from './card'
import { otp } from './otp'
import { payment } from './payment'

/**
 * All api calls
 *
 * @class api
 */
class api {
  /**
   *
   * Card
   * @static
   * @memberof api
   */
  static card = card
  /**
   *
   * OTP
   * @static
   * @memberof api
   */
  static otp = otp
  /**
   *
   * Payment
   * @static
   * @memberof api
   */
  static payment = payment
  /**
   *
   * Account
   * @static
   * @memberof api
   */
  static account = account
}

export { api }
