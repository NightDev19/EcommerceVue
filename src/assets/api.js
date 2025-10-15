import axios from "axios";

// ✅ Axios instance with timeout and base configuration
const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: { "Content-Type": "application/json" },
  timeout: 5000, // fail fast after 5 seconds
});

// ✅ Retry Interceptor (up to 3 retries with delay)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;
    if (!config || config.__retryCount >= 3) return Promise.reject(error);

    config.__retryCount = (config.__retryCount || 0) + 1;
    const delay = 500 * config.__retryCount;
    console.warn(`Retrying [${config.url}] - attempt ${config.__retryCount}`);
    await new Promise((resolve) => setTimeout(resolve, delay));

    return apiClient(config);
  },
);

// ✅ Helper to cache responses in memory + localStorage
const cache = {
  get(key) {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    try {
      const { data, expiry } = JSON.parse(cached);
      if (Date.now() > expiry) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    } catch {
      return null;
    }
  },
  set(key, data, ttlMs = 5 * 60 * 1000) {
    const expiry = Date.now() + ttlMs; // default 5 minutes cache
    localStorage.setItem(key, JSON.stringify({ data, expiry }));
  },
};

// ✅ Fetch all products with caching
export const getAllProducts = async () => {
  const cacheKey = "products";
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData;

  try {
    const response = await apiClient.get("/products");
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
};

// ✅ Fetch product by ID (also cached individually)
export const getProductById = async (id) => {
  const cacheKey = `product_${id}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData;

  try {
    const response = await apiClient.get(`/products/${id}`);
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    return null;
  }
};

// ✅ Example of parallel fetching (products + categories)
export const getProductsAndCategories = async () => {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      apiClient.get("/products"),
      apiClient.get("/products/categories"),
    ]);
    return {
      products: productsRes.data,
      categories: categoriesRes.data,
    };
  } catch (error) {
    console.error("Error fetching products & categories:", error.message);
    return { products: [], categories: [] };
  }
};

export default apiClient;
