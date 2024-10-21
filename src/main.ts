import { createApp } from "vue"
import App from "./App.vue"
import "./index.css"
import "./assets/index.css"
import { router } from "./pages/routes/routes"
import {
  MutationCache,
  QueryCache,
  QueryClient,
  VueQueryPlugin,
  VueQueryPluginOptions,
} from "@tanstack/vue-query"
import { handleErrorNotification } from "./shared/lib/error-analyzer"

export const tanstackQueryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error, query) {
      handleErrorNotification({ error, name: query.options.meta?.context })
    },
  }),
  mutationCache: new MutationCache({
    onError(error, variables, context, mutation) {
      handleErrorNotification({ error, name: mutation.options.meta?.context })
    },
  }),
})
const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient: tanstackQueryClient,
}

createApp(App)
  .use(router)
  .use(VueQueryPlugin, vueQueryPluginOptions)
  .mount("#app")

console.log("TEst")