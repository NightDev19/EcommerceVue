<template>
  <nav class="bg-primary text-primary-content p-4 flex justify-between">
    <div>
      <router-link to="/" class="btn btn-ghost normal-case text-xl"
        >Home</router-link
      >
      <router-link to="/products" class="btn btn-ghost normal-case text-xl"
        >Products</router-link
      >
    </div>
    <div>
      <button @click="toggleCart" class="btn btn-ghost normal-case text-xl">
        Cart ({{ cartItemCount }})
      </button>
      <router-link
        to="/login"
        v-if="!isLoggedIn"
        class="btn btn-ghost normal-case text-xl"
        >Login</router-link
      >
      <router-link
        to="/admin"
        v-if="isLoggedIn && user.role === 'admin'"
        class="btn btn-ghost normal-case text-xl"
        >Admin</router-link
      >
    </div>
  </nav>
  <CartDrawer v-if="showCartDrawer" @close="closeCartDrawer" />
</template>

<script>
import { mapGetters } from "vuex";
import CartDrawer from "./CartDrawer.vue";

export default {
  name: "NavBar",
  components: {
    CartDrawer,
  },
  computed: {
    ...mapGetters(["cartItemCount", "isLoggedIn"]),
  },
  data() {
    return {
      showCartDrawer: false,
    };
  },
  methods: {
    toggleCart() {
      this.showCartDrawer = !this.showCartDrawer;
    },
    closeCartDrawer() {
      this.showCartDrawer = false;
    },
  },
};
</script>

<style scoped>
/* Add styles for the navigation bar here */
</style>
