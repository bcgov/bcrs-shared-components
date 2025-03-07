import axios from 'axios'

const instance = axios.create()

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)

/**
 * 'Sleeps' for specified timeout. Must be called from async method.
 * @param ms Delay to sleep, in milliseconds.
 * @returns A promise to await upon.
 */
export function sleep (ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export { instance as AxiosInstance }
