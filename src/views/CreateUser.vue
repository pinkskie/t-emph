<template>
  <UpsertForm @create="createUser" />
</template>

<script>
import UpsertForm from "@/components/UpsertForm.vue";
import api from "@/services/api";

export default {
  name: "CreateUser",
  components: {
    UpsertForm,
  },
  setup() {
    const createUser = async (data) => {
      try {
        await api.createUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    return {
      createUser,
    };
  },
};
</script>
