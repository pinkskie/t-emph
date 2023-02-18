<template>
  <UpsertForm @create="createUser" />
</template>

<script>
import UpsertForm from "@/components/UpsertForm.vue";
import api from "@/services/api";
import { useRouter } from "vue-router";

export default {
  name: "CreateUser",
  components: {
    UpsertForm,
  },
  setup() {
    const router = useRouter();
    const createUser = async (data) => {
      try {
        const res = await api.createUser(data);
        if (res) {
          router.push("/");
        }
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
