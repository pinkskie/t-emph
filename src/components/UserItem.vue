<template>
  <div class="user-item" v-for="user in users" :key="user.id">
    <span> Username: {{ user.username }} </span>
    <span> Firstname: {{ user.first_name }} </span>
    <span> Lastname: {{ user.last_name }} </span>
    <span> id: {{ user.id }} </span>

    <button class="user-btn">
      <router-link :to="`update/${user.id}`">Редактировать</router-link>
    </button>
  </div>
</template>

<script>
export default {
  name: "AuthForm",
  emits: ["submit"],
  props: {
    users: {
      type: Object,
    },
  },
};
</script>

<style lang="scss">
.user-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid #f1f5f9;
  padding: 1rem;
  width: 20rem;
  height: 15rem;
  border-radius: 8px;
  box-shadow: 0 -2px 15px -3px rgba(0, 0, 0, 0.3);
  .user-btn {
    align-self: center;
    margin-top: 1rem;
    background-color: white;
    border: 1px solid black;
    border-radius: 999rem;
    padding: 0.3rem 1rem;
    font-size: 0.85rem;
    transition: 0.2s ease;
    cursor: pointer;
    &:hover {
      background-color: #1a73e8;
      border: 1px solid white;
      color: white;
    }
  }
}
</style>
