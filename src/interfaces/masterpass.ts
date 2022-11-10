import { Card } from './card'

export namespace MP {
  export interface ITransactionHeader {
    RequestDateTime: Date
    ResponseDatetime: Date
  }

  export interface IListItems {
    ListItem: Card.IListItem[]
  }

  export interface ISmsNoti {
    To?: string
    Value?: string
  }

  export interface ITransactionBody {
    Token?: string
    RefNo: string
    ListItems?: IListItems
    url3D?: string
    AccountStatus?: string
    CardUniqueId?: string
    SmsNoti?: ISmsNoti
    CurrencyCode?: string
    ApprovalCode?: string
    MaskedSenderRta?: string
    MerchantName?: string
    MaskedAccountNo?: string
  }

  export interface IResult {
    TransactionHeader: ITransactionHeader
    TransactionBody: ITransactionBody
  }

  export interface IResponse {
    Result: IResult
  }

  export interface IServiceFaultDetail {
    Token: string | null | undefined
    RefNo: string | null | undefined
    ResponseCode: string | null | undefined
    ResponseDesc: string | null | undefined
    InternalResponseCode: string | null | undefined
    InternalResponseMessage: string | null | undefined
    CardIssuerName?: string | null | undefined
    MaskedPan?: string | null | undefined
    Url3D?: string
    Url3DSuccess?: string
    Url3DError?: string
    NewMsisdn: string | null | undefined
  }

  export interface IDetail {
    ServiceFaultDetail: IServiceFaultDetail
  }

  export interface IFault {
    Detail: IDetail
  }

  export interface IBody {
    Response: IResponse
    Fault: IFault
  }

  export interface IData {
    Body: IBody
  }

  export interface IRes {
    Result: boolean
    Message: string
    Data: IData
    error: string
  }
}
