export interface Logs {
  source: string;
  env: string;
  logs: {
    message: string;
    level: string;
    time: string;
  }[]
}
