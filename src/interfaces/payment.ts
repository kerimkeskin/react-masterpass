export namespace Payment {
  export interface IPurchaseRequest {
    params: IReqPurchase
  }

  export interface IReqPurchase {
    orderNo: string
    cvc: string
    installmentCount: number
    token: string
    msisdn: string
    listAccountName: string
    amount: string
    userId?: string
    aav?: string
    sendSmsMerchant?: string
    sendSms?: string
    encCPin?: string
    rewardValue?: string
    rewardName?: string
    paymentType?: string
    macroMerchantId?: string
    moneyCardInvoiceAmount?: string | null
    moneyCardMigrosDiscountAmount?: string | null
    moneyCardPaymentAmount?: string | null
    moneyCardExtraDiscountAmount?: string | null
    moneyCardProductBasedDiscountAmount?: string | null
    password?: string
    encPassword?: string
    fp?: string | null
    referenceNo?: string
  }

  export interface IPurchaseAndRegisterRequest {
    params: IReqPurchaseAndRegister
  }

  export interface IReqPurchaseAndRegister {
    token: string
    msisdn: string
    accountAliasName: string
    rtaPan: string
    expiryDate: string
    cvc: string
    amount: string
    cardHolderName?: string
    orderNo?: string
    installmentCount?: number
    rewardName?: string
    rewardValue?: string
    firstName?: string
    lastName?: string
    gender?: string
    paymentType?: string
    merchantId?: string
    macroMerchantId?: string
    actionType?: string
    moneyCardInvoiceAmount?: string | null
    moneyCardMigrosDiscountAmount?: string | null
    moneyCardPaymentAmount?: string | null
    moneyCardExtraDiscountAmount?: string | null
    moneyCardProductBasedDiscountAmount?: string | null
    sendSms?: string
    fp?: string
    referenceNo?: string
  }
}
