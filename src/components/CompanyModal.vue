<template>
  <div v-if="modelValue" class="company-modal">
    <div class="modal-backdrop" @click.self="close"></div>

    <div class="modal-dialog" @click.stop>
      <div class="modal-card">
        <!-- Header -->
        <header class="modal-header">
          <div>
            <h4 class="modal-title">{{ isEdit ? 'Editar Empresa' : 'Crear Nueva Empresa' }}</h4>
            <p class="modal-sub">Ingresa los datos de la nueva empresa o sucursal</p>
          </div>
          <button class="close-x" @click="close">✕</button>
        </header>

        <!-- Body -->
        <form @submit.prevent="onSave" class="modal-body">
          <div class="row gx-2">
            <!-- Fila 1: Nombre | NIT -->
            <div class="col-6">
              <label class="lbl">Nombre</label>
              <input v-model="businessName" class="field" placeholder="Nombre de la empresa" required />
            </div>

            <div class="col-6">
              <label class="lbl">NIT</label>
              <input v-model="nit" class="field" placeholder="900.123.456-7" required />
            </div>

            <!-- Fila 2: Tipo de empresa | Régimen tributario -->
            <div class="col-6">
              <label class="lbl">Tipo de empresa</label>
              <select v-model="companyType" class="field">
                <option value="Privada">Privada</option>
                <option value="Pública">Pública</option>
              </select>
            </div>

            <div class="col-6">
              <label class="lbl">Régimen tributario</label>
              <select v-model="taxRegime" class="field">
                <option value="Responsable IVA">Responsable IVA</option>
                <option value="Simplificado">Simplificado</option>
              </select>
            </div>

            <!-- Fila 3: País | Ciudad -->
            <div class="col-6">
              <label class="lbl">País</label>
              <input v-model="country" class="field" placeholder="Colombia" required />
            </div>

            <div class="col-6">
              <label class="lbl">Ciudad</label>
              <input v-model="city" class="field" placeholder="Bogotá" required />
            </div>

            <!-- Fila 4: Moneda | Zona horaria -->
            <div class="col-6">
              <label class="lbl">Moneda</label>
              <select v-model="currency" class="field">
                <option value="COP">COP</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <div class="col-6">
              <label class="lbl">Zona horaria</label>
              <select v-model="timezone" class="field">
                <option value="America/Bogota">America/Bogota</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/Madrid">Europe/Madrid</option>
                <option value="Asia/Tokyo">Asia/Tokyo</option>
              </select>
            </div>
          </div>

          <!-- Footer -->
          <div class="modal-footer">
            <button type="button" class="btn-cancel" @click="close">Cancelar</button>
            <button type="submit" class="btn-primary">{{ isEdit ? 'Guardar cambios' : 'Crear Empresa' }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'

const props = defineProps<{
    modelValue: boolean
    company?: {
        businessName?: string
        nit?: string
        companyType?: string
        taxRegime?: string
        country?: string
        city?: string
        currency?: string
        timezone?: string
    }
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'save', payload: any): void
}>()

// Campos que el backend espera
const businessName = ref('')
const nit = ref('')
const companyType = ref('Privada')
const taxRegime = ref('Responsable IVA')
const country = ref('Colombia')
const city = ref('')
const currency = ref('COP')
const timezone = ref('America/Bogota')

// Si es edición, llenar campos
watch(
    () => props.company,
    (c) => {
        businessName.value = c?.businessName ?? ''
        nit.value = c?.nit ?? ''
        companyType.value = c?.companyType ?? 'Privada'
        taxRegime.value = c?.taxRegime ?? 'Responsable IVA'
        country.value = c?.country ?? 'Colombia'
        city.value = c?.city ?? ''
        currency.value = c?.currency ?? 'COP'
        timezone.value = c?.timezone ?? 'America/Bogota'
    },
    { immediate: true }
)

const isEdit = computed(() => !!props.company)

function close() {
    emit('update:modelValue', false)
}

function onSave() {
    if (!businessName.value || !nit.value || !city.value) return

    const payload = {
      id: (props.company as any)?.id ?? undefined,
      businessName: businessName.value,
      nit: nit.value,
      companyType: companyType.value,
      taxRegime: taxRegime.value,
      country: country.value,
      city: city.value,
      currency: currency.value,
      timezone: timezone.value
    }

    emit('save', payload)
}
</script>


<style scoped>
.company-modal {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
}

.modal-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(2, 6, 23, 0.7);
    z-index: 1000;
    /* debajo del modal */
    pointer-events: auto;
}

.modal-dialog {
    position: relative;
    width: 680px;
    max-width: calc(100% - 32px);
    z-index: 1100;
    pointer-events: auto;
}

.modal-card {
    position: relative;
    background: #0f2130;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 10px 30px rgba(2, 6, 23, 0.7);
    color: #e6eef6;
    z-index: 1200;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    gap: 16px;
}

.modal-title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
}

.modal-sub {
    margin: 0;
    font-size: 13px;
    color: #98a4b3;
}

.close-x {
    background: transparent;
    border: none;
    font-size: 16px;
    color: #cfe7ff;
    cursor: pointer;
}

.modal-body {
    margin-top: 14px;
}

.lbl {
    display: block;
    font-size: 13px;
    color: #9fb0c5;
    margin-bottom: 6px;
}

.field {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.04);
    background: #07121a;
    color: #e6eef6;
}

.field::placeholder {
    color: #6f8295;
}

.field:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(35, 130, 255, 0.12);
    border-color: #1e90ff;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 20px;
}

.btn-cancel {
    background: #08121a;
    color: #e6eef6;
    border: 1px solid rgba(255, 255, 255, 0.04);
    padding: 8px 14px;
    border-radius: 8px;
    cursor: pointer;
}

.btn-primary {
    background: linear-gradient(180deg, #2b86ff, #1f6fe6);
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
}
</style>
