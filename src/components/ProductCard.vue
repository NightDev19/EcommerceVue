<template>
  <div
    @click="handleClick"
    class="border rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-105"
  >
    <div class="aspect-w-1 aspect-h-1 mb-2">
      <img
        :src="product.image"
        :alt="product.title"
        class="object-cover w-full h-full rounded-lg"
      />
    </div>
    <h3 class="text-lg font-bold">{{ product.title }}</h3>
    <p class="text-gray-600">${{ product.price }}</p>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$router.push({
        name: "ProductDetails",
        params: { id: this.product.id },
      });
    },
  },
};
</script>

<style scoped>
/* Add styles for the product card here */
.aspect-w-1 {
  aspect-ratio: 1;
}
.aspect-h-1 {
  aspect-ratio: 1;
}
</style>
