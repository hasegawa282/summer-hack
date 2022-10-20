import { getClient } from './base';
import sendAxios from './base/sendAxios';

/** エンティティ**/
export interface ClassEntity {
  class_id: number; // クラスID
  class_name: string; //クラス名
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

const sample_attendance1: ClassEntity = {
  class_id: 1,
  class_name: 'クラス1',
  created_at: '2022-08-21T00:00:00+09:00',
  updated_at: '2022-08-21T00:00:00+09:00',
  deleted_at: null,
};

const sample_attendance2: ClassEntity = {
  class_id: 2,
  class_name: 'クラス2',
  created_at: '2022-08-21T00:00:00+09:00',
  updated_at: '2022-08-21T00:00:00+09:00',
  deleted_at: null,
};

/*** [GET] /class/ ***/
/** クラス一覧データを取得 **/
export const classesGetAPI = () => {
  // クライアントを定義
  const axios = getClient();

  // パス・メソッドを定義
  const path = `/class/`;
  const method = 'get';

  // [get, put]クエリストリングを定義
  const query = {
    // params: props,
  };

  // [put, post]リクエストボディを定義
  const form = new FormData();
  // for (const [key, value] of Object.entries(props)) {
  //   form.append(key, value);
  // }

  // 送信
  return sendAxios<ClassEntity[]>(axios, path, query, form, method, [sample_attendance1, sample_attendance2]);
};
