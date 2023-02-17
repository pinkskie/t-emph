<template>
  <div class="search">
    <input type="text" placeholder="Search..." @input="handleSearch" />
  </div>
  <div class="actions">
    <button class="btn">
      <router-link to="/create">Add new users</router-link>
    </button>
    <button @click="toggleSort" class="btn">Sort by id</button>
  </div>
  <div class="loader" v-if="!users">
    <Loader />
  </div>
  <div class="users" v-else>
    <UserItem :users="users" />
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

import Loader from "@/assets/Loader.vue";
import UserItem from "@/components/UserItem.vue";

export default {
  name: "Home",
  components: {
    UserItem,
    Loader,
  },
  setup() {
    const store = useStore();
    const isSorted = ref(true);
    const input = ref("");

    const toggleSort = () => {
      isSorted.value = !isSorted.value;
    };

    const handleSearch = (e) => {
      input.value = e.target.value;
    };

    onMounted(() => store.dispatch("getUsersList"));
    return {
      users: computed(() =>
        store.getters.getUsersList({ query: input.value, sort: isSorted.value })
      ),
      toggleSort,
      handleSearch,
    };
  },
};
</script>

<style lang="scss">
.search {
  margin: 5rem auto 2rem;
  input {
    font-size: 1rem;
    font-weight: 400;
    line-height: inherit;
    width: 40rem;
    height: auto;
    padding: 0.75rem 1.25rem;
    border: none;
    outline: none;
    border-radius: 2rem;
    color: #121212;
    background: #f1f5f9;
    ::placeholder {
      font-family: inherit;
    }
  }
}
.actions {
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.users {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  max-width: fit-content;
  margin: 0 auto;
}

.loader {
  margin-top: 4rem;
}

@media screen and (max-width: 762px) {
  .search {
    input {
      width: 90%;
    }
  }
  .users {
    grid-template-columns: 1fr;
  }
}
</style>
