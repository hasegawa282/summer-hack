import { getClient } from './base';
import sendAxios from './base/sendAxios';

/** エンティティ**/
export interface Child {
  child_id: string; // クラスID
  child_name: string; // 子供の名前(性 名)
  child_name_kana: string; //子供の名前(セイ メイ)
}

const sample_child1: Child = {
  child_id: '00000001',
  child_name: '田中 隆',
  child_name_kana: 'タナカ タカシ',
};

const sample_child2: Child = {
  child_id: '00000002',
  child_name: '三菱 賢治',
  child_name_kana: 'ミツビシ ケンジ',
};

const sample_child3: Child = {
  child_id: '00000003',
  child_name: '吉沢 量',
  child_name_kana: 'ヨシザワ リョウ',
};

/*** [GET] /child/get_all/ ***/
/** 園児一覧データを取得 **/
export const childrenGetAPI = () => {
  // クライアントを定義
  const axios = getClient();

  // パス・メソッドを定義
  const path = `/child/get_all/`;
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
  return sendAxios<Child[]>(axios, path, query, form, method, [sample_child1, sample_child2, sample_child3]);
};
