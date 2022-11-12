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
}
