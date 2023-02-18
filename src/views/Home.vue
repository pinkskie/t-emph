<template>
  <div class="search">
    <input
      type="text"
      placeholder="Search..."
      :value="input"
      @input="handleSearch"
    />
    <button @click="handleClear" v-if="input.length !== 0" class="clear-btn">
      x
    </button>
  </div>
  <div class="actions">
    <router-link to="/create">
      <button class="btn">Add new users</button>
    </router-link>
    <button @click="toggleSort" class="btn">Sort by id</button>
  </div>
  <Loader />
  <div class="users">
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

    const handleClear = () => {
      input.value = "";
    };

    onMounted(() => store.dispatch("getUsersList"));
    return {
      users: computed(() =>
        store.getters.getUsersList({ query: input.value, sort: isSorted.value })
      ),
      toggleSort,
      handleSearch,
      handleClear,
      input,
    };
  },
};
</script>

<style lang="scss">
.search {
  margin: 5rem auto 2rem;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  width: 40rem;
  input {
    font-size: 1rem;
    font-weight: 400;
    line-height: inherit;
    width: 100%;
    padding: 0.75rem 1.25rem;
    border: none;
    outline: none;
    color: #121212;
    background: transparent;
    ::placeholder {
      font-family: inherit;
    }
  }
}
.clear-btn {
  background-color: transparent;
  border: none;
  border: 1px solid rgb(150, 150, 150);
  color: rgb(150, 150, 150);
  border-radius: 100%;
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  transition: 0.2s ease;
  cursor: pointer;
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
  padding: 1rem 0 2rem;
  max-width: fit-content;
  margin: 0 auto;
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
