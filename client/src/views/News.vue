<script lang="ts" setup>
import View from "./View.vue";
import { VDataTable } from "vuetify/labs/VDataTable"
import { storeToRefs } from "pinia";
import { useNewsStore } from "../stores/news.store";
import { onMounted } from "vue";
import NewsModal from "../components/modals/NewsModal.vue";
import NewsType from "../types/News";

const headers = [
  { title: "Titre", key: "title" },
  { title: "Date", key: "date" },
  { title: "Publié", key: "status" },
  { title: "Actions", key: "actions" }
]

const newsStore = useNewsStore();
const { searchNewsValue, loading, news, showNewsModal, modalScope, selectedNews } = storeToRefs(newsStore);
const { loadAllNews, updateNews, archiveNews } = newsStore;

const formatedDate = (date: Date | number) => {
  if (typeof date === 'number') {
    return new Date(date).toLocaleDateString('fr');
  }
  return date.toLocaleDateString('fr');
}

onMounted(() => {
  loadAllNews();
});

const handleEdit = (newsId: string) => {
  modalScope.value = 'update';
  if (news.value) {
    selectedNews.value = news.value.find((actualNews: NewsType) => actualNews.newsId === newsId);
  }
  showNewsModal.value = true
}

const handleCreate = () => {
  modalScope.value = 'create';
  showNewsModal.value = true
}
</script>

<template>
  <View
      title="News"
  >
    <div class="flex gap-8">
      <v-text-field
          v-model="searchNewsValue"
          append-inner-icon="md:search"
          color="primary"
          density="compact"
          label="Rechercher une valeur"
      />
      <v-btn
          class="h-full"
          color="primary"
          @click="handleCreate"
      >
        Nouvelle news
      </v-btn>
    </div>
    <v-data-table
        :headers="headers"
        :items="news"
        item-value="newsId"
        :search="searchNewsValue"
    >
      <template v-slot:item.date="{ item }">
        {{ formatedDate(item.columns.date) }}
      </template>
      <template v-slot:item.status="{ item }">
        <v-checkbox-btn :model-value="item.columns.status === 'ENABLE'"
                        @click="updateNews(item.value, { status: item.columns.status === 'DISABLE' ? 'ENABLE' : 'DISABLE' })"/>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="flex gap-4">
          <v-icon
              icon="md:edit"
              @click="handleEdit(item.value)"
          />
          <v-icon
              icon="md:delete"
              @click="archiveNews(item.value)"
          />
        </div>
      </template>
    </v-data-table>
  </View>
  <NewsModal v-model="showNewsModal" scope="create"/>
</template>
