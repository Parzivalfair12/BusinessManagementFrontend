<template>
  <div class="login-form page">
    <div class="card">
      <div class="brand">
        <div class="icon">🏢</div>
        <h1>SIGE</h1>
        <p class="subtitle">Sistema integral de gestión empresarial</p>
      </div>

      <form @submit.prevent="submit" class="form">
        <label>
          <span>Correo electrónico</span>
          <input
            v-model="email"
            type="email"
            placeholder="usuario@empresa.com"
            required
          />
        </label>

        <label>
          <span>Contraseña</span>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </label>

        <button type="submit" class="btn" :disabled="loading">
          {{ loading ? 'Ingresando...' : 'Iniciar sesión' }}
        </button>
      </form>

      <p v-if="error" class="error">{{ error }}</p>
      <p class="demo">Demo: use cualquier email y contraseña</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import { useRouter } from 'vue-router';
import '../styles/login.css';

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const authStore = useAuthStore();
const router = useRouter();

const submit = async () => {
  error.value = '';
  loading.value = true;

  try {
    await authStore.login(email.value, password.value);
    router.push('/dashboard');
  } catch (err: any) {
    error.value = 'Correo o contraseña incorrectos';
  } finally {
    loading.value = false;
  }
};
</script>
