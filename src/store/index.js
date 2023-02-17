import { createStore } from "vuex";
import { userModule } from "./modules/user.module";

export default createStore({
  modules: {
    userModule,
  },
});
