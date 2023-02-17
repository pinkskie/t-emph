<template>
  <div class="user-item" v-for="user in users" :key="user.id">
    <span class="username"> {{ user.username }} </span>
    <span class="firstname"> Firstname: {{ user.first_name }} </span>
    <span class="lastname"> Lastname: {{ user.last_name }} </span>
    <span class="id"> id: {{ user.id }} </span>

    <router-link :to="`update/${user.id}`">
      <button class="user-btn">
        <Pencil />
      </button>
    </router-link>
  </div>
</template>

<script>
import Pencil from "@/assets/Pencil.vue";

export default {
  name: "AuthForm",
  emits: ["submit"],
  components: {
    Pencil,
  },
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
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #f1f5f9;
  padding: 1rem;
  width: 23rem;
  height: 11rem;
  border-radius: 8px;
  box-shadow: 0 -2px 15px -3px rgba(0, 0, 0, 0.3);
  position: relative;
  .user-btn {
    align-self: center;
    margin-top: 1rem;
    background-color: #1a73e8;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50%;
    font-size: 0.85rem;
    transition: 0.2s ease;
    cursor: pointer;
    padding: 0.5rem 0.6rem;
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    transition: 0.2s ease;

    &:hover {
      color: white;
      transform: scale(1.1);
    }
  }
  .username {
    font-weight: 600;
    font-size: 1.25rem;
    max-width: 10rem;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
