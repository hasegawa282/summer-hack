/** 出席をまるばつの文字列にする**/
const getAttendanceChar = (attend: boolean): string => {
  return attend ? '○' : '×';
};

export default getAttendanceChar;
