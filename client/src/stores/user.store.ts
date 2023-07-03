import { defineStore } from "pinia";
import { ref } from "vue";
import { useFetch } from "../composables/useFetch";
import { useNavigate } from "../composables/useNavigate";
import { useToasts } from "../composables/useToasts";
import { User } from "../types/User";
import { clearSessionStorage } from "../utils/sesionStorage";
import { useSnackbarStore } from "./snackbar.store";

export const useUserStore = defineStore('user', () => {
	const user = ref<User>();
	const { toastError, toastSuccess } = useToasts();
  const {setSnackbarTo } = useSnackbarStore();

  const getPersistantToken = async (
      token: string
  ): Promise<string | undefined> => {
    const { data } = await useFetch("/users/@me/token", "GET", {
        overrideToken: `Bearer ${token}`
    });
    return data.token;
  };

  const loadUser = async () => {
    try {
      const { data } = await useFetch("/users/@me", "GET");
      user.value = data;
      
      if(!user.value?.uuid) {
        setSnackbarTo(true);
      }
    } catch (e) {
      clearSessionStorage();
      useNavigate('login')
    }
  };

  const logout = () => {
    clearSessionStorage();
    useNavigate('login')
  };

	const patch = async (patcher: Partial<User>) => {
		try {
			await useFetch("/users/@me/patch", "PATCH", {
				data: { ...patcher }
			})
			toastSuccess("Paramètres enregistrés")
		} catch (error: any) {
			toastError(error);
		}
	}

	return { user, loadUser, getPersistantToken, logout, patch };
});
