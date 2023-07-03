import { defineStore } from "pinia";
import { ref } from "vue";
import { useFetch } from "../composables/useFetch";
import { web_api_uri } from "../constants";
import News from "../types/News";
import { useToasts } from "../composables/useToasts";

export const useNewsStore = defineStore('news', () => {
  const news = ref<News[]>();
  const searchNewsValue = ref<string>("");
  const loading = ref<boolean>(false);
  const selectedNews = ref<News>();
  const showNewsModal = ref<boolean>(false);
  const modalScope = ref<'create' | 'update'>('create');

  const { toastSuccess } = useToasts();

  const loadAllNews = () => {
    useFetch('/news', 'GET', {}, web_api_uri)
      .then((data) => news.value = data.data.map((actualNews: News) => ({
        ...actualNews,
        date: new Date(Number(actualNews.date))
      })))
  }

  const addNews = (news: Omit<News, 'newsId'>) => {
    useFetch('/news', 'POST', {
      data: news
    }, web_api_uri)
      .then(() => {
        loadAllNews();
        toastSuccess("News ajoutée");
      })
  }

  const updateNews = (newsId: string, newValue: Partial<News>, reloadData: boolean = false) => {
    useFetch(
      `/news/${newsId}`,
      'PATCH',
      { data: newValue },
      web_api_uri
    )
      .then(() => {
        toastSuccess("News mise à jour");
        news.value = news.value?.map((actualNews: News) => {
          if (actualNews.newsId === newsId) {
            return { ...actualNews, ...newValue };
          }
          return { ...actualNews }
        })
        if (reloadData) {
          loadAllNews();
        }
      })
  }

  const archiveNews = (newsId: string) => {
    useFetch(
      `/news/${newsId}/archive`,
      'POST',
      {},
      web_api_uri
    ).then(() => {
      loadAllNews();
      toastSuccess("Element archivé")
    });
  }

  return {
    news,
    searchNewsValue,
    loading,
    selectedNews,
    showNewsModal,
    modalScope,
    loadAllNews,
    addNews,
    updateNews,
    archiveNews
  }
})
