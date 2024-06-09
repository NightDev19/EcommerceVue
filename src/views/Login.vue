<template>
    <div class="p-6">
      <h1 class="text-4xl font-bold mb-6">Login</h1>
      <form @submit.prevent="handleLogin" class="max-w-md mx-auto">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" v-model="email" required class="input input-bordered w-full mt-1" />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" id="password" v-model="password" required class="input input-bordered w-full mt-1" />
        </div>
        <button type="submit" class="btn btn-primary w-full">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        // Placeholder for login logic
        console.log('Email:', this.email);
        console.log('Password:', this.password);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles for the login page here */
  </style>
  