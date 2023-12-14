import { describe, expect, vi } from 'vitest'
import axios from 'axios'
import FeeServices from '../../src/services/fee-services'

vi.mock('axios')

const API_URL = 'https://pay-api-dev.pathfinder.gov.bc.ca/api/v1/'

describe('axios call with 1 fee item', () => {
  const results = []
  const mockAxiosSpreadResult = vi.fn()
  const filingCodes = [{
    filingDescription: 'Annual Filing',
    filingTypeCode: 'OTANN',
    waiveFees: false,
    entityType: 'CP',
    priority: false,
    futureEffective: false }]

  beforeAll(() => {
    vi.mocked(axios.get).mockClear()
    vi.mocked(axios.all).mockResolvedValue(results)
    vi.mocked(axios.spread).mockReturnValue(mockAxiosSpreadResult)
    FeeServices.getFee(filingCodes, API_URL)
  })
  it('calls axios.get once for one Fee ', async () => {
    expect(axios.get)
      .toHaveBeenCalledWith(`${API_URL}fees/CP/OTANN`,
        { 'headers': { 'Account-Id': 0, 'Authorization': 'Bearer null' } })
  })
})

describe('axios call with 2 fee item', () => {
  const results = []
  const mockAxiosSpreadResult = vi.fn()
  const filingCodes = [
    { filingDescription: 'Annual Filing',
      filingTypeCode: 'OTANN',
      entityType: 'CP',
      waiveFees: false,
      priority: false,
      futureEffective: false },
    { filingDescription: 'Director Change',
      filingTypeCode: 'OTADD',
      entityType: 'CP',
      waiveFees: false,
      priority: false,
      futureEffective: false }
  ]
  beforeAll(() => {
    vi.mocked(axios.get).mockClear()
    vi.mocked(axios.all).mockResolvedValue(results)
    vi.mocked(axios.spread).mockReturnValue(mockAxiosSpreadResult)
    FeeServices.getFee(filingCodes, API_URL)
  })

  it('calls axios.get once for each filing code', () => {
    expect(axios.get)
      .toHaveBeenCalledWith(`${API_URL}fees/CP/OTANN`,
        { 'headers': { 'Account-Id': 0, 'Authorization': 'Bearer null' } })
    expect(axios.get)
      .toHaveBeenCalledWith(`${API_URL}fees/CP/OTADD`,
        { 'headers': { 'Account-Id': 0, 'Authorization': 'Bearer null' } })
  })
})

describe('axios call with 1 fee in the list with extra fees', () => {
  const results = []
  const mockAxiosSpreadResult = vi.fn()
  const filingCodes = [{ filingTypeCode: 'BCRSF',
    waiveFees: false,
    entityType: 'BC',
    priority: true,
    futureEffective: true }]
  beforeAll(() => {
    vi.mocked(axios.get).mockClear()
    vi.mocked(axios.all).mockResolvedValue(results)
    vi.mocked(axios.spread).mockReturnValue(mockAxiosSpreadResult)
    FeeServices.getFee(filingCodes, API_URL)
  })

  it('calls axios.get once with extra fee parameters ', () => {
    expect(axios.get)
      .toHaveBeenCalledWith(`${API_URL}fees/BC/BCRSF?priority=true&futureEffective=true`,
        { 'headers': { 'Account-Id': 0, 'Authorization': 'Bearer null' } })
  })
})
