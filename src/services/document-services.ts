import { AxiosInstance, AxiosResponse } from 'axios'
import { SessionStorageKeys } from '@bcrs-shared-components/enums/sbc-common-components-constants'
import ConfigHelper from './utils/config-helper'

export default class DocumentService {
  /**
   * Retrieves the configuration for making an API request to the Document Record service.
   * @returns an object containing the URL and headers for the DRS API request.
   */
  static requestConfig () {
    return {
      url: ConfigHelper.getFromSession('DOC_API_URL'),
      headers: {
        'x-apikey': ConfigHelper.getFromSession('DOC_API_KEY'),
        'Account-Id': JSON.parse(ConfigHelper.getFromSession(SessionStorageKeys.CurrentAccount) || '{}')?.id || 0
      }
    }
  }

  /**
   * Uploads the specified file to Document Record Service.
   * @param file the file to upload
   * @param documentClass the document class defined for the document service. e.g. 'CORP'
   * @param documentType the type of document. e.g. 'CNTA'
   * @param businessId the business identifier(tempId or businessId)
   * @param consumerDocumentId the identifier of one or more documents associated with the filing.
   * @returns a promise to return the axios response or the error response
   */
  static async uploadDocumentToDRS (
    axios: AxiosInstance,
    document: File,
    documentClass: string,
    documentType: string,
    businessId: string,
    consumerDocumentId: string = undefined,
    consumerFilingDate: string = new Date().toISOString()
  ): Promise<AxiosResponse> {
    // Set request params.
    let url = `${DocumentService.requestConfig().url}/documents/${documentClass}/${documentType}`
    url += `?consumerFilingDate=${consumerFilingDate}&consumerFilename=${document.name}`
    url += `&consumerIdentifier=${businessId}`
    if (consumerDocumentId) {
      url += `&consumerDocumentId=${consumerDocumentId}`
    }

    return axios
      .post(url, document, {
        headers: {
          ...DocumentService.requestConfig().headers,
          'Content-Type': 'application/pdf'
        }
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  }

  /**
   * Replace the existing document record specified by the document service ID.
   * @param documentServiceId the unique identifier of document on Document Record Service
   * @param file the file to replace
   * @param documentName the file name to replace
   * @returns a promise to return the axios response or the error response
   */
  static async updateDocumentOnDRS (
    axios: AxiosInstance,
    document: File,
    documentServiceId: string,
    documentName: string
  ) {
    let url = `${DocumentService.requestConfig().url}/documents/${documentServiceId}`
    url += `?consumerFilename=${documentName}`

    return axios
      .put(url, document, {
        headers: {
          ...DocumentService.requestConfig().headers,
          'Content-Type': 'application/pdf'
        }
      })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  }

  /**
   * Deletes a document from Document Record Service.
   * @param documentServiceId the unique identifier of document on Document Record Service
   * @returns a promise to return the axios response or the error response
   */
  static async deleteDocumentFromDRS (axios: AxiosInstance, documentServiceId: string): Promise<AxiosResponse> {
    // safety checks
    if (!documentServiceId) {
      throw new Error('Invalid parameters')
    }
    const url = `${DocumentService.requestConfig().url}/documents/${documentServiceId}`

    return axios.patch(url, { removed: true }, { headers: DocumentService.requestConfig().headers })
  }

  /**
   * Download the specified file from Document Record Service.
   * @param documentKey the unique id on Document Record Service
   * @param documentClass the document class defined for the document service. e.g. 'CORP'
   * @param documentName the document name to download
   * @returns void
   */
  static async downloadDocumentFromDRS (
    axios: AxiosInstance,
    documentKey: string,
    documentName: string,
    documentClass: string
  ): Promise<void> {
    // safety checks
    if (!documentKey || !documentName) {
      throw new Error('Invalid parameters')
    }

    const url = `${DocumentService.requestConfig().url}/searches/${documentClass}?documentServiceId=${documentKey}`

    axios.get(url, { headers: DocumentService.requestConfig().headers }).then((response) => {
      if (!response) {
        throw new Error('Null response')
      }

      const link = document.createElement('a')
      link.href = response.data[0].documentURL
      link.download = documentName
      link.target = '_blank' // This opens the link in a new browser tab

      // Append to the document and trigger the download
      document.body.appendChild(link)
      link.click()

      // Remove the link after the download is triggered
      document.body.removeChild(link)
    })
  }
}
