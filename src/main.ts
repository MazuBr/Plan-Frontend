import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "./assets/index.css";
import { router } from "./pages/routes/routes";

createApp(App).use(router).mount("#app");
