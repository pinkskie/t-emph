<template>
  <div class="Upsert fullPage">
    <form class="form" @submit.prevent="submitForm">
      <div class="form-title">
        <h1>{{ isCreate ? "Create new user" : "Update user" }}</h1>
      </div>
      <div class="form-inputs">
        <div class="form-inputs-item">
          <TextField
            type="text"
            v-model:input="values.username"
            placeholder="Username"
          />
          <span class="error" v-if="v$.username.$error">
            {{ v$.username.$errors[0]?.$message }}
          </span>
        </div>
        <div class="form-inputs-item">
          <TextField
            type="text"
            v-model:input="values.firstName"
            placeholder="FirstName"
          />

          <span class="error" v-if="v$.firstName.$error">
            {{ v$.firstName.$errors[0]?.$message }}
          </span>
        </div>
        <div class="form-inputs-item">
          <TextField
            type="text"
            v-model:input="values.lastName"
            placeholder="LastName"
          />
          <span class="error" v-if="v$.lastName.$error">
            {{ v$.lastName.$errors[0]?.$message }}
          </span>
        </div>
        <div class="form-inputs-item">
          <TextField
            type="password"
            v-model:input="values.password.password"
            placeholder="Password"
          />
          <span class="error" v-if="v$.password.$error">
            {{ v$.password.password.$errors[0]?.$message }}
          </span>
        </div>
        <div class="form-inputs-item">
          <TextField
            type="password"
            v-model:input="values.password.confirm"
            placeholder="Confirm password"
          />

          <span class="error" v-if="v$.password.confirm.$error">
            {{ v$.password.confirm.$errors[0]?.$message }}
          </span>
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
import TextField from "./TextField.vue";

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
  components: {
    TextField,
  },
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
        this.router.push({ path: "/" });
      }
    },
  },
};
</script>
