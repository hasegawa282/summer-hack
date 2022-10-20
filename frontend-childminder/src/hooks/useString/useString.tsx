import React, { SetStateAction, useState } from 'react';

/**文字列型の変数を格納するstate **/
const useString = (def?: string): [string, React.Dispatch<SetStateAction<string>>] => {
  const [reply, setReply] = useState<string>(getInitialStr(def));
  React.useEffect(() => {
    setReply(getInitialStr(def));
  }, [def]);
  return [reply, setReply];
};

export default useString;

const getInitialStr = (def?: string): string => {
  return def || '';
};
