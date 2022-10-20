/**日付が今日であればtrue, それ以外であればfalse**/
export const isToday = (entry_date: string): boolean => {
  const _today = new Date();
  //今日の0時0分0秒
  const today = new Date(_today.getFullYear(), _today.getMonth(), _today.getDate(), 0, 0, 0);
  // 今日の0時0分0秒日付のミリ秒
  const today_start_msec = today.getTime();
  // 明日の0時0分0秒の日付のミリ秒
  const today_end_msec = today.getTime() + 24 * 60 * 60 * 1000;

  // 入力日
  const entry_dt = new Date(entry_date);
  //入力日のミリ秒
  const entry_msec = entry_dt.getTime();
  return today_start_msec <= entry_msec && entry_msec < today_end_msec;
};
