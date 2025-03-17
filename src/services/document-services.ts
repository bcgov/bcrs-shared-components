import { AxiosResponse } from 'axios'
import { SessionStorageKeys } from '@bcrs-shared-components/enums/sbc-common-components-constants'
import ConfigHelper from './utils/config-helper'
import { axiosInstance } from './utils'

export default class DocumentService {
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
    document: File,
    documentClass: string,
    documentType: string,
    businessId: string,
    consumerDocumentId: string = undefined,
    consumerFilingDate: string = new Date().toISOString()
  ): Promise<AxiosResponse> {
    // Set request params.
    let url = `${ConfigHelper.getFromSession('DOC_API_URL')}/documents/${documentClass}/${documentType}`
    url += `?consumerFilingDate=${consumerFilingDate}&consumerFilename=${document.name}`
    url += `&consumerIdentifier=${businessId}`
    if (consumerDocumentId) {
      url += `&consumerDocumentId=${consumerDocumentId}`
    }

    return axiosInstance
      .post(url, document, {
        headers: {
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
    document: File,
    documentServiceId: string,
    documentName: string
  ) {
    let url = `${ConfigHelper.getFromSession('DOC_API_URL')}/documents/${documentServiceId}`
    url += `?consumerFilename=${documentName}`

    return axiosInstance
      .put(url, document, {
        headers: {
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
  static async deleteDocumentFromDRS (documentServiceId: string): Promise<AxiosResponse> {
    // safety checks
    if (!documentServiceId) {
      throw new Error('Invalid parameters')
    }
    const url = `${ConfigHelper.getFromSession('DOC_API_URL')}/documents/${documentServiceId}`

    return axiosInstance.patch(url, { removed: true })
  }

  /**
   * Download the specified file from Document Record Service.
   * @param documentKey the unique id on Document Record Service
   * @param documentClass the document class defined for the document service. e.g. 'CORP'
   * @param documentName the document name to download
   * @returns void
   */
  static async downloadDocumentFromDRS (
    documentKey: string,
    documentName: string,
    documentClass: string
  ): Promise<void> {
    // safety checks
    if (!documentKey || !documentName) {
      throw new Error('Invalid parameters')
    }

    const url = `${ConfigHelper.getFromSession('DOC_API_URL')}/searches/${documentClass}?documentServiceId=${documentKey}`

    axiosInstance.get(url).then((response) => {
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
