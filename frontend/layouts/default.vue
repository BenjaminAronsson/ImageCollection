<template>
  <div>
    <nav
      class="navbar header has-shadow is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a class="navbar-item" href="/">The wardrobe</a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <aside id="menu" class="column is-2 section">
        <p class="menu-label is-hidden-touch">Meny</p>
        <div class="spacer"></div>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon" /> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Hem",
          icon: "home",
          to: { name: "index" },
        },
        {
          title: "Produkter",
          icon: "view-dashboard",
          to: { name: "products" },
        },
      ],
    };
  },
};
</script>

<style scoped>
.spacer {
  background-color: lightgray;
  width: 100%;
  height: 2px;
}
</style>
