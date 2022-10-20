import React, { SetStateAction, useState } from 'react';

/**理由を格納するstate **/
const useReason = (def?: string): [string, React.Dispatch<SetStateAction<string>>] => {
  const [reason, setReason] = useState<string>(getInitialStr(def));
  React.useEffect(() => {
    setReason(getInitialStr(def));
  }, [def]);
  return [reason, setReason];
};

export default useReason;

const getInitialStr = (def?: string): string => {
  return def || '';
};
