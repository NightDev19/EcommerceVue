<template>
  <div class="p-6">
    <h1 class="text-4xl font-bold mb-6">Product List</h1>
    <div v-if="loading">Loading...</div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAllProducts } from "../assets/api";
import ProductCard from "../components/ProductCard.vue";

export default {
  name: "ProductList",
  components: {
    ProductCard,
  },
  setup() {
    const products = ref([]);
    const loading = ref(true);

    onMounted(async () => {
      products.value = await getAllProducts();
      loading.value = false;
    });

    return { products, loading };
  },
};
</script>

<style scoped>
/* Add styles for the product list page here */
</style>
