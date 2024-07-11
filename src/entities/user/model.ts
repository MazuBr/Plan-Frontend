import { computed, ref } from "vue";
import { createGlobalState } from "@vueuse/core";
import { router } from "../../pages/routes/routes";
import { restClient } from "@/shared/api/base";
import { UserCreate } from "@/shared/api/restApi";

export const useSessionState = createGlobalState(() => {
  const user = ref();
  const accessToken = ref<string | null>(null);

  const isAuth = computed(() => !!accessToken.value);

  async function register(payload: UserCreate) {
    const createUserData = (
      await restClient.user.createUserUserCreatePost(payload)
    ).data;
    accessToken.value = createUserData.token_data.token;
    user.value = createUserData;
  }

  async function login() {
    accessToken.value = "test";

    router.push({ name: "dashboard" });
  }

  async function logout() {
    accessToken.value = null;

    router.push({ name: "login" });
  }

  return {
    user,
    accessToken,
    isAuth,
    login,
    logout,

    register,
  };
});
