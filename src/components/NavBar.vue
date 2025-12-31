<template>
    <aside class="navbar navbar-root" role="navigation" aria-label="Main navigation">
        <div class="brand">
            <div class="logo">🏢</div>
            <div class="brand-text">
                <div class="name">SIGE</div>
                <div class="subtitle">Gestión empresarial integral</div>
            </div>
        </div>

        <nav class="menu" aria-label="Main menu">
            <button v-for="item in items" :key="item.key" :class="['item', { active: active === item.key }]"
                @click="select(item.key)">
                <span class="icon" v-html="item.icon"></span>
                <span class="label">{{ item.label }}</span>
            </button>
        </nav>

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
import { ref } from 'vue'
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

const items = [
    { key: 'dashboard', label: 'Dashboard', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/></svg>' },
    { key: 'clientes', label: 'Clientes', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="11" cy="7" r="4" stroke="currentColor" stroke-width="1.4"/></svg>' },
    { key: 'ventas', label: 'Ventas', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 3h18v6H3z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 21V9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 21V9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { key: 'inventario', label: 'Inventario', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 14.5V21l-9-4-9 4v-6.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' },
    { key: 'bancos', label: 'Caja y Bancos', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 10h18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M12 3v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><rect x="4" y="10" width="16" height="8" rx="1" stroke="currentColor" stroke-width="1.4"/></svg>' },
    { key: 'cxc', label: 'Cuentas por Cobrar', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 1v22" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M17 5H7a3 3 0 0 0 0 6h10a3 3 0 0 1 0 6H7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' }
]

function select(key: string) {
    active.value = key
    emit('update:modelValue', key)
}
</script>