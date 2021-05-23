<template>
  <section>
    <b-image
      src="https://www.460fss.com/wp-content/uploads/2021/01/FCC-Photo.jpg"
      alt="A child image"
      ratio="6by4"
      :rounded="rounded"
    ></b-image>
  </section>
</template>

<script>
export default {
  data() {
    return {
      rounded: true,
    };
  },
};
</script>