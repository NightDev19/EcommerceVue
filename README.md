# EcommerceVue Project

## Getting Started

### Forking the Repository

1. Go to the [EcommerceVue repository](https://github.com/NightDev19/EcommerceVue) on GitHub.
2. Click the "Fork" button in the upper right corner of the page.
3. Select your GitHub account as the destination for the fork.

### Cloning the Repository

1. Open your terminal (Command Prompt on Windows, Terminal on macOS and Linux).
2. Change the current working directory to the location where you want to clone the repository.
3. Use the following command to clone the repository:

   ```sh
   git clone https://github.com/YourUsername/EcommerceVue.git
   ```

Replace YourUsername with your GitHub username.

4. Change into the cloned repository directory:
   ```sh
   cd EcommerceVue
   ```
5. You now have a local copy of the repository on your machine. You can start working on the project and push changes to your fork on GitHub.

# Project Documentation

This document provides an overview of the files and modules in the Vue.js e-commerce project.

## assets/api.js

### API Module

This module contains functions to interact with the backend API.

#### Functions

- `getProductById(id: number): Promise<Product>` - Retrieves a product by its ID.
- `getProducts(): Promise<Product[]>` - Retrieves a list of all products.

## router/index.js

### Router Configuration

This module configures the Vue Router for the application.

#### Routes

- `/` - Home page
- `/products` - Product list page
- `/products/:id` - Product details page
- `/cart` - Cart page
- `/login` - Login page (conditional based on user authentication)
- `/admin` - Admin page (conditional based on user role)

#### Navigation Guards

- `beforeEach(to: Route, from: Route, next: Function)` - Checks if the user is authenticated before navigating to protected routes.

## store/index.js

### Vuex Store

This module contains the Vuex store for managing application state.

#### State

- `cart: Product[]` - Array of products in the cart.

#### Getters

- `cartItemCount(): number` - Returns the total number of items in the cart.

#### Mutations

- `addToCart(product: Product)` - Adds a product to the cart.
- `removeFromCart(productId: number)` - Removes a product from the cart.

## views/Home.vue

### Home Page

This page displays the home content of the application.

## views/Cart.vue

### Cart Page

This page displays the items in the cart and allows the user to manage them.

#### Features

- Displays a list of products in the cart.
- Allows the user to remove products from the cart.
- Displays the total price of all items in the cart.

## views/ProductList.vue

### Product List Page

This page displays a list of all products available for purchase.

#### Features

- Displays a list of all products with their images, titles, and prices.
- Allows the user to click on a product to view its details.

## views/ProductDetails.vue

### Product Details Page

This page displays detailed information about a specific product.

#### Features

- Displays the product's image, title, description, and price.
- Allows the user to select a quantity and add the product to the cart.

## components/CartDrawer.vue

### Cart Drawer Component

This component displays the cart items in a drawer on the right side of the screen.

#### Features

- Displays a list of products in the cart with their names and quantities.
- Allows the user to edit the quantity of each product.
- Allows the user to remove products from the cart.

## components/NavBar.vue

### Navigation Bar Component

This component displays the navigation bar at the top of the application.

#### Features

- Displays links to the home page, product list page, cart page, login page, and admin page.
- Displays the total number of items in the cart.

## components/ProductCard.vue

### Product Card Component

This component displays a card for a single product, showing its image, title, price, and quantity.

#### Features

- Displays the product's image, title, price, and quantity.
- Allows the user to click on the product to view its details.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.