import ConfigHelper from './config-helper'
import { DocumentRequestIF } from '@bcrs-shared-components/interfaces'
import {
  SessionStorageKeys,
  ACCOUNT_ID,
  DOCUMENT_CLASSES,
  DOCUMENT_TYPES,
  DocumentClasses
} from '@bcrs-shared-components/enums'

/**
 * Place to put all the custom utility methods
 */
export function getBoolean (value: boolean | string | number): boolean {
  let resultVal = value
  if (typeof value === 'string') {
    resultVal = value.toLowerCase()
  }
  switch (resultVal) {
    case true:
    case 'true':
    case 1:
    case '1':
    case 'on':
    case 'yes':
    case 'none':
      return true
    default:
      return false
  }
}

export function decodeKCToken () {
  try {
    const token = ConfigHelper.getFromSession(SessionStorageKeys.KeyCloakToken)
    if (token) {
      const base64Url = token.split('.')[1]
      const base64 = decodeURIComponent(window.atob(base64Url).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
      return JSON.parse(base64)
    } else {
      return {}
    }
  } catch (error) {
    throw new Error('Error parsing JWT - ' + error)
  }
}

export function trimTrailingSlashURL (url) {
  return (url) ? url.trim().replace(/\/+$/, '') : ''
}

export function getAccountIdFromCurrentUrl () {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(ACCOUNT_ID) || false
}

export function checkAndAppend (url, key = '', value = '') {
  const separator = (/\?/).test(url) ? '&' : '?'
  // remove key from URL  if existing
  const newUrl = removeAccountIdFromUrl(url, key)
  return (value !== '' && key !== '') ? `${newUrl}${separator}${key}=${value}` : url
}

// if account id is not passed, will get it from session
// there are some cases we need to pass account id, ie  to watch account id and get URL dynamically
export function appendAccountId (url, accountId = '') {
  const sessionAccountId = JSON.parse(ConfigHelper.getFromSession(SessionStorageKeys.CurrentAccount) || '{}').id || ''
  const currentAccount = accountId !== '' ? accountId : sessionAccountId
  return checkAndAppend(url, ACCOUNT_ID, currentAccount)
}

export function removeAccountIdFromUrl (url, key = ACCOUNT_ID) {
  // replacing account id and formattig ie, removing extra ? or &
  return url?.replace(new RegExp(key + '=\\w+'), '').replace('?&', '?').replace(/\?$/, '')
    .replace('&&', '&').replace(/&$/, '')
}

/**
 * Appends query parameters to a base URL.
 *
 * @param baseUrl - The base URL.
 * @param params - Key-value pairs (string, number, or boolean) to add as query parameters.
 * @returns A URL object with the query parameters appended.
 */
export function buildUrl (baseUrl: string, params?: DocumentRequestIF): URL {
  const url = new URL(baseUrl)

  Object.entries(params ?? {}).forEach(([k, v]) => v && url.searchParams.append(k, String(v)))

  return url
}

/**
 * Resolves the document class and type for a given filing and legal type.
 * Defaults to 'CORP' for class and 'systemIsTheRecord' for type if not found.
 *
 * @param filingType - Filing type (e.g., 'annualReport', 'correction').
 * @param legalType - Business legal type (e.g., 'CP', 'SP', 'BC', 'ULC').
 * @returns An object containing `documentClass` and `documentType`.
 */
export function getDocumentInfo (filingType: string, legalType: string): {
  documentClass: string
  documentType: string
} {
  const documentClass = DOCUMENT_CLASSES[legalType] || DocumentClasses.CORP
  const documentTypeEntry = DOCUMENT_TYPES[filingType]

  let documentType: string = DOCUMENT_TYPES.systemIsTheRecord

  if (typeof documentTypeEntry === 'string') {
    documentType = documentTypeEntry || DOCUMENT_TYPES.systemIsTheRecord
  } else if (typeof documentTypeEntry === 'object' && documentTypeEntry !== null) {
    documentType = documentTypeEntry[documentClass] || DOCUMENT_TYPES.systemIsTheRecord
  }

  return { documentClass, documentType }
}
