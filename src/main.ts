import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "./assets/index.css";
import { router } from "./pages/routes/routes";
import { VueQueryPlugin } from "@tanstack/vue-query";

createApp(App).use(router).use(VueQueryPlugin).mount("#app");
