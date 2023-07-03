export interface ChatItem {
  uuid: string;
  server: string;
  type: string;
  message: string;
  data?: any;
  traductions?: any;
}
