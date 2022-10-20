import React, { SetStateAction, useCallback, useState } from 'react';
/** open系のuseState**/
export interface useIsOpenFunc {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  onOpen: () => void;
}
const useIsOpen = (def?: boolean): [boolean, useIsOpenFunc] => {
  const [is_open, setIsOpen] = useState<boolean>(!!def);
  // 閉じる
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  // 開く
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);
  React.useEffect(() => {
    setIsOpen(!!def);
  }, [def]);
  return [is_open, { setIsOpen, onClose, onOpen }];
};

export default useIsOpen;
