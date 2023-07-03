import { useFetch } from "./useFetch";
import { Session } from "../types/Session";
import { computed, ref } from "vue";

export const useSessions = () => {
	const selectedDate = ref<Date>();
	const sessions = ref<Session>();

	const status = computed(() => {
		if (!selectedDate.value) {
			return "Aucune date sélectionnée";
		} else if (!sessions.value) {
			return "Aucune session pour la date sélectionnée";
		}
	});

	const loadPlayerSessions = async (playerUUID: string) => {
		const res = await useFetch(`/sessions/${playerUUID}`, 'POST', {
			data: {
				date: selectedDate.value?.getTime()
			}
		});

		sessions.value = res.data.length ? res.data.map((session: any) => ({
			...session,
			login: new Date(session.login),
			logout: new Date(session.logout)
		})) : null;
	};

	return { selectedDate, sessions, status, loadPlayerSessions };
};
