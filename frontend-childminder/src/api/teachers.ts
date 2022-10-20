import { getClient } from './base';
import sendAxios from './base/sendAxios';

export interface Teacher {
  teacher_name: string;
  teacher_last_name: string;
  teacher_id: string;
  class_id: number;
}
const sample_teacher1: Teacher = {
  teacher_name: 'まさみ',
  teacher_last_name: '長澤',
  teacher_id: 'MASAMI',
  class_id: 1,
};

const sample_teacher2: Teacher = {
  teacher_name: '環奈',
  teacher_last_name: '橋本',
  teacher_id: 'KANNA',
  class_id: 2,
};

export const teachersGetAPI = () => {
  // クライアントを定義
  const axios = getClient();

  // パス・メソッドを定義
  const path = `/teacher/`;
  const method = 'get';

  // [get, put]クエリストリングを定義
  const query = {
    //params: props,
  };

  // [put, post]リクエストボディを定義
  const form = new FormData();
  // for (const [key, value] of Object.entries(params)) {
  //   form.append(key, value);
  // };

  // 送信
  return sendAxios<Teacher[]>(axios, path, query, form, method, [sample_teacher1, sample_teacher2]);
};
