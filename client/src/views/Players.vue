<script lang="ts" setup>
import View from '@/views/View.vue'
import { onMounted, ref } from 'vue';
import { useFetch } from '../composables/useFetch';
import { debounce } from 'lodash'
import { Player } from '../types/Player'
import { useRouter } from "vue-router";
import { usePlayer } from "../composables/usePlayer";

import { VDataTable } from "vuetify/labs/VDataTable"
import { Quest } from '../types/Quest';

const players = ref<Player[]>()
const search = ref("")
const loading = ref(false);

const router = useRouter();

onMounted(async () => {
  //Initialize the array
  onChange();
})

const onChange = debounce(async () => {
  loading.value = true;
  const res = await useFetch<Player[]>(
    `/players/search`,
    'POST',
    {
      data: {
        name: search.value
      }
    }
  );
  players.value = res.data;
  loading.value = false;
}, 500);

const handleNav = (_: any, { item }: any) => {
  usePlayer(item.props.title.uuid).redirectToPage();
}

const headers = [
  { title: 'Pseudo', key: 'name' },
  { title: 'Uuid', key: 'uuid' },
  { title: 'Rang', key: 'rank' },
  { title: 'Maison', key: 'house' },
  { title: 'Sang', key: 'blood' },
  { title: 'Quêtes Actives', key: 'quests', sortable: false }
]

</script>

<template>
  <View title="Joueurs">
    <v-text-field
        v-model="search"
        :loading="loading"
        append-inner-icon="md:search"
        class="px-[8px]"
        color="primary"
        label="Cherchez le pseudo d'un joueur"
        variant="underlined"
        @update:model-value="onChange"
    />
    <v-data-table
        :headers="headers"
        :items="players"
        :search="search"
        @click:row="handleNav"
    >
      <template v-slot:item.quests="{ item }">
        {{ (item as any).props.title.quests.actives.map((q: Quest) => q.questId).join(" ;") }}
      </template>
    </v-data-table>
-  </View>
</template>
