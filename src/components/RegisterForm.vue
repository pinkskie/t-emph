<template>
  <div class="Auth">
    <form class="form">
      <div class="form-title">
        <h1>Register</h1>
        <p>
          Already have an account ?
          <router-link to="/" class="link">Sign in</router-link>
        </p>
      </div>
      <div class="form-inputs">
        <div class="form-inputs-item">
          <input type="text" placeholder="Username" />
          <p class="error">Field is required*</p>
        </div>
        <div class="form-inputs-item">
          <input type="text" placeholder="FirstName" />
          <p class="error">Field is required*</p>
        </div>
        <div class="form-inputs-item">
          <input type="text" placeholder="LastName" />
          <p class="error">Field is required*</p>
        </div>
        <div class="form-inputs-item">
          <input type="passtextword" placeholder="Email" />
          <p class="error">Field is required*</p>
        </div>
        <div class="form-inputs-item">
          <input type="password" placeholder="Password" />
          <p class="error">Field is required*</p>
        </div>
        <div class="form-inputs-item">
          <input type="tel" placeholder="Phone" />
          <p class="error">Field is required*</p>
        </div>
        <button>Sign up</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
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
        padding: 0.5rem 1rem;
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
    button {
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      min-width: 40%;
      height: auto;
      padding: 0.65rem 1.25rem;
      border: none;
      outline: none;
      border-radius: 2rem;
      color: white;
      background: #1a73e8;
    }
  }
}
</style>
