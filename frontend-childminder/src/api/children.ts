import { getClient } from './base';
import sendAxios from './base/sendAxios';

/** エンティティ**/
export interface Child {
  child_id: string; // ID
  child_name: string; // 子供の名前(性 名)
  child_name_kana: string; //子供の名前(セイ メイ)
}

const sample_child1: Child = {
  child_id: '00000001',
  child_name: '田中 隆',
  child_name_kana: 'ヨシザワ リョウ',
};

const sample_child2: Child = {
  child_id: '00000002',
  child_name: '三菱 賢治',
  child_name_kana: 'ヨシザワ リョウ',
};

const sample_child3: Child = {
  child_id: '00000003',
  child_name: '吉沢 量',
  child_name_kana: 'ヨシザワ リョウ',
};

/** 元々のChild Entity**/
export interface Child2 {
  child_first_name: string;
  child_first_name_kana: string;
  child_id: string;
  child_last_name: string;
  child_last_name_kana: string;
  class_id: number;
  parent_first_name: string;
  parent_first_name_kana: string;
  parent_last_name: string;
  parent_last_name_kana: string;
}

const sample_child2_1: Child2 = {
  child_first_name: '伊吹',
  child_first_name_kana: 'イブキ',
  child_id: 'syoji',
  child_last_name: '庄司',
  child_last_name_kana: 'ショウジ',
  class_id: 1,
  parent_first_name: 'ゆきお',
  parent_first_name_kana: 'ユキオ',
  parent_last_name: '庄司',
  parent_last_name_kana: 'ショウジ',
};

/*** [GET] /child/get_all/?class_id={class_id} ***/
export interface RequestChildrenGet {
  class_id: number;
}
/** 園児一覧データを取得(class_idで絞り込み可能) **/
export const childrenGetAPI = (props: RequestChildrenGet) => {
  // クライアントを定義
  const axios = getClient();

  // パス・メソッドを定義
  const path = `/child/get_all/`;
  const method = 'get';

  // [get, put]クエリストリングを定義
  const query = {
    params: props,
  };

  // [put, post]リクエストボディを定義
  const form = new FormData();
  // for (const [key, value] of Object.entries(props)) {
  //   form.append(key, value);
  // }

  // 送信
  return sendAxios<Child[]>(axios, path, query, form, method, [sample_child1, sample_child2, sample_child3]);
};

/***[GET] /child/{child_id} */
export interface RequestChildGet {
  child_id: string;
}

/** 園児データを1つ取得 **/
export const childIdGetAPI = (props: RequestChildGet) => {
  // クライアントを定義
  const axios = getClient();

  // パス・メソッドを定義
  const path = `/child/${props.child_id}/`;
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
  return sendAxios<Child2>(axios, path, query, form, method, sample_child2_1);
};
