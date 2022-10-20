import { getClient } from './base';
import sendAxios from './base/sendAxios';

/** エンティティ**/
/** 出欠情報のエンティティ**/
export interface Attendance {
  attendance_id: number;
  child_id: string;
  child_name: string; //子供の名前
  status: number; // 出欠状態 0:出席, 1:欠席, 2:早退でいく?
  reason: string | null; //欠席理由
  reply: string | null; // 保育士からの返信
  reply_teacher_id: string | null;
  reply_teacher_name: string | null; //返信した保育士の名前
  date: string; //出欠日
}

const sample_attendance1: Attendance = {
  attendance_id: 1,
  child_id: '00000001',
  child_name: '田中 隆',
  status: 1,
  reply: null,
  reply_teacher_id: null,
  reply_teacher_name: null,
  reason: '体調不調のためお休み',
  date: '2022-08-25T00:00:00+09:00',
};

const sample_attendance2: Attendance = {
  attendance_id: 2,
  child_id: '00000002',
  child_name: '三菱 賢治',
  reply: null,
  reply_teacher_id: null,
  reply_teacher_name: null,
  reason: null,
  status: 0,
  date: '2022-08-24T00:00:00+09:00',
};

const sample_attendance3: Attendance = {
  attendance_id: 3,
  child_id: '00000003',
  child_name: '吉沢 量',
  status: 1,
  reason: 'お腹が痛いためお休み',
  reply: '体調に気をつけてね',
  reply_teacher_id: 'aaa',
  reply_teacher_name: '長澤 まさみ',
  date: '2022-08-23T00:00:00+09:00',
};

/*** [POST] /attendance/ ***/
export interface RequestAttendancesPost {
  child_id: string;
  reason: string | null;
  status: number;
  date: string;
}

/** 本日の出欠登録を行うAPI**/
export const attendancesPostAPI = (props: RequestAttendancesPost) => {
  // クライアントを定義
  const axios = getClient();

  // パス・メソッドを定義
  const path = `/attendance/`;
  const method = 'post';

  // [get, put]クエリストリングを定義
  const query = {
    params: props,
  };

  // [put, post]リクエストボディを定義
  const form = new FormData();
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'number') {
      form.append(key, String(value));
    } else if (value) {
      form.append(key, value);
    }
  }

  // 送信
  return sendAxios<Attendance>(axios, path, query, form, method, sample_attendance1);
};

/*** [GET] /attendances/?child_id={child_id} ***/
export interface RequestAttendancesGet {
  child_id: string;
}
/** 指定のchild_idに対する、出席情報一覧を取得する**/
export const attendancesGetAPI = (props: RequestAttendancesGet) => {
  // クライアントを定義
  const axios = getClient();

  // パス・メソッドを定義
  const path = `/child/get/`;
  const method = 'get';

  // [get, put]クエリストリングを定義
  const query = {
    params: props,
  };

  // [put, post]リクエストボディを定義
  const form = new FormData();
  // for (const [key, value] of Object.entries(params)) {
  //   form.append(key, value);
  // };

  // 送信
  return sendAxios<Attendance[]>(axios, path, query, form, method, [
    sample_attendance1,
    sample_attendance2,
    sample_attendance3,
  ]);
};

/*** [PUT] /attendance/{attendance_id}/ ***/
export interface RequestAttendancesIdPut {
  child_id: string;
  child_name?: string;
  date: string;
  status: number;
  attendance_id: number;
  reason: string | null;
  reply: string | null;
  reply_teacher_name: string | null;
  reply_teacher_id: string | null;
}
/** 指定のattendance_idを更新するAPI**/
export const attendancesIdPutAPI = (props: RequestAttendancesIdPut) => {
  // クライアントを定義
  const axios = getClient();

  // パス・メソッドを定義
  const path = `/attendance/${props.attendance_id}/`;
  const method = 'put';

  // [get, put]クエリストリングを定義
  const query = {
    params: props,
  };

  // [put, post]リクエストボディを定義
  const form = new FormData();
  for (const [key, value] of Object.entries(props)) {
    if (typeof value === 'number') {
      form.append(key, String(value));
    } else if (value) {
      form.append(key, value);
    }
  }

  // 送信
  return sendAxios<Attendance>(axios, path, query, form, method, sample_attendance1);
};
