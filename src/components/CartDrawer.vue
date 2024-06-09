<template>
  <div
    class="fixed top-0 right-0 h-full w-1/3 bg-base-200 shadow-lg z-50 cart-drawer"
  >
    <div class="p-4">
      <div class="fixed top-0 right-0 w-1/3 bg-base-200 shadow-lg z-50">
        <div class="p-4 flex justify-between items-center">
          <h2 class="text-xl font-bold">Cart</h2>
          <button @click="closeCart" class="btn">X</button>
        </div>
      </div>
      <div class="mt-16">
        <Cart />
      </div>

      <div class="fixed bottom-0 right-0 w-1/3 bg-base-200 shadow-lg z-50 p-4">
        <p class="text-left font-bold">Total: ${{ total }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Cart from "../views/Cart.vue";

export default {
  components: {
    Cart,
  },
  computed: {
    total() {
      // Calculate total from cart items
      return this.$store.state.cart
        .reduce((total, product) => {
          return total + product.price * product.quantity;
        }, 0)
        .toFixed(2);
    },
  },
  methods: {
    closeCart() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
/* Add styles for the cart drawer here */
.cart-drawer {
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.cart-drawer::-webkit-scrollbar {
  display: none; /* WebKit */
}
</style>
