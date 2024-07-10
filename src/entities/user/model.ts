import { computed, ref } from "vue";
import { createGlobalState } from "@vueuse/core";
import { router } from "../../pages/routes/routes";

export const useSessionState = createGlobalState(() => {
  const user = ref("");
  const accessToken = ref<string | null>(null);

  const isAuth = computed(() => !!accessToken.value);

  function login() {
    accessToken.value = "test";

    router.push({ name: "dashboard" });
  }

  function logout() {
    accessToken.value = null;

    router.push({ name: "login" });
  }

  return {
    user,
    accessToken,
    isAuth,
    login,
    logout,
  };
});
