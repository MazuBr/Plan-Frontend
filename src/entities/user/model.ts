import { computed, ref } from "vue";
import { createGlobalState } from "@vueuse/core";
import { router } from "../../pages/routes/routes";
import { restClient } from "@/shared/api/base";
import { LoginRequest, UserCreate } from "@/shared/api/restApi";

export const useSessionState = createGlobalState(() => {
  const user = ref();

  const isAuth = ref(false);

  async function register(payload: UserCreate) {
    const createUserData = (
      await restClient.user.createUserUserCreatePost(payload, {
        skipAuth: true,
      })
    ).data;
    user.value = createUserData;
    router.push({ name: "home" });
  }

  async function checkSession() {
    // @deprecated
  }

  async function login(payload: LoginRequest) {
    const data = await restClient.user.loginUserLoginPost(payload, {
      skipAuth: true,
    });
    localStorage.setItem("jwt", data.data.access_token.token);
    isAuth.value = true;

    // TODO resume session properly
    if (router.currentRoute.value.fullPath.includes("/login")) {
      router.push({ name: "home" });
    }

    await checkSession();
  }

  function logoutWithoutRequest() {
    localStorage.removeItem("jwt");
    window.location.replace("/login");
  }

  async function logout() {
    await restClient.user.logoutUserUserLogoutPost();
    await checkSession();
    isAuth.value = false;
    router.push({ name: "login" });
  }

  return {
    user,
    isAuth,
    login,
    logout,

    checkSession,
    logoutWithoutRequest,
    register,
  };
});
