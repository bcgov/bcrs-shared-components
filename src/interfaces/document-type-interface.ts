// Scanning properties
export interface ScanningDetailIF {
    scanDateTime: string
    accessionNumber: string
    batchId: string
    pageCount: number
    author: string
}

export interface DocumentRequestIF {
    documentServiceId?: string
    consumerDocumentId?: string
    documentClass?: string
    documentType?: string
    description?: string
    consumerIdentifier?: string
    consumerFilingDate?: string
    consumerFilename?: string
    consumerReferenceId?: string
    documentURL?: string
}
