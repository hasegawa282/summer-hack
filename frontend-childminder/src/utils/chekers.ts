// check系の関数を作る

/** valueがmin <= value <= maxならばtrue, それ以外ならばfalse**/
export interface CheckRangeProps {
  value: number;
  min: number;
  max: number;
}

export const checkRange = (props: CheckRangeProps): boolean => {
  if (props.value >= props.min && props.value <= props.max) {
    return true;
  }
  return false;
};

/** 文字列が空白or nullの時はtrue**/
export const checkSpace = (str: string | null) => {
  return str === null || Boolean(!str.match(/^\s*$/));
};
