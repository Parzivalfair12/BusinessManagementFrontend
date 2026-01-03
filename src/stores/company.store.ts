import { defineStore } from 'pinia'
import { CompanyService, type CreateCompanyDTO } from '../core/services/company.service'

type Company = {
  id: string
  businessName: string
  nit: string
  city: string
  companyType: string
  country: string
  currency: string
  timezone: string
  taxRegime: string
  status: 'ACTIVE' | 'SUSPENDED'
}

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companies: [] as Company[],
    loading: false
  }),

  actions: {
    async fetchCompanies() {
      this.loading = true
      try {
        const res = await CompanyService.getAll()
        this.companies = res.data
      } finally {
        this.loading = false
      }
    },

    async createCompany(data: CreateCompanyDTO) {
      const res = await CompanyService.create(data)
      this.companies.push(res.data)
    },

    async updateCompany(id: string, data: Partial<CreateCompanyDTO>) {
      console.log('Actualizar empresa en store', id, data)
      const res = await CompanyService.update(id, data)
      const idx = this.companies.findIndex(c => c.id === id)
      if (idx !== -1) this.companies.splice(idx, 1, res.data)
    },

    async deleteCompany(id: string) {
      await CompanyService.remove(id)
      this.companies = this.companies.filter(c => c.id !== id)
    }
  }
})
