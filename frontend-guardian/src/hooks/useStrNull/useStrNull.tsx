import React, { SetStateAction, useState } from 'react';

/**string | nullの状態を格納するstate **/
const useStrNull = (def?: string | null): [string | null, React.Dispatch<SetStateAction<string | null>>] => {
  const [str_null, setStrNull] = useState<string | null>(getInitialStr(def));
  React.useEffect(() => {
    setStrNull(getInitialStr(def));
  }, [def]);
  return [str_null, setStrNull];
};

export default useStrNull;

const getInitialStr = (def?: string | null): string | null => {
  return def || null;
};
