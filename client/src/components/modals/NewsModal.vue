<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useNewsStore } from "../../stores/news.store";
import Modal from "../elements/Modal.vue";
import { computed, reactive, watchEffect } from "vue";
import { ModalEmits } from "../../types/ModalEmits";
import { ModalProps } from "../../types/ModalProps";
import News from "../../types/News";
import { requiredValue } from "../../utils/form-rules";
import { useToasts } from "../../composables/useToasts";

const props = defineProps<ModalProps>();
const emit = defineEmits<ModalEmits>();
const newsValues = reactive<{
  title: string,
  subtitle: string,
  text: string,
  date: Date,
  status: boolean,
  image: string
}>({ image: "", date: new Date(), status: false, subtitle: "", text: "", title: "" });

const newsStore = useNewsStore();
const { selectedNews, modalScope, showNewsModal } = storeToRefs(newsStore);
const { updateNews, addNews } = newsStore

const { toastWarning } = useToasts();

const validData = computed(() => modalScope.value === 'update' && selectedNews)

watchEffect(() => {
  Object.assign(newsValues, {
    title: validData.value ? selectedNews.value!.title : "",
    subtitle: validData.value ? selectedNews.value!.subtitle : "",
    text: validData.value ? selectedNews.value!.text : "",
    date: validData.value ? selectedNews.value!.date : new Date(),
    status: validData.value ? (selectedNews.value!.status === 'ENABLE') : false,
    image: validData.value ? (selectedNews.value!.image) : ""
  })
})

const modalName = computed(() => modalScope.value === 'create' ? 'Ajouter une news' : 'Modifier la news');
const primaryActionName = computed(() => modalScope.value === 'create' ? 'Ajouter' : 'Modifier')

const handleSend = () => {
  const values: Omit<News, 'newsId'> = {
    ...newsValues,
    status: newsValues.status ? 'ENABLE' : 'DISABLE',
    date: newsValues.date.getTime(),
  }

  if (modalScope.value === 'update' && selectedNews.value) {
    updateNews(selectedNews.value.newsId, values, true);
  } else {
    addNews(values);
  }

  showNewsModal.value = false;
}

const handleOpenImage = () => window.open(selectedNews.value!.image, '_blank').focus();
</script>

<template>
  <Modal
      v-if="modelValue"
      :title="modalName"
  >
    <form id="news-form" @submit.prevent="handleSend">
      <v-text-field v-model="newsValues.title" label="Titre" :rules="[requiredValue]"/>
      <v-text-field v-model="newsValues.subtitle" label="Sous-titre" :rules="[requiredValue]"/>
      <v-textarea v-model="newsValues.text" label="Contenu" no-resize rows="10" :rules="[requiredValue]"/>
      <v-text-field
          v-model="newsValues.image"
          :append-inner-icon="`${validData ? 'md:open_in_new' : undefined}`"
          label="Image"
          @click:append-inner="handleOpenImage"
          :rules="[requiredValue]"
      />
      <Datepicker v-model="newsValues.date" required/>
      <v-checkbox v-model="newsValues.status" label="Publié" :rules="[requiredValue]"/>
    </form>

    <template #actions>
      <v-btn
          color="primary"
          variant="outlined"
          @click="showNewsModal = false"
      >
        Annuler
      </v-btn>
      <v-btn
          color="primary"
          form="news-form"
          type="submit"
      >
        {{ primaryActionName }}
      </v-btn>
    </template>
  </Modal>
</template>
