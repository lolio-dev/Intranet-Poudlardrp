<script lang='ts' setup>
import View from "./View.vue";
import { onMounted, ref, watch } from "vue";
import { ProhibitedWord } from "../types/ProhibitedWord";
import { useProhibitedWordStore } from "../stores/prohibited-word.store";
import { storeToRefs } from "pinia";

const searchWordsValue = ref<string>("");
const loading = ref<boolean>(false);

const prohibitedWordsStore = useProhibitedWordStore();
const { onChange, deleteWord } = prohibitedWordsStore;
const { words, selectedWord, showAddWordModal, showEditWordModal } = storeToRefs(prohibitedWordsStore);

onMounted(async () => {
  onChange(searchWordsValue.value);
});

watch(searchWordsValue, () => {
  onChange(searchWordsValue.value);
})

const editWord = (word: ProhibitedWord) => {
  selectedWord.value = word;
  showEditWordModal.value = true;
}

const handleDelete = (wordId: string) => {
  deleteWord(wordId);
}
</script>

<template>
  <View
      subtitle="釆Я&µ%!"
      title="Mots interdits"
  >
    <div class="flex gap-8">
      <v-text-field
          v-model="searchWordsValue"
          :loading="loading"
          append-inner-icon="md:search"
          color="primary"
          density="compact"
          placeholder="Rechercher une valeur"
      />
      <v-btn
          class="h-full"
          color="primary"
          @click="showAddWordModal = true"
      >
        Nouvelle valeur
      </v-btn>
    </div>
    <v-table v-if="words">
      <thead>
      <tr>
        <th>Id</th>
        <th>Valeur</th>
        <th>Remplacement</th>
        <th>Editer</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(word, index) in words"
          :key="word.id"
          class="h-16"
      >
        <td>{{ index }}</td>
        <td>{{ word.value }}</td>
        <td>{{ word.replacementValue }}</td>
        <td>
          <div class="flex gap-4">
            <v-icon
                icon="md:edit"
                @click="editWord(word)"
            />
            <v-icon
                icon="md:delete"
                @click="handleDelete(word.id)"
            />
          </div>
        </td>
      </tr>
      </tbody>
    </v-table>
    <div v-else class="flex justify-center">
      <v-progress-circular :size="50" :width="5" color="primary" indeterminate/>
    </div>
  </View>
</template>


<style scoped>

</style>
