<template>
    <aside class="navbar-root" role="navigation" aria-label="Main navigation">
        <div class="brand">
            <div class="logo">🏢</div>
            <div class="brand-text">
                <div class="name">SIGE</div>
                <div class="subtitle">Gestión empresarial integral</div>
            </div>
        </div>

        <!-- <nav class="menu" aria-label="Main menu">
            <button v-for="item in items" :key="item.key" :class="['item', { active: active === item.key }]"
                @click="select(item.key)">
                <span class="icon" v-html="item.icon"></span>
                <span class="label">{{ item.label }}</span>
            </button>
        </nav> -->

        <!-- Administración section -->
        <div class="admin-section">
            <button class="admin-header" @click="select('administracion')" :class="{ active: active === 'administracion' }">
                <span class="icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 2.3 16.88l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09c.7 0 1.26-.4 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 6.12 2.3l.06.06a1.65 1.65 0 0 0 1.82.33H8.5A1.65 1.65 0 0 0 9.5 2.3V2a2 2 0 1 1 4 0v.09c0 .7.4 1.26 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06A2 2 0 1 1 19.4 7.12l-.06.06a1.65 1.65 0 0 0-.33 1.82V9.5c.24.7.8 1.26 1.51 1.51H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <span class="label">Administración</span>
            </button>

            <nav class="admin-submenu" aria-label="Administración submenu">
                <button class="subitem" :class="{ selected: active === 'empresas' }" @click="select('empresas')">
                    <span class="bullet">●</span>
                    <span class="slabel">Empresas</span>
                </button>
                <!-- Additional admin items can be added here -->
            </nav>
        </div>

        <div class="user">
            <div class="user-box">
                <div class="user-email">{{ userEmail }}</div>
            </div>
            <button class="logout" @click="$emit('logout')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M16 17l5-5-5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M21 12H9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path d="M13 19H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h7" stroke="currentColor" stroke-width="1.6"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <span>Cerrar sesión</span>
            </button>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import '../styles/navbar.css';

const props = defineProps<{
    modelValue?: string
    email?: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'logout'): void
}>()

const active = ref(props.modelValue ?? 'dashboard')
const userEmail = props.email ?? 'usuario@empresa.com'

const router = useRouter()
const route = useRoute()

onMounted(() => {
    if (route.name === 'Companies' || String(route.path).startsWith('/companies')) {
        active.value = 'empresas'
    }
})

watch(() => route.name, (name) => {
    if (name === 'Companies' || String(route.path).startsWith('/companies')) {
        active.value = 'empresas'
    }
})

// const items = [
//     { key: 'dashboard', label: 'Dashboard', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/></svg>' },
//     { key: 'clientes', label: 'Clientes', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="11" cy="7" r="4" stroke="currentColor" stroke-width="1.4"/></svg>' },
//     { key: 'ventas', label: 'Ventas', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 3h18v6H3z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 21V9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 21V9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
//     { key: 'inventario', label: 'Inventario', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 14.5V21l-9-4-9 4v-6.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
//     { key: 'bancos', label: 'Caja y Bancos', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 10h18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M12 3v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><rect x="4" y="10" width="16" height="8" rx="1" stroke="currentColor" stroke-width="1.4"/></svg>' },
//     { key: 'cxc', label: 'Cuentas por Cobrar', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 1v22" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M17 5H7a3 3 0 0 0 0 6h10a3 3 0 0 1 0 6H7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' }
// ]

function select(key: string) {
    active.value = key
    emit('update:modelValue', key)
    if (key === 'empresas') {
        router.push({ name: 'Companies' })
    }
}
</script>