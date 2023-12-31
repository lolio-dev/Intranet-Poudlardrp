interface News {
  newsId: string;
  title: string;
  subtitle: string;
  text: string;
  date: number;
  image: string;
  status: 'ENABLE' | 'DISABLE'
}

export default News;