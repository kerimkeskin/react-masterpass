import { card } from './card'
import { otp } from './otp'

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
}

export { api }
