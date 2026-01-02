import { defineStore } from 'pinia';
import { login } from '../core/services/auth.service';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token')
  }),

  actions: {
    async login(email: string, password: string) {
      const response = await login({ email, password });

      this.token = response.token;
      this.isAuthenticated = true;

      localStorage.setItem('token', response.token);
    },

    logout() {
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('token');
    }
  }
});
