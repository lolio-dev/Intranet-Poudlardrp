import { defineStore } from "pinia";
import { ref } from "vue";
import { useFetch } from "../composables/useFetch";
import { useToasts } from "../composables/useToasts";
import { debounce } from "lodash";
import { ProhibitedWord } from "../types/ProhibitedWord";

export const useProhibitedWordStore = defineStore('prohibited-store', () => {
  const words = ref<ProhibitedWord[]>();
  const selectedWord = ref<ProhibitedWord>();
  const seachWordValue = ref<string>("");
  const loading = ref<boolean>();

  const showAddWordModal = ref<boolean>();
  const showEditWordModal = ref<boolean>();

  const { toastSuccess } = useToasts();

  const onChange = debounce(async (value: string) => {
    loading.value = true;
    await loadWordsByValue(value);
    loading.value = false;
  }, 500);

  const loadWordsByValue = async (value: string) => {
    const res = await useFetch<ProhibitedWord[]>(
        '/prohibited-words/search',
        'POST',
        {
          data: {
            value
          }
        }
    );

    words.value = res.data;
  }

  const addWord = async (value: string, replacementValue: string) => {
    await useFetch(
        '/prohibited-words',
        'POST',
        {
          data: {
            value,
            replacementValue
          }
        }
    ).then(async () => {
      showAddWordModal.value = false;
      await showToastAndReload('Valeur ajoutée')
    });
  }

  const editWord = async (word: ProhibitedWord) => {
    await useFetch(
        `/prohibited-words/${word.id}`,
        'PATCH',
        {
          data: word
        }
    ).then(async () => {
      showEditWordModal.value = false;
      await showToastAndReload("Valeur modifié");
    });
  }

  const deleteWord = async (wordId: string) => {
    await useFetch(
        `/prohibited-words/${wordId}`,
        'DELETE',
    ).then(() => showToastAndReload('Valeur supprimée'));
  }

  const showToastAndReload = async (value: string) => {
    toastSuccess(value);
    await loadWordsByValue(seachWordValue.value);
  }

  return { words, loading, selectedWord, showAddWordModal, showEditWordModal, addWord, onChange, editWord, deleteWord }
})
