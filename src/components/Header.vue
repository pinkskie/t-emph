<template>
  <div class="wrapper">
    <div class="header">
      <router-link to="/" class="logo">Logo</router-link>
      <div class="user" @click="toggleMenu">
        <img
          :src="require('../assets/avatar.png')"
          class="avatar"
          alt="avatar"
        />
        <Transition>
          <div class="menu" v-show="isMenuActive">
            <button class="logout-btn" @click="logout">Logout</button>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import { ref } from "vue";

export default {
  name: "Header",
  setup() {
    const isMenuActive = ref(false);

    const toggleMenu = () => {
      isMenuActive.value = !isMenuActive.value;
    };

    const logout = () => {
      api.logout();
      window.location.reload();
    };

    return {
      isMenuActive,
      toggleMenu,
      logout,
    };
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #1a73e8;
  z-index: 10;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin: 0 auto;
}

.logo {
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.5rem;
  cursor: pointer;
}
.user {
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  transition: 0.2s ease;
  margin-left: auto;
  position: relative;
}
.avatar {
  width: 2rem;
  height: 2rem;
  transition: 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
}

.menu {
  position: absolute;
  right: -5.5rem;
}
.logout-btn {
  padding: 0.2rem 1rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  background-color: white;
  transition: 0.2s ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
}

@media screen and (max-width: 762px) {
  .header {
    width: 90%;
  }
  .menu {
    right: initial;
    left: -5.5rem;
  }
}
</style>
