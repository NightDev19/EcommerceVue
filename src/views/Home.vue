<template>
    <!-- 🏠 Hero Section -->
    <section
        class="relative min-h-screen flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden px-6"
    >
        <div class="max-w-2xl z-10">
            <h1
                class="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight mb-4"
            >
                Welcome to <span class="text-blue-600">ShopSmart</span>
            </h1>
            <p class="text-lg md:text-xl text-gray-600 mb-10">
                Explore top-quality products at unbeatable prices. Smart
                shopping starts here.
            </p>

            <router-link
                to="/products"
                class="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:-translate-y-1"
            >
                🛒 Start Shopping
            </router-link>
        </div>

        <!-- Background Decorative Shapes -->
        <div
            class="absolute top-10 left-10 w-56 h-56 bg-blue-100 rounded-full blur-3xl opacity-40 animate-pulse -z-10"
        ></div>
        <div
            class="absolute bottom-10 right-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-40 animate-pulse -z-10"
        ></div>
    </section>

    <!-- 💡 Recommended Section -->
    <section class="px-6 py-16 bg-white">
        <h2 class="text-3xl font-bold text-gray-800 text-center mb-10">
            Recommended for You
        </h2>

        <!-- Loader -->
        <div v-if="loading" class="text-center text-gray-500 text-lg">
            Loading...
        </div>

        <!-- Product Grid -->
        <div
            v-else
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto"
        >
            <div
                v-for="product in recommended"
                :key="product.id"
                class="bg-white border rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1 p-4 flex flex-col"
            >
                <img
                    :src="product.image"
                    :alt="product.title"
                    class="w-full h-48 object-contain mb-3"
                />
                <h3
                    class="text-sm font-semibold text-gray-700 mb-1 line-clamp-2"
                >
                    {{ product.title }}
                </h3>
                <p class="text-blue-600 font-bold mb-2">${{ product.price }}</p>
                <router-link
                    :to="`/product/${product.id}`"
                    class="mt-auto bg-blue-600 text-white text-sm px-3 py-2 rounded-md hover:bg-blue-700 text-center"
                >
                    View Details
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { getAllProducts } from "../assets/api";

export default {
    name: "Home",
    setup() {
        const recommended = ref([]);
        const loading = ref(true);

        onMounted(async () => {
            try {
                const products = await getAllProducts();
                // Random 6 recommended items
                recommended.value = products
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 5);
            } catch (error) {
                console.error("Error fetching recommended products:", error);
            } finally {
                loading.value = false;
            }
        });

        return { recommended, loading };
    },
};
</script>

<style scoped>
/* Smooth fade-in animation for page load */
section {
    animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Pulse animation for background shapes */
@keyframes pulse {
    0%,
    100% {
        opacity: 0.4;
        transform: scale(1);
    }
    50% {
        opacity: 0.6;
        transform: scale(1.05);
    }
}
.animate-pulse {
    animation: pulse 6s ease-in-out infinite;
}
</style>
