<template>
    <div
        @click="
            $router.push({ name: 'ProductDetails', params: { id: product.id } })
        "
        class="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
    >
        <!-- Product Image -->
        <div class="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
            <img
                :src="product.image"
                :alt="product.title"
                class="object-contain w-full h-full transition-transform duration-500 group-hover:scale-105 p-3"
            />
            <div
                class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
        </div>

        <!-- Product Details -->
        <div class="p-4 flex flex-col flex-grow justify-between">
            <div>
                <h3
                    class="text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors"
                >
                    {{ product.title }}
                </h3>
                <p class="text-sm text-gray-500 line-clamp-2 mt-1">
                    {{ product.description || "No description available." }}
                </p>
            </div>

            <div class="flex items-center justify-between mt-3">
                <span class="text-lg font-bold text-blue-600"
                    >${{ product.price }}</span
                >
                <span
                    class="text-xs px-3 py-1 bg-blue-100 text-blue-600 rounded-full font-medium"
                >
                    {{ product.category || "Uncategorized" }}
                </span>
            </div>
        </div>

        <!-- Hover Action -->
        <div
            class="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-blue-600 text-white text-center py-2 text-sm font-semibold"
        >
            View Details
        </div>
    </div>
</template>

<script setup>
defineProps({ product: Object });
</script>

<style scoped>
.line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

.line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
