import { AxiosInstance, AxiosResponse } from 'axios';
import toMock from './toMock';

const sendAxios = <ResponseType>(
  axios: AxiosInstance,
  path: string,
  query: any,
  form: any,
  method: string,
  mock_response?: any
) => {
  let url = `${path}`;
  // yarn buildした時以外はモックを使用
  if (process.env.NODE_ENV !== 'production') {
    toMock(axios, url, query, method, mock_response);
  } else {
    url = `https://teamd.pythonanywhere.com${path}`;
  }

  if (method === 'post') {
    return axios.post(url, form).then((res: AxiosResponse<ResponseType>) => res);
  } else if (method === 'put') {
    return axios.put(url, form).then((res: AxiosResponse<ResponseType>) => res);
  } else if (method === 'delete') {
    return axios.delete(url, query).then((res: AxiosResponse<ResponseType>) => res);
  }
  return axios.get(url, query).then((res: AxiosResponse<ResponseType>) => res);
};

// -- finally export part --
export default sendAxios;
