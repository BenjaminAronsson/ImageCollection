<template>
  <div>
    <b-tabs @input="tabChanged" position="is-centered" v-model="activeTab">
      <b-tab-item label="All"></b-tab-item>
      <b-tab-item label="A-Z">
        <b-tabs
          @input="tabChanged"
          :animated="false"
          position="is-centered"
          size="is-small"
          v-model="activeLetter"
        >
          <b-tab-item label="A"></b-tab-item>
          <b-tab-item label="B"></b-tab-item>
          <b-tab-item label="C"></b-tab-item>
          <b-tab-item label="D"></b-tab-item>
          <b-tab-item label="E"></b-tab-item>
          <b-tab-item label="F"></b-tab-item>
          <b-tab-item label="G"></b-tab-item>
          <b-tab-item label="H"></b-tab-item>
          <b-tab-item label="I"></b-tab-item>
          <b-tab-item label="J"></b-tab-item>
          <b-tab-item label="K"></b-tab-item>
          <b-tab-item label="L"></b-tab-item>
          <b-tab-item label="M"></b-tab-item>
          <b-tab-item label="N"></b-tab-item>
          <b-tab-item label="O"></b-tab-item>
          <b-tab-item label="P"></b-tab-item>
          <b-tab-item label="Q"></b-tab-item>
          <b-tab-item label="R"></b-tab-item>
          <b-tab-item label="S"></b-tab-item>
          <b-tab-item label="T"></b-tab-item>
          <b-tab-item label="U"></b-tab-item>
          <b-tab-item label="V"></b-tab-item>
          <b-tab-item label="W"></b-tab-item>
          <b-tab-item label="X"></b-tab-item>
          <b-tab-item label="Y"></b-tab-item>
          <b-tab-item label="Z"></b-tab-item>
        </b-tabs>
      </b-tab-item>
    </b-tabs>
    <section class="section">
      <div class="columns is-multiline">
        <div
          class="column is-one-quarter"
          v-for="product in filteredProducts"
          :key="product.id"
        >
          <product-card
            :product="product"
            :isLoading="isLoading"
          ></product-card>
        </div>
      </div>
      <div class="columns is-multiline">
        <div class="column is-one-quarter" v-if="filteredProducts.length < 1">
          <product-card
            :product="placeholderProduct"
            :buttonIsVisible="false"
            :isLoading="isLoading"
          ></product-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductGrid",
  components: {
    ProductCard,
  },
  data() {
    return {
      activeTab: 0,
      activeLetter: 0,
      filteredProducts: [],
      isLoading: true,
      placeholderProduct: {
        imageUrl:
          "https://designshack.net/wp-content/uploads/placeholder-image.png",
        title: "We have no products with the current filter",
        originalPrice: null,
        currentPrice: null,
      },
    };
  },
  props: ["products"],
  methods: {
    tabChanged() {
      this.isLoading = true;
      if (this.activeTab === 0) {
        this.filteredProducts = this.products;
      } else {
        let letter = String.fromCharCode(97 + this.activeLetter);
        this.filteredProducts = this.products.filter(
          (x) => x.title[0].toUpperCase() === letter.toUpperCase()
        );
      }
      this.isLoading = false;
    },
  },
  watch: {
    products: function (newVal, oldVal) {
      this.filteredProducts = newVal;
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.section {
  padding-top: 1em;
}
</style>