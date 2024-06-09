<template>
  <div class="p-4 flex flex-col md:flex-row items-start">
    <div class="md:w-1/2 mr-4">
      <img
        :src="product.image"
        :alt="product.title"
        class="mb-4 rounded-lg shadow-lg w-3/4 h-[500px]"
      />
    </div>
    <div class="md:w-1/2">
      <h2 class="text-xl font-bold mb-4">{{ product.title }}</h2>
      <p class="mb-4">{{ product.description }}</p>
      <p class="mb-4">Price: {{ product.price }}</p>
      <label for="quantity" class="mb-2">Quantity:</label>
      <input
        type="number"
        id="quantity"
        v-model="quantity"
        class="w-20 border rounded-md p-1 mb-4"
      />
      <button @click="addToCart" class="btn btn-primary mr-2">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getProductById } from "../assets/api";
import { useStore } from "vuex";

export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const productId = route.params.id;
    const product = ref(null);
    const quantity = ref(1);

    const addToCart = () => {
      if (product.value) {
        const productToAdd = {
          ...product.value,
          quantity: Number(quantity.value),
        };
        store.commit("addToCart", productToAdd);
      }
    };

    getProductById(productId).then((data) => {
      product.value = data;
    });

    return { product, quantity, addToCart };
  },
};
</script>
