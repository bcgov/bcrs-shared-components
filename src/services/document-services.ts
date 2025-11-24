import { AxiosResponse } from 'axios'
import { DocumentRequestIF } from '@bcrs-shared-components/interfaces'
import { ConfigHelper, axiosInstance, buildUrl } from './utils'

export default class DocumentService {
  /**
   * Uploads the specified document file to the Document Record Service (DRS).
   * @param document - The file to upload to DRS.
   * @param params - The document metadata including fields like documentClass, documentType, consumerIdentifier, etc.
   * @returns a promise to return the axios response or the error response
   */
  static async uploadDocumentToDRS (document: File, params: DocumentRequestIF): Promise<AxiosResponse> {
    const {
      documentClass,
      documentType,
      ...queryParams
    } = params
    // Set request params.

    const baseUrl = `${ConfigHelper.getFromSession('DOC_API_URL')}/documents/${documentClass}/${documentType}`
    const url = buildUrl(baseUrl, queryParams).toString()

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
   * @param document - the file to replace
   * @param params - The document metadata including fields like `documentClass`, `documentType`, etc.
   * @returns a promise to return the axios response or the error response
   */
  static async updateDocumentOnDRS (document: File, params: DocumentRequestIF) {
    const {
      documentServiceId,
      consumerFilingDate = new Date().toISOString(),
      ...queryParams
    } = params
    // Set request params.
    const baseUrl = `${ConfigHelper.getFromSession('DOC_API_URL')}/documents/${documentServiceId}`
    const url = buildUrl(baseUrl, queryParams).toString()

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
   * @param documentServiceId - the unique identifier of document on Document Record Service
   * @returns a promise to return the axios response or the error response
   */
  static async deleteDocumentFromDRS (documentServiceId: string): Promise<AxiosResponse> {
    // safety checks
    if (!documentServiceId) {
      throw new Error('Invalid parameters')
    }
    const url = `${ConfigHelper.getFromSession('DOC_API_URL')}/documents/${documentServiceId}`

    return axiosInstance.patch(url, { removed: true })
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  }

  /**
   * Download the specified file from Document Record Service.
   * @param documentKey - the unique id on Document Record Service
   * @param documentClass - the document class defined for the document service. e.g. 'CORP'
   * @param documentName - the document name to download
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

    const url =
      `${ConfigHelper.getFromSession('DOC_API_URL')}/searches/${documentClass}?documentServiceId=${documentKey}`

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

  /**
   * Searches for document records in DRS with the given parameters.
   *
   * @param params - Search parameters (e.g., documentClass, consumerDocumentId).
   * @returns Axios response or error response.
   */
  static async searchDocument (params: DocumentRequestIF): Promise<AxiosResponse> {
    const baseUrl = `${ConfigHelper.getFromSession('DOC_API_URL')}/searches`
    const url = buildUrl(baseUrl, params).toString()

    return axiosInstance
      .get(url)
      .then((response) => {
        return response
      })
      .catch((error) => {
        return error.response
      })
  }

  /**
   * Sends a POST request to the Document Record Service (DRS) without uploading a document.
   * Typically used to register a document metadata record without attaching a file.
   *
   * @param params - The document metadata including fields like `documentClass`, `documentType`, etc.
   * @returns A promise resolving to the Axios response or the error response.
   */
  static async postDocument (params: DocumentRequestIF): Promise<AxiosResponse> {
    const {
      documentClass,
      documentType,
      ...queryParams
    } = params

    const baseUrl = `${ConfigHelper.getFromSession('DOC_API_URL')}/documents/${documentClass}/${documentType}`
    const url = buildUrl(baseUrl, queryParams).toString()

    return axiosInstance
      .post(url, null, {
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
}
