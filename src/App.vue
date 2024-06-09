<template>
  <div id="app" class="bg-base-200 min-h-screen">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style>
/* Add global styles here if needed */
</style>
