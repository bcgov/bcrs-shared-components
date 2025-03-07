import MockAdapter from 'axios-mock-adapter'
import documentService from '@/services/document-services'
import { DOCUMENT_TYPES } from '@/enums'
import { SessionStorageKeys } from '@/enums/sbc-common-components-constants'
import { AxiosInstance as axiosInstance } from 'tests/utils'

describe('documentService', () => {
  const mock = new MockAdapter(axiosInstance)
  const docApiUrl = 'https://api.example.com/doc/api/v1'
  const docApiKey = 'test-doc-api-key'
  const accountId = '1010'
  const documentClass = DOCUMENT_TYPES.contInAuthorization.class
  const documentType = DOCUMENT_TYPES.contInAuthorization.type
  const consumerIdentifier = 'T0aAaaAAAA'
  const consumerFilingDate = '2025-03-06T22:06:53.870Z'
  const documentName = 'cont.in.authorization.pdf'
  const documentServiceId = 'DS0000000001'
  const documentURL = 'https://api.googlestorage.com/some/drs/api?some-file-name-with-id.pdf'

  sessionStorage.setItem(SessionStorageKeys.DocApiUrl, docApiUrl)
  sessionStorage.setItem(SessionStorageKeys.DocApiKey, docApiKey)
  sessionStorage.setItem(SessionStorageKeys.CurrentAccount, JSON.stringify({ id: accountId }))

  beforeEach(() => {
    mock.reset()
  })

  it('should upload a file successfully', async () => {
    const file = new File(['test-content'], documentName, { type: 'application/pdf' })

    let url = `${docApiUrl}/documents/${documentClass}/${documentType}`
    url += `?consumerFilingDate=${consumerFilingDate}&consumerFilename=${file.name}`
    url += `&consumerIdentifier=${consumerIdentifier}`

    mock
      .onPost(url, file, {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/pdf',
        'x-apikey': docApiKey,
        'Account-Id': accountId
      })
      .reply(201, {
        consumerIdentifier: consumerIdentifier,
        documentType: documentType
      })

    const response = await documentService.uploadDocumentToDRS(
      axiosInstance,
      file,
      documentClass,
      documentType,
      consumerIdentifier,
      null,
      consumerFilingDate
    )

    expect(response.status).toEqual(201)
    expect(response.data).toHaveProperty('consumerIdentifier', consumerIdentifier)
    expect(response.data).toHaveProperty('documentType', documentType)
    expect(mock.history.post.length).toBe(1)
    expect(mock.history.post[0].headers).toMatchObject({
      'x-apikey': docApiKey,
      'Account-Id': accountId
    })
  })

  it('should update DRS record successfully', async () => {
    const file = new File(['test-content'], documentName, { type: 'application/pdf' })

    let url = `${docApiUrl}/documents/${documentServiceId}`
    url += `?consumerFilename=${documentName}`

    mock
      .onPut(url, file, {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/pdf',
        'x-apikey': docApiKey,
        'Account-Id': accountId
      })
      .reply(200, {
        consumerIdentifier: consumerIdentifier,
        documentType: documentType
      })

    const response = await documentService.updateDocumentOnDRS(axiosInstance, file, documentServiceId, documentName)

    expect(response.status).toEqual(200)
    expect(response.data).toHaveProperty('consumerIdentifier', consumerIdentifier)
    expect(mock.history.put.length).toBe(1)
    expect(mock.history.put[0].headers).toMatchObject({
      'x-apikey': docApiKey,
      'Account-Id': accountId
    })
  })

  it('should delete a document successfully', async () => {
    const url = `${docApiUrl}/documents/${documentServiceId}`

    mock.onPatch(url, { removed: true }).reply(200, {})

    const response = await documentService.deleteDocumentFromDRS(axiosInstance, documentServiceId)

    expect(response.status).toBe(200)
    expect(mock.history.patch.length).toBe(1)
    expect(mock.history.patch[0].url).toBe(url)
  })

  it('should download a document successfully', async () => {
    const url = `${docApiUrl}/searches/${documentClass}?documentServiceId=${documentServiceId}`

    mock.onGet(url).reply(200, [{ documentURL: documentURL }])

    await documentService.downloadDocumentFromDRS(axiosInstance, documentServiceId, documentName, documentClass)

    expect(mock.history.get.length).toBe(1)
    expect(mock.history.get[0].url).toBe(url)
  })
})
