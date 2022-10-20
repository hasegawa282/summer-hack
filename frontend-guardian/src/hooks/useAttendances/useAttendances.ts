import { Attendance } from 'api/attendances';
import React, { SetStateAction, useCallback, useState } from 'react';
import { checkRange } from 'utils/chekers';

/** Attendanceの配列を格納するuseState**/
export interface useAttendancesFunc {
  setAttendances: React.Dispatch<SetStateAction<Attendance[] | undefined>>;
  addAttendance: (item: Attendance) => void;
  deleteAttendance: (index: number) => void;
  updateAttendance: (index: number, item: Attendance) => void;
  resetAttendances: () => void;
}
const useAttendances = (def?: Attendance[]): [Attendance[] | undefined, useAttendancesFunc] => {
  const [attendances, setAttendances] = useState<Attendance[] | undefined>(def);

  // attendancesにitemを追加する
  const addAttendance = useCallback(
    (item: Attendance) => {
      let new_items: Attendance[] = [];
      if (attendances === undefined) {
        new_items = [item];
      } else {
        new_items = [...attendances, item];
      }
      setAttendances(new_items);
    },
    [attendances]
  );

  // attendancesのindex番目を削除する
  const deleteAttendance = useCallback(
    (index: number) => {
      if (attendances === undefined) {
        return;
      }
      // indexが配列外ならばreturn
      if (
        !checkRange({
          value: index,
          min: 0,
          max: attendances.length,
        })
      ) {
        return;
      }
      // indexを取り除いた配列を生成
      const new_items = [...attendances.slice(0, index), ...attendances.slice(index + 1)];
      setAttendances(new_items);
    },
    [attendances]
  );

  // attendancesのindex番目をitemに更新する
  const updateAttendance = useCallback(
    (index: number, item: Attendance) => {
      if (attendances === undefined) {
        return;
      }
      // indexが配列外ならばreturn
      if (
        !checkRange({
          value: index,
          min: 0,
          max: attendances.length,
        })
      ) {
        return;
      }
      const new_items = [...attendances];
      // indexをitemに更新
      new_items[index] = item;
      setAttendances(new_items);
    },
    [attendances]
  );

  // attendancesをリセットする
  const resetAttendances = useCallback(() => {
    setAttendances([]);
  }, []);

  // propsが変動したら、値を更新
  React.useEffect(() => {
    setAttendances(def);
  }, [def]);
  return [
    attendances,
    {
      setAttendances,
      addAttendance,
      deleteAttendance,
      updateAttendance,
      resetAttendances,
    },
  ];
};

export default useAttendances;
