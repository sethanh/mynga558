import axios from 'axios'
import qs from 'qs'
import { getOAuthToken } from '@src/core'

export const Host = 'https://icf-api.volcanly.me'
export const BaseURL = `${Host}/api/v1/` // Develop
const instance = axios.create({ timeout: 10000, baseURL: BaseURL })

instance.interceptors.response.use(
  config => {
    return Promise.resolve(config)
  },
  async error => {
    // const {response} = error || {}
    // const {status} = response || {}

    return new Promise((_resolve, reject) => {
      reject(error)
    })
  },
)

const handleError = (error: any) => {
  if (error.response) {
    const { data } = error.response || {}
    const { errors, success } = data

    if (!success && errors && errors.length > 0) {
      const { message, code } = errors[0]
      const { message: messageError } = message || {}

      return { message: messageError, code, success }
    }

    return data
  }
  return error
}

const preprocessResponse = (result: any) => {
  const { success, errors } = result || {}
  if (success) {
    return result
  }

  if (errors && errors.length > 0) {
    return { ...errors[0], success }
  }
  return result
}

export class ApiService {
  static async getHeader() {
    const oAuth = await getOAuthToken()
    const { accessToken }: any = oAuth || {}
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    }
  }

  static async get(url: string, data?: any) {
    const header = await this.getHeader()
    return instance
      .get(url, {
        headers: header,
        data,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        },
      })
      .then(result => {
        return result.data
      })
      .then(result => {
        return preprocessResponse(result)
      })
      .catch(e => {
        throw handleError(e)
      })
  }

  static async post(url: string, data?: any) {
    return instance({
      method: 'post',
      url,
      headers: await this.getHeader(),
      data,
    })
      .then(result => {
        return result.data
      })
      .then(result => {
        return preprocessResponse(result)
      })
      .catch(e => {
        throw handleError(e)
      })
  }

  static async put(url: string, data?: any) {
    return instance({
      method: 'put',
      url,
      headers: await this.getHeader(),
      data,
    })
      .then(result => {
        return result.data
      })
      .then(result => {
        return preprocessResponse(result)
      })
      .catch(e => {
        throw handleError(e)
      })
  }

  static async delete(url: string, data?: any) {
    return instance({
      method: 'delete',
      url,
      headers: await this.getHeader(),
      data,
    })
      .then(result => {
        return result.data
      })
      .then(result => {
        return preprocessResponse(result)
      })
      .catch(e => {
        throw handleError(e)
      })
  }
}
