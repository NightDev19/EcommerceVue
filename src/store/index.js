// store/index.js
import { createStore } from "vuex";

const store = createStore({
  state: {
    user: null,
    cart: [],
    products: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setCart(state, cart) {
      state.cart = cart;
    },
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, product) {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity += product.quantity;
      } else {
        state.cart.push(product);
      }
    },
    removeFromCart(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
  },
  actions: {
    async login({ commit }, credentials) {
      // login logic
    },
  },
  getters: {
    cartItemCount(state) {
      return state.cart.length;
    },
    isLoggedIn(state) {
      return !!state.user;
    },
  },
});

export default store;
