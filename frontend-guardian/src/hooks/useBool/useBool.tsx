import React, { SetStateAction, useCallback, useState } from 'react';

/** open系のuseState**/
export interface useBoolFunc {
  setBool: React.Dispatch<SetStateAction<boolean>>;
  onSwitch: () => void;
}
/**booleanを格納するstate **/
const useBool = (def?: boolean): [boolean, useBoolFunc] => {
  const [bool, setBool] = useState<boolean>(!!def);
  // boolを反転させる
  const onSwitch = useCallback(() => {
    setBool(!bool);
  }, [bool]);
  React.useEffect(() => {
    setBool(!!def);
  }, [def]);
  return [bool, { setBool, onSwitch }];
};

export default useBool;
