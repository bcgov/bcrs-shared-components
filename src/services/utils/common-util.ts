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
 * Gets the document class for a given legal type.
 * Defaults to 'CORP' if not found.
 *
 * @param legalType - Business legal type (e.g., 'CP', 'SP').
 * @returns Document class (e.g., 'COOP', 'FIRM', 'CORP').
 */
export function getDocumentClass (legalType: string): string {
  const documentClass = DOCUMENT_CLASSES[legalType] || ''
  return documentClass || DocumentClasses.CORP
}

/**
 * Resolves the document type based on filing type and legal type.
 * Falls back to 'systemIsTheRecord' if no match is found.
 *
 * @param filingType - Filing type (e.g., 'annualReport', 'correction').
 * @param legalType - Legal entity type (e.g., 'BC', 'ULC').
 * @returns Document type string.
 */
export function getDocumentType (filingType: string, legalType: string): string {
  const documentType = DOCUMENT_TYPES[filingType]

  if (typeof documentType === 'string') {
    return documentType || DOCUMENT_TYPES.systemIsTheRecord
  } else if (typeof documentType === 'object' && documentType !== null) {
    const documentClass = getDocumentClass(legalType)
    const docType = documentType[documentClass] || ''
    return docType || DOCUMENT_TYPES.systemIsTheRecord
  }

  return DOCUMENT_TYPES.systemIsTheRecord
}
