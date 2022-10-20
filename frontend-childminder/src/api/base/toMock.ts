// -- http connection library --
import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';

// -- mock get funciton --

const toMock = (target: AxiosInstance, path: string, query: any, method: string, response: any) => {
  // -- mock properation --
  const mock = new MockAdapter(target, { delayResponse: 500 });

  if (method === 'get') {
    mock.onGet(path, query).reply(200, response);
  } else if (method === 'post') {
    mock.onPost(path).reply(200, response);
  } else if (method === 'put') {
    mock.onPut(path).reply(200, response);
  } else if (method === 'delete') {
    mock.onDelete(path, query).reply(200, response);
  }

  // -- return part --
  return;
};

// -- finally export part --
export default toMock;
