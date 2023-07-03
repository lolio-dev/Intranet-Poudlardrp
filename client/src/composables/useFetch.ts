import axios, { AxiosError, AxiosResponse, Method } from "axios";
import { intranet_api_uri } from "../constants";
import { getFromSessionStorage } from "../utils/sesionStorage";
import { useToasts } from "./useToasts";
import { Errors } from "../enums/Errors";
import { RequestConfig } from "../types/RequestConfig";

const getStoredToken = () => {
  const token = getFromSessionStorage("accessToken");
  return token ? `Bearer ${token}` : ""
}

export const useFetch = async <T = any, D = {}>(
    url: string,
    method: Method = 'GET',
    { data, headers, overrideToken, showToastOnError = true }: RequestConfig<D> = {},
    api_uri: string = intranet_api_uri,
): Promise<AxiosResponse<T>> => {
  const token = overrideToken || getStoredToken();
  const { toastError } = useToasts();

  return axios.request<T>({
    url,
    method,
    baseURL: api_uri,
    headers: {
      Accept: 'application/json',
      AcceptEncoding: 'gzip',
      ...(token && { Authorization: token }),
      ...(headers && headers),
    },
    data,
    validateStatus: () => true
  })
      .then((response: AxiosResponse<T>) => {
        const { status, data } = response;

        if (status >= 400) {
          throw data;
        }

        return response;
      })
      .catch((error: any) => {
        if (error.code === AxiosError.ERR_NETWORK) {
          toastError(Errors.ERR_SERVER);
          throw error;
        }

        if (showToastOnError) {
          const message = Errors[error.message.toUpperCase() as keyof typeof Errors];
          toastError(message ?? error.error)
        }

        throw error;
      });
};
