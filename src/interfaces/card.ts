export namespace Card {
  export interface IListItem {
    Name: string
    PromtCpin: string
    Value1: string
    Value2?: string
    IsMasterPassMember: string
    CardStatus: string
    BankIca: string
    LoyaltyCode: string
    ProductName: string
    UniqueId: string
    EftCode: string
  }
  export interface IReqCardList {
    token: string
    msisdn: string
    listType: string
    sendSms: string
    dateTime?: string
  }
  export interface IListRequest {
    params: IReqCardList
  }
  export interface IReqCardRegister {
    cardHolderName?: string | null
    email?: string | null
    lastName?: string | null
    firstName?: string | null
    homePostalCode?: string | null
    homeCountryCode?: string | null
    homeState?: string | null
    homeCity?: string | null
    homeAddress?: string | null
    accountAliasName?: string | null
    uiChannelType?: string
    timeZone?: string
    sendSms?: string
    referenceNo?: string
    mobileAccountConfig?: string
    identityVerificationFlag?: string
    mmrpConfig?: string
    defaultAccount?: string
    cpinFlag?: string
    cardTypeFlag?: string
    eActionType?: string
    delinkReason?: string | null
    clientIp?: string | null
    actionType?: string
    fp?: string | null
    expiryDate: string
    token: string
    msisdn: string
    cvc: string
    rtaPan: string
    dateTime?: string
  }
  export interface IRegisterRequest {
    params: IReqCardRegister
  }

  export interface IReqCardDelete {
    uiChannelType?: string
    mobileAccountConfig?: string
    sendSms?: string
    mmrpConfig?: string
    identityVerificationFlag?: string
    eActionType?: string
    delinkReason?: string
    actionType?: string
    defaultAccount?: string
    cpinFlag?: string
    cardTypeFlag?: string
    fp?: string
    referenceNo?: string
    msisdn: string
    token: string
    accountAliasName: string
    dateTime?: string
  }
  export interface IDeleteRequest {
    params: IReqCardDelete
  }
}
