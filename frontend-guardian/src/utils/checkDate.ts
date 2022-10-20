/** 開始と終了日の間にdateがあればtrue, それ以外はfalse */
export const IsBetweenStartEndDate = (date: string | number | Date, start: Date, end: Date): boolean => {
  const _dt = new Date(date);
  const dt = new Date(_dt.getFullYear(), _dt.getMonth(), _dt.getDate(), 0, 0, 0);
  const dt_msec = dt.getTime();
  const start_msec = start.getTime();
  const end_msec = end.getTime();
  return start_msec <= dt_msec && dt_msec <= end_msec;
};

/** 開始以上のdateがあればtrue, それ以外はfalse */
export const IsLargerThanStartDate = (date: string | number | Date, start: Date): boolean => {
  const _dt = new Date(date);
  const dt = new Date(_dt.getFullYear(), _dt.getMonth(), _dt.getDate(), 0, 0, 0);
  const dt_msec = dt.getTime();
  const start_msec = start.getTime();
  return start_msec <= dt_msec;
};

/** 終了以下のdateがあればtrue, それ以外はfalse */
export const IsSmallerThanEndDate = (date: string | number | Date, end: Date): boolean => {
  const _dt = new Date(date);
  const dt = new Date(_dt.getFullYear(), _dt.getMonth(), _dt.getDate(), 0, 0, 0);
  const dt_msec = dt.getTime();
  const end_msec = end.getTime();
  return dt_msec <= end_msec;
};
