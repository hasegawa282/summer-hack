import { childIdGetAPI } from 'api/children';
import BpTitle from 'components/atoms/BpTitle';
import { useCallback, useEffect, useState } from 'react';

export interface ChildId {
  child_id: string | undefined;
}

export default function ChildHeader(props: ChildId) {
  const [childName, setChildName] = useState('');

  const loadChildName = useCallback(async () => {
    if (!props.child_id) {
      return;
    }
    const res = await childIdGetAPI({ child_id: props.child_id });
    if (res.status === 200) {
      setChildName(`${res.data.child_last_name} ${res.data.child_first_name}`);
    } else {
      setChildName('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    void (async function () {
      await loadChildName();
    })();
  }, [loadChildName]);

  return childName ? <BpTitle text={`${childName}さん`} /> : null;
}
