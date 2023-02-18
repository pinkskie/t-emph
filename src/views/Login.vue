<template>
  <AuthForm @submit="login" />
</template>

<script>
import api from "@/services/api";
import AuthForm from "../components/AuthForm.vue";
import { useRouter } from "vue-router";

export default {
  name: "Login",
  components: {
    AuthForm,
  },
  setup() {
    const router = useRouter();
    if (localStorage.getItem("token")) {
      router.push("/");
      return;
    }
    const login = async (data) => {
      try {
        const res = await api.login(data);
        if (res) {
          localStorage.setItem("token", JSON.stringify(res));
          window.location.reload();
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    return {
      login,
    };
  },
};
</script>
