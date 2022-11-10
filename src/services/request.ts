import { handleError } from './errors'
import axios from 'axios'

const masterpassService = axios.create({})

class request {
  static async get(url = '', headers = {}) {
    try {
      const { data } = await masterpassService.get(url, { headers })
      return data
    } catch (error) {
      return handleError(error)
    }
  }

  static async post(url = '', body: any, headers = {}) {
    try {
      const { data } = await masterpassService.post(url, body, { headers })
      return data
    } catch (error) {
      return handleError(error)
    }
  }
}

export { masterpassService }

export default request
