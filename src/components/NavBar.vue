<template>
    <header
        class="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50"
    >
        <nav
            class="container mx-auto px-4 py-3 flex justify-between items-center"
        >
            <!-- Brand -->
            <router-link to="/" class="text-2xl font-bold text-blue-600">
                🛍️ ShopSmart
            </router-link>

            <!-- Desktop Links -->
            <div class="hidden md:flex items-center gap-6">
                <router-link to="/" class="hover:text-blue-600"
                    >Home</router-link
                >
                <router-link to="/products" class="hover:text-blue-600"
                    >Products</router-link
                >
                <router-link
                    v-if="isLoggedIn && user?.role === 'admin'"
                    to="/admin"
                    class="hover:text-blue-600"
                >
                    Admin
                </router-link>

                <!-- Cart -->
                <button @click="toggleCart" class="relative">
                    🛒
                    <span
                        v-if="cartItemCount"
                        class="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full"
                    >
                        {{ cartItemCount }}
                    </span>
                </button>

                <!-- Auth -->
                <router-link
                    v-if="!isLoggedIn"
                    to="/login"
                    class="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                >
                    Login
                </router-link>
                <button
                    v-else
                    @click="logout"
                    class="bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200"
                >
                    Logout
                </button>
            </div>
        </nav>

        <!-- 🛒 Cart Drawer (single component only) -->
        <transition name="slide">
            <CartDrawer
                v-if="showCartDrawer"
                class="fixed top-[64px] right-0 w-80 h-[calc(100vh-64px)] z-[9999]"
                @close="closeCartDrawer"
            />
        </transition>

        <!-- 📱 Mobile Bottom Nav -->
        <div
            class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg flex justify-around py-2 z-50"
        >
            <router-link to="/" class="flex flex-col items-center text-sm">
                <i class="fa-solid fa-house text-xl"></i>
                <span>Home</span>
            </router-link>

            <router-link
                to="/products"
                class="flex flex-col items-center text-sm"
            >
                <i class="fa-solid fa-box text-xl"></i>
                <span>Products</span>
            </router-link>

            <button
                @click="toggleCart"
                class="relative flex flex-col items-center text-sm"
            >
                <i class="fa-solid fa-cart-shopping text-xl"></i>
                <span>Cart</span>
                <span
                    v-if="cartItemCount"
                    class="absolute top-0 right-3 bg-blue-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full"
                >
                    {{ cartItemCount }}
                </span>
            </button>
        </div>
    </header>
</template>

<script>
import { mapGetters } from "vuex";
import CartDrawer from "./CartDrawer.vue";

export default {
    name: "NavBar",
    components: { CartDrawer },
    computed: {
        ...mapGetters(["cartItemCount", "isLoggedIn"]),
        user() {
            return this.$store.state.user;
        },
    },
    data: () => ({ showCartDrawer: false }),
    methods: {
        toggleCart() {
            this.showCartDrawer = !this.showCartDrawer;
        },
        closeCartDrawer() {
            this.showCartDrawer = false;
        },
        logout() {
            this.$store.commit("logout");
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
/* Smooth slide-in/out animation */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}
.slide-enter-from {
    transform: translateX(100%);
}
.slide-leave-to {
    transform: translateX(100%);
}
</style>
