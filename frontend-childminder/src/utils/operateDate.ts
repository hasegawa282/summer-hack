// 日付を年/月/日の形にする
export const getYMD = (dt: string | number | Date): string => {
  const ndt = new Date(dt);
  const year = ('0000' + ndt.getFullYear()).slice(-4);
  const month = ('00' + (ndt.getMonth() + 1)).slice(-2);
  const day = ('00' + ndt.getDate()).slice(-2);
  return `${year}/${month}/${day}`;
};
