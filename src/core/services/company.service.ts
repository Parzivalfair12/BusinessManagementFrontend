import api from '../http/axios'
export interface CreateCompanyDTO {
  businessName: string
  nit: string
  companyType: string
  taxRegime: string
  country: string
  city: string
  currency: string
  timezone: string
  status?: 'ACTIVE' | 'SUSPENDED'
}

export const CompanyService = {
  getAll() {
    return api.get('/company')
  },

  create(data: CreateCompanyDTO) {
    return api.post('/company', data)
  }
  ,
  update(id: string, data: Partial<CreateCompanyDTO>) {
    return api.put(`/company/${id}`, data)
  },

  remove(id: string) {
    return api.delete(`/company/${id}`)
  }
}
