<template>
  <div class="p-6">
    <div
      v-for="product in cart"
      :key="product.id"
      class="flex justify-between items-center mb-4 border rounded-lg p-4"
    >
      <div class="flex items-center">
        <img
          :src="product.image"
          :alt="product.title"
          class="w-20 h-20 object-cover rounded-lg mr-4"
        />
        <div>
          <h3 class="text-md font-bold">{{ truncateTitle(product.title) }}</h3>
          <p>Price: {{ product.price }}</p>
          <p v-if="!product.editing">Quantity: {{ product.quantity }}</p>
          <input
            v-else
            type="number"
            v-model="product.quantity"
            class="w-20 border rounded-md p-1 mx-2"
          />
        </div>
      </div>
      <div class="flex flex-col items-center">
        <button
          @click="editProduct(product)"
          v-if="!product.editing"
          class="btn btn-secondary w-20"
        >
          Edit
        </button>
        <button
          @click="updateProduct(product)"
          v-if="product.editing"
          class="btn btn-primary"
        >
          Update
        </button>
        <button @click="removeFromCart(product.id)" class="btn btn-danger">
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
  methods: {
    editProduct(product) {
      product.editing = true;
    },
    updateProduct(product) {
      product.editing = false;
      // You may want to validate and handle quantity update here
    },
    removeFromCart(productId) {
      this.$store.commit("removeFromCart", productId);
    },
    truncateTitle(title) {
      const maxLength = 20; // Set the maximum length of the title
      if (title.length > maxLength) {
        return title.slice(0, maxLength) + "..."; // Truncate the title if it's too long
      }
      return title;
    },
  },
};
</script>
