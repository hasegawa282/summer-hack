import React, { SetStateAction, useCallback, useState } from 'react';
import { checkRange } from 'utils/chekers';

/** 任意のオブジェクト<T>配列を格納できるuseState**/
export interface useArrayObjNotUndefFunc<T> {
  setArrayObj: React.Dispatch<SetStateAction<T[]>>; // 上書きする関数
  addObj: (item: T) => void; // 要素を1つ追加する関数
  deleteObj: (index: number) => void; // 要素を1つ削除する関数
  updateObj: (index: number, item: T) => void; // 要素を1つ更新する関数
  resetAll: () => void; //要素を空配列に戻す関数
}
const useArrayObjNotUndef = <T,>(def?: T[]): [T[], useArrayObjNotUndefFunc<T>] => {
  // [変数, 上書き関数]
  const [array_obj, setArrayObj] = useState<T[]>(def || []);

  // array_objにitemを追加する
  const addObj = useCallback(
    (item: T) => {
      let new_items: T[] = [];
      new_items = [...array_obj, item];
      setArrayObj(new_items);
    },
    [array_obj]
  );

  // array_objのindex番目を削除する
  const deleteObj = useCallback(
    (index: number) => {
      // indexが配列外ならばreturn
      if (
        !checkRange({
          value: index,
          min: 0,
          max: array_obj.length,
        })
      ) {
        return;
      }
      // indexを取り除いた配列を生成
      const new_items = [...array_obj.slice(0, index), ...array_obj.slice(index + 1)];
      setArrayObj(new_items);
    },
    [array_obj]
  );

  // array_objのindex番目をitemに更新する
  const updateObj = useCallback(
    (index: number, item: T) => {
      // indexが配列外ならばreturn
      if (
        !checkRange({
          value: index,
          min: 0,
          max: array_obj.length,
        })
      ) {
        return;
      }
      const new_items = [...array_obj];
      // indexをitemに更新
      new_items[index] = item;
      setArrayObj(new_items);
    },
    [array_obj]
  );

  // array_objをリセットする
  const resetAll = useCallback(() => {
    setArrayObj([]);
  }, []);

  // propsが変動したら、値を更新
  React.useEffect(() => {
    setArrayObj(def || []);
  }, [def]);
  // 返却値
  return [
    array_obj,
    {
      setArrayObj,
      addObj,
      deleteObj,
      updateObj,
      resetAll,
    },
  ];
};

export default useArrayObjNotUndef;
