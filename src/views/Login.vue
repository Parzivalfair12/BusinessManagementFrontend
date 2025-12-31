<template>
    <div class="login-form page">
        <div class="card">
            <div class="brand">
                <div class="icon">🏢</div>
                <h1>SIGE</h1>
                <p class="subtitle">Gestión empresarial integral</p>
            </div>

            <form @submit.prevent="submit" class="form">
                <label>
                    <span>Correo electrónico</span>
                    <input v-model="email" type="email" placeholder="usuario@empresa.com" required />
                </label>

                <label>
                    <span>Contraseña</span>
                    <input v-model="password" type="password" placeholder="••••••••" required />
                </label>

                <button type="submit" class="btn">Iniciar sesión</button>
            </form>

            <p class="demo">Demo: use cualquier email y contraseña</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import '../styles/login.css';

const email = ref("");
const password = ref("");

function submit() {
    // demo: sólo muestra en consola; reemplazar por autenticación real
    console.log("Login:", { email: email.value, password: password.value });
    alert("Iniciando sesión (demo)");
}
</script>