<script lang='ts' setup>
import View from "./View.vue";
import Badge from "../components/elements/Badge.vue";
import { Colors } from "../enums/Colors";
import '@vuepic/vue-datepicker/dist/main.css';
import { computed, onMounted, ref } from "vue";
import { usePlayer } from "../composables/usePlayer";
import { AllSanctions } from "../types/AllSanctions";
import { storeToRefs } from "pinia";
import { usePlayerModalsStore } from "../stores/player-modals.store";
import { Commentary } from "../types/Commentary";
import { requiredValue } from "../utils/form-rules";
import SpeechBubble from "../components/elements/SpeechBubble.vue";
import { useToasts } from "../composables/useToasts";

interface Props {
  playerUUID: string;
}

const { playerUUID } = defineProps<Props>();
const sanctions = ref<AllSanctions>();

const comments = ref<Commentary[]>([]);
const newComment = ref<string>("");

const { toastSuccess } = useToasts();

const { player, loadPlayer, getSanctions, getComments, addComment, removeComment } = usePlayer(playerUUID);
const { options, modalsState } = storeToRefs(usePlayerModalsStore());
const { handleBan, handleMute, handleKick, handleUnban, handleUnmute } = usePlayerModalsStore();

onMounted(async () => {
  sanctions.value = await getSanctions();
  comments.value = await getComments();
  await loadPlayer();
  options.value = {
    playerId: playerUUID,
    playerName: "player"
  }
});

const postComment = async () => {
  if (!newComment.value || newComment.value.trim().length == 0) {
    return;
  }
  await addComment(newComment.value.trim());
  toastSuccess("Commentaire ajouté");
  comments.value = await getComments();
  newComment.value = "";
}

const deleteComment = async (commentId: string) => {
  await removeComment(commentId);
  toastSuccess("Commentaire supprimé");
  comments.value = await getComments();
}

const isABanActive = computed(() => {
  if (sanctions.value) {
    const lastBan = sanctions.value?.bans[0]
    return (lastBan?.end > new Date().getTime() && !lastBan?.revoked) || (lastBan?.definitive && !lastBan?.revoked);
  }
});

const isAMuteActive = computed(() => {
  if (sanctions.value) {
    const lastMute = sanctions.value?.mutes[0]
    return lastMute?.end > new Date().getTime() && !lastMute?.revoked;
  }
});
</script>

<template>
  <View>
    <div v-if="player">
      <div class="flex gap-12 items-center mb-12">
        <img :src="`https://crafthead.net/avatar/${playerUUID}`" alt="skin image"
             class="w-44 h-44">
        <div class="flex flex-col gap-3">
          <h1 class="text-5xl font-bold">{{ player.name }}</h1>
          <h3 class="text-2xl">{{ playerUUID }}</h3>
        </div>
      </div>

      <div class="flex gap-5 mb-12 flex-wrap">
        <Badge
            v-if="player.rank !== 'Default' && player.rank"
            :iconColor="Colors.WHITE"
            :subtitle="player.rank"
            backgroundColor="#0369a1"
            icon="io-person-sharp"
            title="Membre du staff"
        />
        <Badge
            v-if="player.quests.actives[0]"
            :iconColor="Colors.WHITE"
            :subtitle="`${player.quests.actives[0].questId} | étape ${player.quests.actives[0].stepId}`"
            backgroundColor="#15803d"
            icon="fa-shield-alt"
            title="Quête active"
        />
        <Badge
            v-if="player.house"
            :iconColor="Colors.WHITE"
            :subtitle="player.house"
            backgroundColor="#000000"
            icon="ri-hotel-bed-fill"
            title="Maison"
        />
        <Badge
            :iconColor="Colors.WHITE"
            :subtitle="player.blood"
            backgroundColor="#b91c1c"
            icon="md-bloodtype"
            title="Sang"
        />
      </div>

      <div class="flex flex-col mb-12 gap-6">
        <div>
          <h4 class="text-4xl mb-4">Commentaires</h4>

          <div v-if="comments.length" class="flex justify-between flex-col max-w-2xl">
            <SpeechBubble v-for="comment in comments" @delete="deleteComment(comment.id)" :data="{
              content: comment.content,
              when: comment.createdAt,
              poster: {
                username: comment.staff.mcNickname,
                avatar: comment.staff.picture,
              }
            }"></SpeechBubble>
          </div>
          <p v-else>Aucun commentaire</p>

          <v-form @submit.prevent="postComment">
            <v-text-field
              v-model="newComment"
              label="Nouveau commentaire"
              multi-line
              rows="3"
              class="mb-4 mt-3"
              :rules="[requiredValue]"
              hint="Ce commentaire sera visible par les membres du staff"
            ></v-text-field>
            <v-btn color="primary" type="submit">Ajouter</v-btn>
          </v-form>
        </div>
        <div class="flex flex-col gap-4">
          <h4 class="text-4xl mb-4">Sanctions</h4>

          <div v-if="sanctions" class="flex flex-col gap-6">
            <div class="w-full">
              <div class="flex justify-between mb-4">
                <h4 class="text-2xl">Historique de ban</h4>
                <v-btn
                    v-if="!isABanActive"
                    color="primary"
                    @click="handleBan(player.uuid, player.name)"
                >
                  Bannir
                </v-btn>
                <v-btn
                    v-else
                    color="error"
                    @click="handleUnban(player.uuid, player.name)"
                >
                  Unban
                </v-btn>
              </div>
              <v-table v-if="sanctions.bans.length">
                <thead>
                <tr>
                  <th class="text-left">
                    Date
                  </th>
                  <th class="text-left">
                    Raison
                  </th>
                  <th class="text-left">
                    Modérateur
                  </th>
                  <th class="text-left">
                    Fin
                  </th>
                  <th class="text-left">
                    Définitif
                  </th>
                  <th class="text-left">
                    Révoqué
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="ban in sanctions.bans">
                  <td>{{ ban.date.toLocaleDateString('fr') }} {{ ban.date.toLocaleTimeString('fr') }}</td>
                  <td>{{ ban.reason }}</td>
                  <td>{{ ban.staff }}</td>
                  <td>{{ ban.end.toLocaleDateString('fr') }} {{ ban.end.toLocaleTimeString('fr') }}</td>
                  <td>{{ ban.definitive ? "Oui" : "Non" }}</td>
                  <td>{{ ban.revoked ? "Oui" : "Non" }}</td>
                </tr>
                </tbody>
              </v-table>
              <p v-else>Aucune sanction de ce type</p>
            </div>
            <div class="w-full">
              <div class="flex justify-between mb-4">
                <h4 class="text-2xl">Historique de mute</h4>
                <v-btn
                    v-if="!isAMuteActive"
                    color="primary"
                    @click="handleMute(player.uuid, player.name)"
                >
                  Mute
                </v-btn>
                <v-btn
                    v-else
                    color="error"
                    @click="handleUnmute(player.uuid, player.name)">
                  Unmute
                </v-btn>
              </div>

              <v-table v-if="sanctions.mutes.length">
                <thead>
                <tr>
                  <th class="text-left">
                    Date
                  </th>
                  <th class="text-left">
                    Raison
                  </th>
                  <th class="text-left">
                    Modérateur
                  </th>
                  <th class="text-left">
                    Fin
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="mute in sanctions.mutes">
                  <td>{{ mute.date.toLocaleDateString('fr') }} {{
                      mute.date.toLocaleTimeString('fr')
                    }}
                  </td>
                  <td>{{ mute.reason }}</td>
                  <td>{{ mute.staff }}</td>
                  <td>{{ mute.end.toLocaleDateString('fr') }} {{ mute.end.toLocaleTimeString('fr') }}</td>
                </tr>
                </tbody>
              </v-table>
              <p v-else>Aucune sanction de ce type</p>
            </div>
            <div class="w-full">
              <div class="flex justify-between mb-4">
                <h4 class="text-2xl">Historique de kick</h4>
                <v-btn color="primary" @click="handleKick(player.uuid, player.name)">Kick</v-btn>
              </div>

              <v-table v-if="sanctions.kicks.length">
                <thead>
                <tr>
                  <th class="text-left">
                    Date
                  </th>
                  <th class="text-left">
                    Raison
                  </th>
                  <th class="text-left">
                    Modérateur
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="kick in sanctions.kicks">
                  <td>{{ kick.date.toLocaleDateString('fr') }} {{
                      kick.date.toLocaleTimeString('fr')
                    }}
                  </td>
                  <td>{{ kick.reason }}</td>
                  <td>{{ kick.staff }}</td>
                </tr>
                </tbody>
              </v-table>
              <p v-else>Aucune sanction de ce type</p>
            </div>
          </div>
          <div v-else class="flex justify-center">
            <v-progress-circular :size="50" :width="5" color="primary" indeterminate/>
          </div>
        </div>

        <div>
          <h4 class="text-4xl mt-4 mb-4">Historique de connexion</h4>

          <v-btn color="primary" @click="modalsState.showConnectionTimeModal = true">Afficher l'historique de connexion
          </v-btn>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center">
      <v-progress-circular :size="50" :width="5" color="primary" indeterminate/>
    </div>
  </View>
</template>
