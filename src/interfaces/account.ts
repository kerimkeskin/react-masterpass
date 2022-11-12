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
  }
}
