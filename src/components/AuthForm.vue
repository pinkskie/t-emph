<template>
  <div class="Auth fullPage">
    <form class="form" @submit.prevent="submitForm">
      <div class="form-title">
        <h1>Sign in</h1>
      </div>
      <div class="form-inputs">
        <div class="form-inputs-item">
          <TextField
            type="text"
            v-model:input="state.username"
            placeholder="Username"
          />
          <span v-if="v$.username.$error" class="error">
            {{ v$.username.$errors[0].$message }}
          </span>
        </div>
        <div class="form-inputs-item">
          <TextField
            type="password"
            v-model:input="state.password"
            placeholder="Password"
          />
          <span v-if="v$.password.$error" class="error">
            {{ v$.password.$errors[0].$message }}
          </span>
        </div>
        <button type="submit" class="btn">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script>
import useValidate from "@vuelidate/core";
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { required } from "@vuelidate/validators";
import { useRouter } from "vue-router";

import TextField from "./TextField.vue";
export default {
  name: "AuthForm",
  emits: ["submit"],
  components: { TextField },
  setup() {
    const router = useRouter();
    const state = reactive({
      username: "",
      password: "",
    });

    const rules = computed(() => {
      return {
        username: { required },
        password: { required },
      };
    });

    const v$ = useValidate(rules, state);

    return {
      state,
      v$,
      router,
    };
  },
  methods: {
    submitForm() {
      this.v$.$validate();
      if (this.v$.$errors.length === 0) {
        this.$emit("submit", this.state);
      }
    },
  },
};
</script>
