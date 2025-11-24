import axios from 'axios'
import { SessionStorageKeys } from 'sbc-common-components/src/util/constants'
import ConfigHelper from './config-helper'

const instance = axios.create()

instance.interceptors.request.use(
  request => {
    request.headers['x-apikey'] = import.meta.env.VUE_APP_DOC_API_KEY
    request.headers['Account-Id'] =
      JSON.parse(ConfigHelper.getFromSession(SessionStorageKeys.CurrentAccount) || '{}')?.id || 0

    return request
  },
  error => Promise.reject(error)
)

export { instance as axiosInstance }
