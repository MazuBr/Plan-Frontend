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
      await restClient.user.createUserUserCreatePost(payload)
    ).data;
    user.value = createUserData;
    router.push({ name: "dashboard" });
  }

  async function checkSession() {
    try {
      await restClient.user.checkSessionUserCheckSessionPost();
      isAuth.value = true;

      // TODO resume session properly
      if (router.currentRoute.value.fullPath.includes("/login")) {
        router.push({ name: "dashboard" });
      }
    } catch (e) {
      isAuth.value = false;
    }
  }

  async function login(payload: LoginRequest) {
    await restClient.user.loginUserLoginPost(payload);
    await checkSession();
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
    register,
  };
});
