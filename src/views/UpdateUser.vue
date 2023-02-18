<template>
  <UpsertForm @update="updateUser" v-if="user" :user="user" />
</template>

<script>
import { onMounted, ref } from "vue";
import UpsertForm from "@/components/UpsertForm.vue";
import api from "@/services/api";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "UpdateUser",
  components: {
    UpsertForm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const userId = ref(route.params.id);
    const user = ref(null);

    const updateUser = async (id, data) => {
      try {
        const res = await api.updateUser(id, data);
        if (res) {
          router.push("/");
        }
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(async () => {
      if (userId.value) {
        user.value = await api.getUserById(userId.value);
      }
    });

    return {
      user,
      updateUser,
    };
  },
};
</script>
