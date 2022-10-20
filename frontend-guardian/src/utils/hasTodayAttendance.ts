import { Attendance } from 'api/attendances';

/** Attendance[]の中に今日の日付のデータが存在していればtrue, それ以外はfalse**/
export const hasTodayAttendance = (attendances: Attendance[]): boolean => {
  const _today = new Date();
  //今日の0時0分0秒
  const today = new Date(_today.getFullYear(), _today.getMonth(), _today.getDate(), 0, 0, 0);
  // 今日の0時0分0秒日付のミリ秒
  const today_start_msec = today.getTime();
  // 明日の0時0分0秒の日付のミリ秒
  const today_end_msec = today.getTime() + 24 * 60 * 60 * 1000;

  return (
    attendances.filter((attendance) => {
      // 入力日をDate型に変更
      const dt = new Date(attendance.date);
      // 入力日をミリ秒に変換
      const entry_date_msec = dt.getTime();
      // 入力日が今日の間に含まれている時はtrue
      return today_start_msec <= entry_date_msec && entry_date_msec < today_end_msec;
    }).length > 0
  );
};
