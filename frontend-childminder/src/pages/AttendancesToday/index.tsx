import { attendanceTodayGetAPI } from 'api/attendances';
import { ClassEntity, classesGetAPI } from 'api/classes';
import SelectBox from 'components/atoms/Selectbox';
import { Content, TopArea, WholeArea } from 'components/atoms/StyledTag';
import useIsOpen from 'hooks/useIsOpen/useIsOpen';
import { useCallback, useEffect, useState } from 'react';
import AttendancesTodayTable from './AttendancesTodayTable';
import { Attendance } from 'api/attendances';
import styled from 'styled-components';
import useArrayObjNotUndef from 'hooks/useArrayObjNotUndef/useArrayObjNotUndef';
import AttendanceLogDialog from 'components/organisms/AttendanceLogDialog';

/** 今日の出欠確認画面 **/
export default function AttendancesToday() {
  // 選択できるクラスのリストの状態を管理する
  const [classes, { setArrayObj: setClasses }] = useArrayObjNotUndef<ClassEntity>();
  // 選択されているクラスの状態を管理する
  const [selected_class, setSelectedClass] = useState<ClassEntity | undefined>();
  // 今日の園児の出欠を管理する
  const [attendances_today, setAttndancesToday] = useState<Attendance[]>();
  // ダイアログのisOpenの状態を監理する
  const [is_open, { onClose, onOpen }] = useIsOpen();
  const [clickedAttendance, setClickedAttendance] = useState<Attendance>();

  // [TODO] attendance-todayの配列をロードする関数を作る
  const loadAttendancesToday = async (class_id?: number) => {
    // class_idが存在しない場合は、空配列を格納して終了
    if (typeof class_id === 'undefined') {
      setAttndancesToday([]);
      return;
    }
    const res = await attendanceTodayGetAPI({ class_id });
    if (res.status === 200) {
      setAttndancesToday(res.data);
    } else {
      setAttndancesToday([]);
    }
    // attendanceTodayの情報をAPIから取得
    // res.statusをチェックし、200ならばres.dataを格納
    // それ以外はから配列を格納
  };

  const onDateClick = (att: Attendance) => {
    onOpen();
    setClickedAttendance(att);
  };
  // ダイアログを閉じる関数
  const onDialogClose = async (cancel?: boolean) => {
    if (!cancel) {
      await loadAttendancesToday(selected_class?.class_id);
    }
    onClose();
  };

  // classの配列をロードする
  const loadClasses = useCallback(async () => {
    const res = await classesGetAPI();
    if (res.status === 200) {
      setClasses(res.data);
    } else {
      setClasses([]);
    }
  }, [setClasses]);

  // 選択されたクラスが変更された時の関数
  const onChangeClass = useCallback((e: React.ChangeEvent<HTMLSelectElement>, classes: ClassEntity[]) => {
    const new_class = classes.find((cl) => String(cl.class_id) === e.currentTarget.value);
    // 存在しなければ、selected_classをundefinedに変更する
    if (typeof new_class === 'undefined') {
      setSelectedClass(undefined);
      return;
    }

    setSelectedClass(new_class);
  }, []);
  // ローディング処理
  useEffect(() => {
    void (async function () {
      await loadClasses();
    })();
  }, [loadClasses]);

  // ローディング処理
  useEffect(() => {
    void (async function () {
      await loadAttendancesToday(selected_class?.class_id);
    })();
  }, [selected_class]);
  return (
    <WholeArea>
      <TopArea>
        <StyledTag>
          <SelectBox
            value={String(selected_class?.class_id || '')}
            onChange={(e) => onChangeClass(e, classes)}
            datas={classes.map((cl) => {
              return {
                name: cl.class_name,
                value: String(cl.class_id),
              };
            })}
          />
        </StyledTag>
      </TopArea>
      <Content>
        <AttendancesTodayTable attendances_today={attendances_today} onDateClick={onDateClick} />
      </Content>
      {clickedAttendance && is_open && (
        <AttendanceLogDialog clickedAttendance={clickedAttendance} isOpen={is_open} logClose={onDialogClose} />
      )}
    </WholeArea>
  );
}

const StyledTag = styled.div`
  width: 100%;
`;
