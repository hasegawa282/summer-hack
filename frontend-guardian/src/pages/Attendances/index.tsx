import { Attendance, attendancesGetAPI } from 'api/attendances';
import { Child, childrenGetAPI } from 'api/children';
import SelectBox from 'components/atoms/Selectbox';
import { Content, TopArea, WholeArea } from 'components/atoms/StyledTag';
import SPRoundedButton from 'components/molecules/SPRoundedButton';
import AlertDialog from 'components/organisms/AlertDialog';
import PostAttendanceDialog from 'components/organisms/PostAttendanceDialog';
import useArrayObj from 'hooks/useArrayObj/useArrayObj';
import useArrayObjNotUndef from 'hooks/useArrayObjNotUndef/useArrayObjNotUndef';
import useIsOpen from 'hooks/useIsOpen/useIsOpen';
import { useCallback, useEffect, useState } from 'react';
import { hasTodayAttendance } from 'utils/hasTodayAttendance';
// import AttendancesTable from './AttendancesTable';
import AttendancesView from './AttendancesView';

/** 保護者側の出欠確認画面 **/
export default function Attendances() {
  const [attendances, { setArrayObj: setAttendances }] = useArrayObj<Attendance>();
  const [is_open, { onOpen, onClose }] = useIsOpen();
  // 選択できる園児のリストの状態を管理する
  const [children, { setArrayObj: setChildren }] = useArrayObjNotUndef<Child>();
  // 選択されている園児の状態を管理する
  const [selected_child, setSelectedChild] = useState<Child | undefined>(undefined);
  // childの配列をロードする
  const loadChildren = useCallback(async () => {
    const res = await childrenGetAPI();
    if (res.status === 200) {
      setChildren(res.data);
    } else {
      setChildren([]);
    }
  }, [setChildren]);
  // Attendance配列をロードする
  const loadAttendances = useCallback(
    async (child_id?: string) => {
      console.log(child_id);
      // class_idが存在しない場合は、空配列を格納して終了
      if (!child_id) {
        setAttendances([]);
        return;
      }
      const res = await attendancesGetAPI({
        child_id,
      });
      console.log(res);
      if (res.status === 200) {
        setAttendances(res.data);
      } else {
        setAttendances([]);
      }
    },
    [setAttendances]
  );
  // ダイアログを開く関数
  const onDialogOpen = useCallback(() => {
    // バリデーション
    if (!selected_child) {
      AlertDialog.show('園児を選択してください');
      return;
    }
    onOpen();
  }, [selected_child, onOpen]);

  const onDialogClose = async (cancel?: boolean) => {
    if (!cancel) {
      await loadAttendances(selected_child?.child_id);
    }
    onClose();
  };
  // 選択されたクラスが変更された時の関数
  const onChangeChild = useCallback((e: React.ChangeEvent<HTMLSelectElement>, children: Child[]) => {
    const new_child = children.find((ch) => ch.child_id === e.currentTarget.value);
    setSelectedChild(new_child);
  }, []);
  // マウント時のロード
  useEffect(() => {
    void (async function () {
      await loadAttendances(selected_child?.child_id);
    })();
  }, [loadAttendances, selected_child]);
  useEffect(() => {
    void (async function () {
      await loadChildren();
    })();
  }, [loadChildren]);
  return (
    <WholeArea>
      <TopArea>
        <SelectBox
          value={String(selected_child?.child_id || '')}
          onChange={(e) => onChangeChild(e, children)}
          datas={children.map((child) => {
            return {
              name: `${child.child_name}(${child.child_name_kana})`,
              value: child.child_id,
            };
          })}
        />
        {attendances && selected_child && !hasTodayAttendance(attendances) && (
          <SPRoundedButton text="本日の出欠登録" onClick={onDialogOpen} />
        )}
      </TopArea>
      <Content>
        <AttendancesView attendances={attendances} loadAttendances={loadAttendances} />
      </Content>
      {is_open && selected_child && (
        <PostAttendanceDialog isOpen={is_open} onClose={onDialogClose} child_id={selected_child.child_id} />
      )}
    </WholeArea>
  );
}
