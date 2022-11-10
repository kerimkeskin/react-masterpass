import React, { createContext, useContext } from 'react'
import { IConfig } from '../interfaces/config'
import { masterpassService } from '../services/request'

type TProps = {
  children: React.ReactNode
  config: IConfig
}

const initialState = {
  serviceUrl: '',
  clientId: '',
  version: '',
  clientType: '',
  sendSmsLanguage: '',
  referenceNo: '',
  clientIp: '',
  dateTime: '',
}

const MasterpassContext = createContext(initialState)

const MasterpassProvider: React.FC<TProps> = ({ children, config }) => {
  if (!config) {
    throw new Error('Config is required')
  }

  masterpassService.interceptors.request.use(
    (axiosConfig) => {
      axiosConfig.baseURL = config.serviceUrl
      axiosConfig.data = {
        ...axiosConfig.data,
        ...config,
      }

      return axiosConfig
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  return <MasterpassContext.Provider value={config}>{children}</MasterpassContext.Provider>
}

const useMasterpass = () => {
  const context = useContext(MasterpassContext)

  return context
}

export { MasterpassProvider, MasterpassContext }
export default useMasterpass
