import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "./assets/index.css";
import { router } from "./pages/routes/routes";
import {
  QueryClient,
  VueQueryPlugin,
  VueQueryPluginOptions,
} from "@tanstack/vue-query";

export const tanstackQueryClient = new QueryClient();
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient: tanstackQueryClient,
};

createApp(App)
  .use(router)
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .mount("#app");
