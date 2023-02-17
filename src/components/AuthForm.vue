<template>
  <div class="Auth">
    <form class="form" @submit.prevent="submitForm">
      <div class="form-title">
        <h1>Sign in</h1>
      </div>
      <div class="form-inputs">
        <input type="text" v-model="state.username" placeholder="Username" />
        <span v-if="v$.username.$error" class="error">
          {{ v$.username.$errors[0].$message }}
        </span>
        <input
          type="password"
          v-model="state.password"
          placeholder="Password"
        />
        <span v-if="v$.password.$error" class="error">
          {{ v$.password.$errors[0].$message }}
        </span>
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

export default {
  name: "AuthForm",
  emits: ["submit"],
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

<style lang="scss">
.form {
  max-width: 28rem;
  width: 100%;
  margin: calc(100vh / 2 - 14rem) auto;
  padding: 2rem 2.5rem;
  border: none;
  outline: none;
  border-radius: 0.25rem;
  color: black;
  background: white;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  &-title {
    text-align: left;
    margin-bottom: 2rem;
    .link {
      color: #1a73e8;
    }
  }
  &-inputs {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin: 0 auto;
    input {
      font-size: 1rem;
      font-weight: 400;
      line-height: inherit;
      width: 100%;
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
    .error {
      color: red;
      font-size: 0.8rem;
      margin-top: -0.5rem;
      margin-left: 1rem;
      align-self: flex-start;
    }
  }
}

@media screen and (max-width: 762px) {
  .Auth {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .form {
      box-shadow: none;
    }
  }
}
</style>
