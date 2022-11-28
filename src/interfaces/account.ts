export namespace Account {
  export interface ICheckMasterpassRequest {
    params: IReqCheckMasterpass
  }
  export interface IReqCheckMasterpass {
    token: string
    msisdn: string
    sendSms?: string
    fp?: string | null
    referenceNo?: string
    dateTime?: string
  }

  export interface ILinkAccountRequest {
    params: IReqLinkAccount
  }
  export interface IReqLinkAccount {
    token: string
    msisdn: string
    cardAliasName: string
    sendSms?: string
    referenceNo?: string
    fp?: string | null
    dateTime?: string
  }
}
