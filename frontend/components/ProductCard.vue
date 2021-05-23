<template>
  <div class="card" id="card">
    <div class="card-image">
      <b-skeleton v-if="isLoading" width="100%" height="200px"></b-skeleton>
      <figure v-if="!isLoading" class="image is-4by3">
        <img id="image" :src="product.imageUrl" />
      </figure>
    </div>
    <div class="card-content">
      <div class="is-mobile">
        <div class="level-item">
          <p v-if="!isLoading" class="level-left title is-6">
            {{ product.title }}
          </p>
          <b-skeleton
            v-if="isLoading"
            width="80%"
            :animated="true"
          ></b-skeleton>
        </div>
        <div class="level-item">
          <p
            v-if="!isLoading && product.originalPrice !== null"
            v-bind:class="[
              product.originalPrice !== product.currentPrice ? 'old-price' : '',
              'subtitle',
            ]"
          >
            {{ product.originalPrice }}kr
          </p>
          <div style="margin-top: 15px; height: 15px"></div>
          <P
            v-if="!isLoading && product.originalPrice !== product.currentPrice"
            class="subtitle current-price"
            >{{ product.currentPrice }}kr</P
          >
          <b-skeleton
            v-if="isLoading"
            width="30%"
            :animated="true"
          ></b-skeleton>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div v-if="buttonIsVisible" class="card-footer-item">
        <a class="button is-button is-medium is-fullwidth" @click="addToCart"
          >Add to cart</a
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    productId() {
      return "/product/" + this.product.id;
    },
    productImage() {
      return this.product.image;
    },
  },
  name: "ProductCard",
  methods: {
    addToCart() {
      alert("Looks like you need a developer to help you....");
    },
  },
  props: {
    product: {},
    buttonIsVisible: {
      type: Boolean,
      default: true,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.rectangle {
  border-radius: 0;
}

.column {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.card > a {
  flex-grow: 1;
}

#card:hover {
  transform: scale(1.1);
  z-index: 999;
}

.level-left {
  flex-shrink: unset;
}

.card {
  border-radius: 5px;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  height: 100%;
}

#image {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  object-fit: cover;
}

.old-price {
  text-decoration-line: line-through;
}

.current-price {
  color: red;
  font-weight: bolder;
  font-size: 110%;
}
</style>
