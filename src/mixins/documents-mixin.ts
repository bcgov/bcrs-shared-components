import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Axios, {AxiosResponse} from 'axios'
import { SessionStorageKeys } from '@/enums/sbc-common-components-constants'
import { DocRequestConfigIF } from '@/interfaces'


/**
 * Mixin that provides some useful DRS utilities.
 */
@Component({})
export default class DocumentsMixin extends Vue {
    
    /**
   * Uploads the specified file to Document Record Service.
   * @param file the file to upload
   * @param documentClass the document class defined for the document service. e.g. 'CORP'
   * @param documentType the type of document. e.g. 'CNTA'
   * @param businessId the business identifier(tempId or businessId)
   * @param consumerDocumentId the identifier of one or more documents associated with the filing.
   * @returns a promise to return the axios response or the error response
   */
    async uploadDocumentToDRS (
        document: File,
        documentClass: string,
        documentType: string,
        businessId: string,
        consumerDocumentId: string = undefined
      ): Promise<AxiosResponse> {
        const consumerFilingDate = new Date().toISOString()
        const requestConfig: DocRequestConfigIF = {
          url: sessionStorage.getItem(SessionStorageKeys.DocApiUrl),
          headers: {
              'x-apikey': sessionStorage.getItem(SessionStorageKeys.DocApiKey),
              'Account-Id': JSON.parse(sessionStorage.getItem(SessionStorageKeys.CurrentAccount) || '{}').id || 0,
          }
      }
      
        // Set request params.
        let url = `${requestConfig.url}/documents/${documentClass}/${documentType}`
        url += `?consumerFilingDate=${consumerFilingDate}&consumerFilename=${document.name}`
        url += `&consumerIdentifier=${businessId}`
        if (consumerDocumentId) {
          url += `&consumerDocumentId=${consumerDocumentId}`
        }
    
        return Axios.post(url, document, { 
            headers: {
                ...requestConfig.headers,
                'Content-Type': 'application/pdf'
            } })
          .then(response => {
            return response
          }).catch(error => {
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
      async updateDocumentOnDRS (
        document: File,
        documentServiceId: string,
        documentName: string
      ) {const requestConfig: DocRequestConfigIF = {
        url: sessionStorage.getItem(SessionStorageKeys.DocApiUrl),
        headers: {
            'x-apikey': sessionStorage.getItem(SessionStorageKeys.DocApiKey),
            'Account-Id': JSON.parse(sessionStorage.getItem(SessionStorageKeys.CurrentAccount) || '{}').id || 0,
        }
    }
    
        let url = `${requestConfig.url}/documents/${documentServiceId}`
        url += `?consumerFilename=${documentName}`
    
        return Axios.put(url, document, { 
            headers: {
                ...requestConfig.headers,
                'Content-Type': 'application/pdf'
            } })
          .then(response => {
            return response
          }).catch(error => {
            return error.response
          })
      }
    
      /**
       * Deletes a document from Document Record Service.
       * @param documentServiceId the unique identifier of document on Document Record Service
       * @returns a promise to return the axios response or the error response
       */
      async deleteDocumentFromDRS (documentServiceId: string): Promise<AxiosResponse> {
        // safety checks
        if (!documentServiceId) {
          throw new Error('Invalid parameters')
        }
        const requestConfig: DocRequestConfigIF = {
          url: sessionStorage.getItem(SessionStorageKeys.DocApiUrl),
          headers: {
              'x-apikey': sessionStorage.getItem(SessionStorageKeys.DocApiKey),
              'Account-Id': JSON.parse(sessionStorage.getItem(SessionStorageKeys.CurrentAccount) || '{}').id || 0,
          }
      }
      
        const url = `${requestConfig.url}/documents/${documentServiceId}`
    
        return Axios.patch(
          url, 
          {removed: true},
          {headers: requestConfig.headers})
      }
}
