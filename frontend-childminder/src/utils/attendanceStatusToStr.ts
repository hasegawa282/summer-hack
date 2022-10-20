/** 出席状態のステータスの数値を文字列に変換する */

export const attendanceStatusToStr = (status: number): string => {
  let name = '';
  switch (status) {
    case 0:
      name = '出席';
      break;
    case 1:
      name = '欠席';
      break;
    case 2:
      name = '早退';
      break;
    default:
      name = 'その他';
  }
  return name;
};
