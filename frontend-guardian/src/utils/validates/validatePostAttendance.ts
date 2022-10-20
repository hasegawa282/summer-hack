/** AttendanceをPost送信する際のバリデーション関数**/
export const validatePostAttendance = (attendance: boolean, reason?: string): Error | void => {
  // 出席するのに欠席理由を書かれている場合はエラー
  // if (attendance && typeof reason === 'string' && reason.length > 0)
  //   throw new Error(`出席時は欠席理由を書いてはいけません`);
};
