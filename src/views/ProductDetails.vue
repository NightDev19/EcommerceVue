<template>
    <div class="p-6 max-w-6xl mx-auto">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-[60vh]">
            <div class="text-gray-600 animate-pulse text-lg font-medium">
                Loading product details...
            </div>
        </div>

        <!-- Product Content -->
        <div
            v-else-if="product"
            class="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl shadow-lg"
        >
            <!-- Product Image -->
            <div class="md:w-1/2 flex justify-center items-center">
                <img
                    :src="product.image"
                    :alt="product.title"
                    class="rounded-xl shadow-md w-full max-w-md h-auto object-contain bg-gray-50 p-4"
                />
            </div>

            <!-- Product Details -->
            <div class="md:w-1/2 flex flex-col justify-between">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-3">
                        {{ product.title }}
                    </h2>
                    <p class="text-gray-600 mb-4 leading-relaxed">
                        {{ product.description }}
                    </p>

                    <div class="mb-4">
                        <span class="text-2xl font-bold text-blue-600">
                            ${{ product.price }}
                        </span>
                        <span
                            class="ml-3 text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium"
                        >
                            {{ product.category || "Uncategorized" }}
                        </span>
                    </div>

                    <!-- Quantity -->
                    <div class="flex items-center gap-3 mb-6">
                        <label for="quantity" class="font-medium text-gray-700"
                            >Quantity:</label
                        >
                        <input
                            type="number"
                            id="quantity"
                            v-model="quantity"
                            min="1"
                            class="w-20 border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <!-- Action Buttons -->
                <div>
                    <button
                        @click="addToCart"
                        :disabled="adding"
                        class="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                    >
                        <span v-if="!adding">🛒 Add to Cart</span>
                        <span v-else>Adding...</span>
                    </button>

                    <!-- Feedback Message -->
                    <p
                        v-if="message"
                        class="mt-3 text-sm font-medium text-green-600 animate-fade-in"
                    >
                        {{ message }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Error State -->
        <div v-else class="text-center text-red-500 font-medium py-20">
            Product not found or failed to load.
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getProductById } from "../assets/api";
import { useStore } from "vuex";

export default {
    setup() {
        const route = useRoute();
        const store = useStore();
        const product = ref(null);
        const quantity = ref(1);
        const loading = ref(true);
        const adding = ref(false);
        const message = ref("");

        const loadProduct = async () => {
            try {
                const data = await getProductById(route.params.id);
                product.value = data;
            } catch (error) {
                console.error("Error loading product:", error);
            } finally {
                loading.value = false;
            }
        };

        const addToCart = async () => {
            if (!product.value) return;
            adding.value = true;
            message.value = "";

            setTimeout(() => {
                const productToAdd = {
                    ...product.value,
                    quantity: Number(quantity.value),
                };
                store.commit("addToCart", productToAdd);
                adding.value = false;
                message.value = "✅ Product added to cart successfully!";
                setTimeout(() => (message.value = ""), 2500);
            }, 800);
        };

        onMounted(loadProduct);

        return { product, quantity, loading, adding, message, addToCart };
    },
};
</script>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(4px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.animate-fade-in {
    animation: fade-in 0.3s ease-out;
}
</style>
