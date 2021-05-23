

<template>
  <product-grid :products="products"></product-grid>
</template>

<script>
import Card from "~/components/Card";
import ProductGrid from "../components/productGrid";

export default {
  name: "HomePage",
  components: {
    Card,
    ProductGrid,
  },
  mounted() {
    this.getProducts();
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts(context) {
      fetch("http://localhost:5000/api/products/")
        .then((response) => response.json())
        .then((result) => {
          this.products = result.products;
        })
        .catch((error) => {
          console.warn(error.message);
        });
    },
  },
};
</script>
