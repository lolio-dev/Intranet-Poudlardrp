import { useFetch } from "./useFetch";
import { ref } from "vue";
import { AllSanctions } from "../types/AllSanctions";
import { router, useRouteCustom } from "../router";
import { Player } from "../types/Player";
import { useToasts } from "./useToasts";
import { Commentary } from "../types/Commentary";

export const usePlayer = (playerUUID: string) => {
  const player = ref<Player>();

  const { route } = useRouteCustom();
  const { toastSuccess } = useToasts();

  const loadPlayer = async () => {
    const res = await useFetch<Player>(`/players/${playerUUID}`);
    player.value = res.data;
  }

  const getDynamicInfo = async () => {
    const res = await useFetch(`/players/info/${playerUUID}`);
    return res.data;
  }

  const redirectToPage = () => {
    return router.push({ name: 'player', params: { playerUUID } });
  }

  const setQuest = async (questId: number, stepId: number) => {
    await useFetch(`/players/quest/set/${playerUUID}`, 'POST', {
      data: {
        questId,
        stepId
      }
    })
  }

  const reloadQuest = async () => {
    await useFetch(`/players/quest/reload/${playerUUID}`);
  }

  const nextStep = async () => {
    await useFetch(`/players/quest/nextStep/${playerUUID}`);
  }

  const skipQuest = async () => {
    await useFetch(`/players/quest/skip/${playerUUID}`);
  }

  const getInfo = async () => {
    await useFetch(`/players/info/${playerUUID}`);
  }

  const banPlayer = async (reason: string, duration: number) => {
    await useFetch(`/players/sanctions/ban/${playerUUID}`, 'POST', {
      data: { reason, duration }
    });

    toastSuccess("Joueur banni")

    if (route?.value.name === 'player') {
      return location.reload()
    }
  }

  const banDefPlayer = async (reason: string) => {
    await useFetch(`/players/sanctions/bandef/${playerUUID}`, 'POST', {
      data: { reason }
    });

    toastSuccess("Joueur banni définitivement")

    if (route?.value.name === 'player') {
      return location.reload()
    }
  }

  const mutePlayer = async (reason: string, duration: number) => {
    await useFetch(`/players/sanctions/mute/${playerUUID}`, 'POST', {
      data: { reason, duration }
    });

    toastSuccess("Joueur mute")

    if (route?.value.name === 'player') {
      return location.reload()
    }
  }

  const kickPlayer = async (reason: string) => {
    await useFetch(`/players/sanctions/kick/${playerUUID}`, 'POST', {
      data: { reason }
    });

    toastSuccess("Joueur kick")

    if (route?.value.name === 'player') {
      return location.reload()
    }
  }

  const unmutePlayer = async (reason: string) => {
    await useFetch(`/players/sanctions/unmute/${playerUUID}`, 'POST', {
      data: { reason }
    });

    toastSuccess("Joueur unmute")

    if (route?.value.name === 'player') {
      return location.reload()
    }
  }

  const unbanPlayer = async (reason: string) => {
    await useFetch(`/players/sanctions/unban/${playerUUID}`, 'POST', {
      data: { reason }
    });

    toastSuccess("Joueur unban")

    if (route?.value.name === 'player') {
      return location.reload()
    }
  }

  const getSanctions = async (): Promise<AllSanctions> => {
    const res = await useFetch<AllSanctions>(`players/sanctions/${playerUUID}`);

    res.data.kicks = res.data.kicks.map(kick => ({ ...kick, date: new Date(kick.date) })).reverse();
    res.data.bans = res.data.bans.map(ban => ({ ...ban, date: new Date(ban.date), end: new Date(ban.end) })).reverse();
    res.data.mutes = res.data.mutes.map(mute => ({
      ...mute,
      date: new Date(mute.date),
      end: new Date(mute.end)
    })).reverse();

    return res.data;
  }

  const getComments = async () => {
    const res = await useFetch<Commentary[]>(`commentaries/${playerUUID}`);
    res.data = res.data.map(comment => ({ ...comment, createdAt: new Date(comment.createdAt) }));
    return res.data;
  }

  const addComment = async (content: string) => {
    await useFetch(`commentaries`, 'POST', {
      data: { content, target: playerUUID }
    });
  }

  const removeComment = async (commentId: string) => {
    await useFetch(`commentaries/${commentId}`, 'DELETE');
  }

  return {
    player,
    loadPlayer,
    banPlayer,
    mutePlayer,
    kickPlayer,
    unbanPlayer,
    unmutePlayer,
    getSanctions,
    getComments,
    addComment,
    removeComment,
    reloadQuest,
    skipQuest,
    nextStep,
    setQuest,
    getInfo,
    redirectToPage,
    getDynamicInfo,
    banDefPlayer
  }
}
