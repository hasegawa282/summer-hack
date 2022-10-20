// -- http connection library --
import axios, { AxiosRequestConfig } from 'axios';

// -- handlers --
import { onReady, onSuccess, onError } from 'api/base/handlers';

// -- main axios base --
const getClient = (p?: {
  responseType?: AxiosRequestConfig['responseType'];
  header_options?: { [key: string]: any };
  disabled_error_message?: boolean; // エラーメッセージを無効化できる
}) => {
  // -- authorized http client --
  const responseType = p?.responseType || 'json';
  const header_options = p?.header_options || {};
  const client = axios.create({
    headers: {
      ...header_options,
      Authorization: '',
    },
    responseType: responseType,
  });

  // -- set interceptors --
  client.interceptors.request.use((re: any) => onReady(re));
  client.interceptors.response.use(onSuccess, (err: any) => onError(err, p?.disabled_error_message));
  // -- return part --
  return client;
};

export default getClient;
