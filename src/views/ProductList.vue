<template>
    <div class="p-6">
        <h1 class="text-3xl font-bold mb-6">Product List</h1>

        <select v-model="category" class="mb-6 border rounded-lg px-3 py-2">
            <option value="">All Categories</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>

        <div v-if="loading">Loading...</div>

        <div
            v-else
            class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
            <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getAllProducts } from "../assets/api";
import ProductCard from "../components/ProductCard.vue";

const products = ref([]);
const loading = ref(true);
const category = ref("");
const categories = ref([]);

onMounted(async () => {
    const data = await getAllProducts();
    products.value = data;
    categories.value = [
        ...new Set(data.map((p) => p.category || "Uncategorized")),
    ];
    loading.value = false;
});

const filtered = computed(() =>
    category.value
        ? products.value.filter((p) => p.category === category.value)
        : products.value,
);
</script>
