<template>
  <div class="PageNotFound">
    <img :src="require('../assets/404.png')" alt="404" />
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style>
.PageNotFound {
  width: 100%;
  height: 100vh;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
}

@media screen and (max-width: 762px) {
  .PageNotFound {
    font-size: 2rem;
  }
}
</style>
