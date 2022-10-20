import ChildrenBacklogTable from './ChildrenBacklogTable';
import { Content, TopArea, WholeArea } from 'components/atoms/StyledTag';
import { useCallback, useEffect, useState } from 'react';
import { Attendance, attendancesGetAPI } from 'api/attendances';
import { useParams } from 'react-router-dom';
import ChildHeader from './ChildHeader';

export default function ChildrenShow() {
  const p = useParams();

  const [attendances, setAttendances] = useState<Attendance[]>();

  // 子供のidから過去の出席履歴を取得する関数（attendance）のデータを変更する
  // Attendance配列をロードする
  const loadAttendances = useCallback(
    async (child_id?: string) => {
      if (!child_id) {
        setAttendances([]);
        return;
      }
      const res = await attendancesGetAPI({
        child_id,
      });
      if (res.status === 200) {
        setAttendances(res.data);
      } else {
        setAttendances([]);
      }
    },
    [setAttendances]
  );

  useEffect(() => {
    void (async function () {
      await loadAttendances(p.child_id);
    })();
  }, [loadAttendances, p.child_id]);

  // ダイアログを開く関数

  return (
    <WholeArea>
      <TopArea>
        <ChildHeader child_id={p.child_id} />
      </TopArea>
      <Content>
        <ChildrenBacklogTable attendances={attendances} loadAttendances={loadAttendances} />
      </Content>
    </WholeArea>
  );
}
