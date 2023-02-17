<template>
  <div class="Auth">
    <form class="form" @submit.prevent="submitForm">
      <div class="form-title">
        <h1>{{ isCreate ? "Create new user" : "Update user" }}</h1>
      </div>
      <div class="form-inputs">
        <div class="form-inputs-item">
          <input type="text" placeholder="Username" v-model="values.username" />
          <p class="error" v-if="v$.username.$error">
            {{ v$.username.$errors[0]?.$message }}
          </p>
        </div>
        <div class="form-inputs-item">
          <input
            type="text"
            placeholder="FirstName"
            v-model="values.firstName"
          />
          <p class="error" v-if="v$.firstName.$error">
            {{ v$.firstName.$errors[0]?.$message }}
          </p>
        </div>
        <div class="form-inputs-item">
          <input type="text" placeholder="LastName" v-model="values.lastName" />
          <p class="error" v-if="v$.lastName.$error">
            {{ v$.lastName.$errors[0]?.$message }}
          </p>
        </div>
        <div class="form-inputs-item">
          <input
            type="password"
            placeholder="Password"
            v-model="values.password.password"
          />
          <p class="error" v-if="v$.password.$error">
            {{ v$.password.password.$errors[0]?.$message }}
          </p>
        </div>
        <div class="form-inputs-item">
          <input
            type="password"
            placeholder="Confirm password"
            v-model="values.password.confirm"
          />
          <p class="error" v-if="v$.password.confirm.$error">
            {{ v$.password.confirm.$errors[0]?.$message }}
          </p>
        </div>
        <button class="btn" type="submit">
          {{ isCreate ? "Create" : "Update" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from "@vue/reactivity";

import useValidate from "@vuelidate/core";
import {
  required,
  sameAs,
  helpers,
  maxLength,
  minLength,
} from "@vuelidate/validators";

export default {
  name: "UpsertForm",
  emits: ["create", "update"],
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const id = route.params.id;
    const isCreate = ref(false);

    const passRegex = helpers.regex(/^(?=.*[A-Z])(?=.*\d).{8,}$/);
    const usernameRegex = helpers.regex(/^[A-Za-z0-9.@+-_]+$/);

    const values = reactive({
      username: "" || props.user?.username,
      password: {
        password: "",
        confirm: "",
      },
      firstName: "" || props.user?.first_name,
      lastName: "" || props.user?.first_name,
    });

    const rules = computed(() => {
      return {
        username: {
          containUsernameRequirement: helpers.withMessage(
            "150 characters or fewer. Letters, digits and @/./+/-/_",
            usernameRegex
          ),
          required,
          maxValue: maxLength(150),
          minLength: minLength(4),
        },
        firstName: { required, maxValue: maxLength(150) },
        lastName: { required, maxValue: maxLength(150) },
        password: {
          password: {
            required,
            containsPasswordRequirement: helpers.withMessage(
              "Password should be 8+ characters, 1 capital, 1 numeric",
              passRegex
            ),
          },
          confirm: { required, sameAs: sameAs(values.password.password) },
        },
      };
    });

    const v$ = useValidate(rules, values);

    onMounted(() =>
      route.name === "CreateUser" ? (isCreate.value = true) : null
    );

    return {
      values,
      v$,
      isCreate,
      router,
      id,
    };
  },
  methods: {
    submitForm() {
      this.v$.$validate();
      if (this.v$.$errors.length === 0) {
        if (this.id) {
          this.$emit("update", this.id, {
            username: this.values.username,
            first_name: this.values.firstName,
            last_name: this.values.lastName,
            password: this.values.password.password,
            is_active: true,
            is_superuser: false,
            last_login: Date.now(),
          });
        } else {
          this.$emit("create", {
            username: this.values.username,
            first_name: this.values.firstName,
            last_name: this.values.lastName,
            password: this.values.password.password,
            is_active: true,
            is_superuser: false,
            last_login: Date.now(),
          });
        }
        this.router.push("/");
      }
    },
  },
};
</script>

<style lang="scss">
.form {
  max-width: 28rem;
  width: 100%;
  margin: calc(100vh / 2 - 25rem) auto;
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
    gap: 1rem;
    margin: 0 auto;
    &-item {
      width: 100%;
      .error {
        text-align: left;
        color: Red;
        font-size: 0.75rem;
        margin-top: 0.5rem;
      }
    }
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
  }
}
</style>
