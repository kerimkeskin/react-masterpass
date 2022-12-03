# react-masterpass

## Installation

```
npm i @kerim-keskin/react-masterpass
```

## Configuration

### Step 1

Create config file

```jsx
// config.ts
import { IConfig } from '../interfaces/config'

export const config: IConfig = {
  serviceUrl: '', 
  clientId: '', 
  version: '36.4',
  clientType: '1',
  sendSmsLanguage: 'tur', // tur, eng etc.
  clientIp: '', // optional
}

```

### Step 2

Define your configs to `MasterpassProvider`

```jsx 
// Masterpass.tsx
import React from 'react'
import { config } from './constants/config'
import { MasterpassProvider } from '@kerim-keskin/react-masterpass'

export default function Masterpass() {
  return (
    <MasterpassProvider config={config}>
        {/* your child component */}
    </MasterpassProvider>
  )
}

```

## With Next.js

You need to dynamically import the component containing `<MasterpassProvider/>`

```jsx 
// Masterpass.tsx
import React from 'react'
import { config } from './constants/config'
import { MasterpassProvider } from '@kerim-keskin/react-masterpass'

export default function Masterpass() {
  return (
    <MasterpassProvider config={config}>
        {/* your child component */}
    </MasterpassProvider>
  )
}

```

```jsx 
// YourParentComponent.tsx
import React from 'react'
 
const Masterpass = dynamic(() => import('./Masterpass'), {
  ssr: false,
})

export default function ParentComponent() {
  return (
    <>
      <Masterpass />
    </>
  )
}

```


# Methods

## Account

`checkMasterpass` - Check if user has masterpass account

```jsx 
  import { api } from '@kerim-keskin/react-masterpass'

  const asyncFunction = async () => {
    const params = {
      token: '', // required
      msisdn: '', // required

      // optional params

      // sendSms: 'Y', 
      // fp: '', 
      // referenceNo: '',
    }

    const { data, errorMessage } = await api.account.checkMasterpass({ params })

    // do something
  }
```
| Prop         | Default   | Type     | Description                    |
|--------------|-----------|----------|--------------------------------|
| data         | undefined | `string` | Account status (eg: "0110001") |
| errorMessage | -         | `string` | Error message                  |
                                              

`linkAccount` - Link account to masterpass

```jsx 
  import { api } from '@kerim-keskin/react-masterpass'

  const asyncFunction = async () => {
    const params = {
      token: '', // required
      msisdn: '', // required

      // optional params

      // cardAliasName: '',
      // sendSms: 'Y',
      // referenceNo: '',
      // fp: '',
    }

    const { data, errorMessage, validationToken, validationType, url3D } = await api.account.link({ params })
    

    // do something
  }
```

| Prop            | Default   | Type     | Description                             |
|-----------------|-----------|----------|-----------------------------------------|
| data            | undefined | `string` | Account status (ex: "0110001")          |
| errorMessage    | -         | `string` | Error message                           |
| validationToken | undefined | `string` | Token to be used for next transaction   |
| validationType  | -         | `string` | 'showOTP' / 'show3D' / 'showMpin'       |
| url3D           | undefined | `string` | URL information for 3D verification     |


## Card

`list` - List cards
```jsx 
  import { api } from '@kerim-keskin/react-masterpass'

  const asyncFunction = async () => {
    const params = {
      token: '', // required
      msisdn: '', // required

      // optional params
      
      // listType: 'ACCOUNT',
      // sendSms: 'Y',
    }

    const { data, errorMessage } = await api.card.list({ params })

    // do something
  }
```
| Prop         | Default   | Type     | Description                    |
|--------------|-----------|----------|--------------------------------|
| data         | undefined | `string` | Returns the list of cards      |
| errorMessage | -         | `string` | Error message                  |
  
`register` - Register card
```jsx 
  import { api } from '@kerim-keskin/react-masterpass'

  const asyncFunction = async () => {
    const params = {
      token: '', // required
      msisdn: '', // required
      expiryDate: '', // required
      cvc: '', // required
      rtaPan: '', // required
      accountAliasName: '', // required

      // optional params

      // cardHolderName: '',
      // email: '',
      // lastName: '',
      // firstName: '',
      // homePostalCode: '',
      // homeCountryCode: '',
      // homeState: '',
      // homeCity: '',
      // homeAddress: '',
      // uiChannelType: '6',
      // timeZone: '+01',
      // sendSms: 'N',
      // referenceNo: null,
      // mobileAccountConfig: 'MWA',
      // identityVerificationFlag: 'Y',
      // mmrpConfig: '110010',
      // defaultAccount: 'Y',
      // cpinFlag: 'Y',
      // cardTypeFlag: '05',
      // eActionType: 'A',
      // delinkReason: null,
      // clientIp: null,
      // actionType: 'A',
      // fp: null,
    }
    const { data, errorMessage, validationToken, validationType } = await api.card.register({ params })

    // do something
  }
```
| Prop            | Default   | Type     | Description                             |
|-----------------|-----------|----------|-----------------------------------------|
| data            | undefined | `{...}`  | -                                       |
| errorMessage    | -         | `string` | Error message                           |
| validationToken | undefined | `string` | Token to be used for next transaction   |
| validationType  | -         | `string` | 'showOTP' / 'show3D' / 'showMpin'       |
| url3D           | undefined | `string` | URL information for 3D verification     |

  
`delete` - Delete card
```jsx 
  import { api } from '@kerim-keskin/react-masterpass'

  const asyncFunction = async () => {
    const params = {
      token: '', // required
      msisdn: '', // required
      accountAliasName: '', // required

      // optional params

      // timeZone: '03',
      // uiChannelType: '6',
      // referenceNo: '',
      // mobileAccountConfig: 'WMA',
      // sendSms: 'Y',
      // mmrpConfig: '110010',
      // identityVerificationFlag: 'Y',
      // eActionType: 'A',
      // delinkReason: '',
      // actionType: 'A',
      // defaultAccount: 'Y',
      // cpinFlag: 'Y',
      // cardTypeFlag: '05',
      // fp: '',
    }

    const { data, errorMessage } = await api.card.delete({ params })

    // do something
  }
```
| Prop         | Default   | Type     | Description                    |
|--------------|-----------|----------|--------------------------------|
| data         | undefined | `{...}`  | -                              |
| errorMessage | -         | `string` | Error message                  |


## OTP

`verify` - Verify OTP 

```jsx 
  import { api } from '@kerim-keskin/react-masterpass'

  const asyncFunction = async () => {
    const params = {
      validationRefNo: '', // required - validation token from previous transaction
      token: '', // required
      validationCode: '', // required

      // optional params

      // sendSms: 'Y',
      // fp: null,
      // referenceNo: '',
    }

    const type = '' // mpin | ''

    const {
      data,
      validationType,
      errorMessage,
      validationToken,
    } = await api.otp.verify({ params, type })

    // do something
  }
```
| Prop            | Default   | Type     | Description                             |
|-----------------|-----------|----------|-----------------------------------------|
| data            | undefined | `{...}`  | -                                       |
| type            | ""        | `string` | mpin / ""                               |
| errorMessage    | -         | `string` | Error message                           |
| validationToken | undefined | `string` | Token to be used for next transaction   |
| validationType  | -         | `string` | 'showOTP' / 'show3D' / 'showMpin'       |
| url3D           | undefined | `string` | URL information for 3D verification     |
 
 `resend` - Resend OTP
```jsx 
  import { api } from '@kerim-keskin/react-masterpass'

  const asyncFunction = async () => {
    const params = {
      validationRefNo: '', // required - validation token from previous transaction

      // optional params

      // sendSms: 'Y',
      // referenceNo: '',
    }
    const { data, errorMessage, validationToken, validationType } = await api.otp.resend({ params })

    // do something
  }
```
| Prop            | Default   | Type     | Description                             |
|-----------------|-----------|----------|-----------------------------------------|
| data            | undefined | `{...}`  | -                                       |
| errorMessage    | -         | `string` | Error message                           |
| validationToken | undefined | `string` | Token to be used for next transaction   |
| validationType  | -         | `string` | 'showOTP' / 'show3D' / 'showMpin'       |
| url3D           | undefined | `string` | URL information for 3D verification     |

## Payment

`purchase` - Purchase

```jsx 
  import { api } from '@kerim-keskin/react-masterpass'

  const asyncFunction = async () => {
    const params = {
      orderNo: '', // required
      cvc: '', // required
      installmentCount: 0, // required
      token: '', // required
      msisdn: '', // required
      listAccountName: '', // required - account alias name
      amount: '', // required - 

      // optional params

      // userId: '',
      // aav: 'aav',
      // referenceNo: '',
      // sendSmsMerchant: 'Y',
      // sendSms: 'Y',
      // encCPin: '0',
      // rewardValue: '',
      // rewardName: '',
      // paymentType: '',
      // macroMerchantId: '',
      // moneyCardInvoiceAmount: null,
      // moneyCardMigrosDiscountAmount: null,
      // moneyCardPaymentAmount: null,
      // moneyCardExtraDiscountAmount: null,
      // moneyCardProductBasedDiscountAmount: null,
      // password: '',
      // encPassword: '',
      // fp: '',
    }

    const { data, errorMessage, validationToken, validationType } = await api.payment.purchase({ params })

    // do something
  }
```
| Prop            | Default   | Type     | Description                             |
|-----------------|-----------|----------|-----------------------------------------|
| data            | undefined | `{...}`  | -                                       |
| errorMessage    | -         | `string` | Error message                           |
| validationToken | undefined | `string` | Token to be used for next transaction   |
| validationType  | -         | `string` | 'showOTP' / 'show3D' / 'showMpin'       |
| url3D           | undefined | `string` | URL information for 3D verification     |
 
`purchaseAndRegister` - Purchase and register card

```jsx 
  import { api } from '@kerim-keskin/react-masterpass'

  const asyncFunction = async () => {
    const params = {
      token: '', // required
      msisdn: '', // required
      accountAliasName: '', // required
      rtaPan: '', // required
      expiryDate: '', // required
      cvc: '', // required
      amount: '', // required

      // optional params

      // cardHolderName: '',
      // orderNo: '',
      // installmentCount: 0,
      // rewardName: '',
      // rewardValue: '',
      // firstName: '',
      // lastName: '',
      // gender: '',
      // paymentType: '',
      // merchantId: '',
      // macroMerchantId: '',
      // actionType: 'A',
      // moneyCardInvoiceAmount: null,
      // moneyCardMigrosDiscountAmount: null,
      // moneyCardPaymentAmount: null,
      // moneyCardExtraDiscountAmount: null,
      // moneyCardProductBasedDiscountAmount: null,
      // sendSms: 'Y',
      // fp: '',
      // referenceNo: '',
    }

    const { data, errorMessage, validationToken, validationType } = await api.payment.purchaseAndRegister({ params })

    // do something
  }
```
| Prop            | Default   | Type     | Description                             |
|-----------------|-----------|----------|-----------------------------------------|
| data            | undefined | `{...}`  | -                                       |
| errorMessage    | -         | `string` | Error message                           |
| validationToken | undefined | `string` | Token to be used for next transaction   |
| validationType  | -         | `string` | 'showOTP' / 'show3D' / 'showMpin'       |
| url3D           | undefined | `string` | URL information for 3D verification     |
 
# MIT License

Copyright (c) 2022 kerimkeskin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.