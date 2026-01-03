<template>
    <div class="dashboard companies d-flex">
        <!-- Sidebar -->
        <NavBar />

        <!-- Main -->
        <main class="flex-fill p-4">
            <!-- Header -->
            <div class="d-flex justify-content-between align-items-start mb-4">
                <div>
                    <h1 class="h4 mb-1">Empresas</h1>
                    <div class="subtitle">
                        Gestión de empresas y sucursales del sistema
                    </div>
                </div>

                <button class="btn btn-primary btn-sm" @click="openNew">
                    + Nueva Empresa
                </button>
            </div>

            <!-- Stats -->
            <div class="row g-3 mb-4 stats-row">
                <div class="col-md-4">
                    <div class="stat-card p-3">
                        <div class="stat-label">Total Empresas</div>
                        <div class="stat-value">{{ companies.length }}</div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="stat-card p-3">
                        <div class="stat-label">Activas</div>
                        <div class="stat-value text-success">{{ activeCount }}</div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="stat-card p-3">
                        <div class="stat-label">Suspendidas</div>
                        <div class="stat-value">{{ inactiveCount }}</div>
                    </div>
                </div>
            </div>

            <!-- Table -->
            <div class="card p-3 table-card">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0">Lista de Empresas</h5>

                    <input v-model="query" placeholder="Buscar empresa..."
                        class="form-control form-control-sm search-input" />
                </div>

                <div class="table-responsive">
                    <table class="table table-borderless mb-0 align-middle text-white-50">
                        <thead>
                            <tr>
                                <th>Empresa</th>
                                <th>NIT</th>
                                <th>Tipo empresa</th>
                                <th>Ciudad</th>
                                <th>Estado</th>
                                <th class="text-end">Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="c in filteredCompanies" :key="c.id">
                                <td>
                                    <div class="fw-semibold">{{ c.businessName }}</div>
                                </td>

                                <td>{{ c.nit }}</td>

                                <td>{{ c.companyType }}</td>

                                <td>{{ c.city }}</td>

                                <td>
                                    <span class="badge" :class="c.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'">
                                        {{ c.status === 'ACTIVE' ? 'Activa' : 'Suspendida' }}
                                    </span>
                                </td>

                                <td class="text-end">
                                    <button class="btn btn-sm btn-link text-decoration-none me-2 btn-edit"
                                        @click="editCompany(c)" :title="`Editar ${c.businessName}`">
                                        <i class="bi bi-pencil-fill" aria-hidden="true"></i>
                                    </button>

                                    <button class="btn btn-sm btn-link text-danger btn-delete" @click="deleteCompany(c)"
                                        :title="`Eliminar ${c.businessName}`">
                                        <i class="bi bi-trash-fill" aria-hidden="true"></i>
                                    </button>
                                </td>
                            </tr>

                            <tr v-if="!companyStore.loading && filteredCompanies.length === 0">
                                <td colspan="6" class="text-center text-muted py-4">
                                    No hay empresas registradas
                                </td>
                            </tr>

                            <tr v-if="companyStore.loading">
                                <td colspan="6" class="text-center py-4">
                                    Cargando empresas...
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <CompanyModal :modelValue="showModal" :company="editing" @update:modelValue="val => showModal = val"
                @save="handleSave" />
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCompanyStore } from '../../stores/company.store'
import NavBar from '../../components/NavBar.vue'
import CompanyModal from '../../components/CompanyModal.vue'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../../styles/companies.css'
import Swal from 'sweetalert2'


const companyStore = useCompanyStore()

const query = ref('')
const showModal = ref(false)
const editing = ref(null as any)

// cargar empresas
onMounted(() => {
    companyStore.fetchCompanies()
})

// estado reactivo
const companies = computed(() => companyStore.companies)

const filteredCompanies = computed(() =>
    companies.value.filter(c =>
        (c.businessName ?? '')
            .toLowerCase()
            .includes(query.value.toLowerCase())
    )
)

const activeCount = computed(() =>
    companies.value.filter(c => c.status === 'ACTIVE').length
)

const inactiveCount = computed(() =>
    companies.value.filter(c => c.status === 'SUSPENDED').length
)

// abrir modal para crear
function openNew() {
    editing.value = null
    showModal.value = true
}
// manejar guardado desde el modal
async function handleSave(payload: any) {

    if (payload.id) {
        console.log('companyStore', companyStore)
        console.log('updateCompany', companyStore.updateCompany)

        await companyStore.updateCompany(payload.id, payload)
    } else {
        const { id, ...createPayload } = payload
        await companyStore.createCompany(createPayload)
    }
    showModal.value = false
}

function editCompany(c: any) {
    editing.value = { ...c }
    showModal.value = true
}

async function deleteCompany(c: any) {
  const result = await Swal.fire({
    title: `¿Eliminar ${c.businessName}?`,
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',

    // Paleta de colores personalizada
    background: '#0f2130',      // fondo modal
    color: '#e6eef6',           // color del texto
    iconColor: '#e63946',       // icono de advertencia
    confirmButtonColor: '#e63946', // 🔴 botón confirmar rojo
    cancelButtonColor: '#08121a',  // fondo oscuro cancelar

    customClass: {
      popup: 'swal2-popup-custom',
      title: 'swal2-title-custom',
      htmlContainer: 'swal2-content-custom',
      confirmButton: 'swal2-confirm-custom',
      cancelButton: 'swal2-cancel-custom'
    }
  })

  if (!result.isConfirmed) return

  try {
    await companyStore.deleteCompany(c.id)
    Swal.fire({
      icon: 'success',
      title: 'Eliminado',
      text: `${c.businessName} ha sido eliminado`,
      background: '#0f2130',
      color: '#e6eef6',
      timer: 1500,
      showConfirmButton: false,
      timerProgressBar: true
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo eliminar la empresa',
      background: '#0f2130',
      color: '#e6eef6',
      confirmButtonColor: '#e63946'
    })
  }
}
</script>
