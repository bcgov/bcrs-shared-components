import axios from 'axios'

/**
 * 'Sleeps' for specified timeout. Must be called from async method.
 * @param ms Delay to sleep, in milliseconds.
 * @returns A promise to await upon.
 */
export function sleep (ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getAxiosInstance () {
  const instance = axios.create()

  return instance
}
