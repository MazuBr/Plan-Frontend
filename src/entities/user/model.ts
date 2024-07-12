import { computed, ref } from "vue";
import { createGlobalState } from "@vueuse/core";
import { router } from "../../pages/routes/routes";
import { restClient } from "@/shared/api/base";
import { LoginRequest, UserCreate } from "@/shared/api/restApi";

export const useSessionState = createGlobalState(() => {
  const user = ref();
  const accessToken = ref<string | null>(null);

  const isAuth = computed(() => !!accessToken.value);

  function setJwt(token: string | null) {
    if (token) {
      localStorage.setItem("jwt", token);
    } else {
      localStorage.removeItem("jwt");
    }
    accessToken.value = token;
  }

  async function register(payload: UserCreate) {
    const createUserData = (
      await restClient.user.createUserUserCreatePost(payload)
    ).data;
    setJwt(createUserData.token_data.token);
    user.value = createUserData;
    router.push({ name: "dashboard" });
  }

  async function login(payload: LoginRequest) {
    const loginData = (await restClient.user.loginUserLoginPost(payload)).data;

    setJwt(loginData.token);
    router.push({ name: "dashboard" });
  }

  async function logout() {
    await restClient.user.logoutUserUserLogoutPost();
    setJwt(null);
    router.push({ name: "login" });
  }

  return {
    user,
    accessToken,
    isAuth,
    login,
    logout,

    register,
    setJwt,
  };
});
