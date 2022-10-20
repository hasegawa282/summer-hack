import { ClassEntity } from 'api/classes';
import React, { SetStateAction, useCallback, useState } from 'react';
import { checkRange } from 'utils/chekers';

/** Classの配列を格納するuseState**/
export interface useClassesFunc {
  setClasses: React.Dispatch<SetStateAction<ClassEntity[] | undefined>>;
  addClass: (item: ClassEntity) => void;
  deleteClass: (index: number) => void;
  updateClass: (index: number, item: ClassEntity) => void;
  resetClasses: () => void;
}
const useClasses = (def?: ClassEntity[]): [ClassEntity[] | undefined, useClassesFunc] => {
  const [classes, setClasses] = useState<ClassEntity[] | undefined>(def);

  // classesにitemを追加する
  const addClass = useCallback(
    (item: ClassEntity) => {
      let new_items: ClassEntity[] = [];
      if (classes === undefined) {
        new_items = [item];
      } else {
        new_items = [...classes, item];
      }
      setClasses(new_items);
    },
    [classes]
  );

  // classesのindex番目を削除する
  const deleteClass = useCallback(
    (index: number) => {
      if (classes === undefined) {
        return;
      }
      // indexが配列外ならばreturn
      if (
        !checkRange({
          value: index,
          min: 0,
          max: classes.length,
        })
      ) {
        return;
      }
      // indexを取り除いた配列を生成
      const new_items = [...classes.slice(0, index), ...classes.slice(index + 1)];
      setClasses(new_items);
    },
    [classes]
  );

  // classesのindex番目をitemに更新する
  const updateClass = useCallback(
    (index: number, item: ClassEntity) => {
      if (classes === undefined) {
        return;
      }
      // indexが配列外ならばreturn
      if (
        !checkRange({
          value: index,
          min: 0,
          max: classes.length,
        })
      ) {
        return;
      }
      const new_items = [...classes];
      // indexをitemに更新
      new_items[index] = item;
      setClasses(new_items);
    },
    [classes]
  );

  // attendancesをリセットする
  const resetClasses = useCallback(() => {
    setClasses([]);
  }, []);

  // propsが変動したら、値を更新
  React.useEffect(() => {
    setClasses(def);
  }, [def]);
  return [
    classes,
    {
      setClasses,
      addClass,
      deleteClass,
      updateClass,
      resetClasses,
    },
  ];
};

export default useClasses;
