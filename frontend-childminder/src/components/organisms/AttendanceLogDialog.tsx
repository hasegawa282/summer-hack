// -- external components --
import BpDialog, { BpDialogProps } from 'components/atoms/BpDialog';
import { Footer } from 'components/atoms/StyledTag';
import RoundedButton from 'components/atoms/RoundedButton';
import { Weaken } from 'utils/types';
import InputComponent from 'components/molecules/InputCompont';
import { Attendance, attendancesIdPutAPI } from 'api/attendances';
import { getYMD } from 'utils/operateDate';
import { useState, useEffect, useCallback } from 'react';
import { attendanceStatusToStr } from 'utils/attendanceStatusToStr';
import ConfirmDialog from './ConfirmDialog';
import AlertDialog from './AlertDialog';
import { validateReply } from 'utils/validation/validateReply';
import useStrNull from 'hooks/useStrNull/useStrNull';
import SelectBox from 'components/atoms/Selectbox';
import useArrayObjNotUndef from 'hooks/useArrayObjNotUndef/useArrayObjNotUndef';
import { Teacher, teachersGetAPI } from 'api/teachers';

// -- external datas --

// -- external functions --

// -- external types --
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AttendanceDetailDialogProps extends Weaken<BpDialogProps, 'onClose'> {
  clickedAttendance: Attendance; //出席情報
  isOpen: boolean;
  logClose: (cancel?: boolean) => void; // 閉じる時の関数
}

// -- main component --
const AttendanceLogDialog = (props: AttendanceDetailDialogProps) => {
  const [reply, setReply] = useStrNull(props.clickedAttendance.reply);
  // 選択できる先生の一覧
  const [teachers, { setArrayObj: setTeachers }] = useArrayObjNotUndef<Teacher>();
  // 選択されている先生の状態を管理する
  const [selected_teacher, setSelectedteacher] = useState<Teacher | undefined>();

  // classの配列をロードする
  const loadTeachers = async () => {
    const res = await teachersGetAPI();
    console.log(res);
    if (res.status === 200) {
      setTeachers(res.data);
    } else {
      setTeachers([]);
    }
  };
  // const teacher = 'aaa';
  // 完了した時の関数
  const onFinish = async (reply: string) => {
    const res = await attendancesIdPutAPI({
      attendance_id: props.clickedAttendance.attendance_id,
      child_id: props.clickedAttendance.child_id,
      child_name: props.clickedAttendance.child_name,
      date: props.clickedAttendance.date,
      status: props.clickedAttendance.status,
      reason: props.clickedAttendance.reason,
      reply: reply,
      reply_teacher_id: selected_teacher?.teacher_id || null,
      reply_teacher_name: selected_teacher?.teacher_last_name || null,
    });
    if (res.status === 201 || res.status === 200) {
      props.logClose(false);
    }
  };

  const conirmFinishClick = () => {
    // バリデーション
    try {
      validateReply({
        reply,
        reply_teacher_id: selected_teacher?.teacher_id,
        reply_teacher_name: selected_teacher?.teacher_last_name,
      });
    } catch (e) {
      if (e instanceof Error) {
        AlertDialog.show(e.message);
      }
      return;
    }
    // バリデーションをかけているので文字列のはず
    const rep = reply as string;
    ConfirmDialog.show(
      <div>
        [確認]登録された内容で返信します。
        <br />
        よろしいですか？
      </div>,
      () => onFinish(rep),
      undefined
    );
  };

  // 選択された先生が変更された時の関数
  const onChangeClass = useCallback((e: React.ChangeEvent<HTMLSelectElement>, teachers: Teacher[]) => {
    const new_teacher = teachers.find((teacher) => {
      return teacher.teacher_id === e.currentTarget.value;
    });
    if (!new_teacher) {
      setSelectedteacher(undefined);
      return;
    }
    setSelectedteacher(new_teacher);
  }, []);
  // ローディング処理
  useEffect(() => {
    void (async function () {
      await loadTeachers();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -- render part --
  return (
    <BpDialog
      isOpen={props.isOpen}
      onClose={() => props.logClose(true)}
      title={getYMD(props.clickedAttendance.date)}
      canOutsideClickClose={false}
    >
      <InputComponent title="名前">{props.clickedAttendance.child_name + ' さん'}</InputComponent>
      <InputComponent title="出欠">{attendanceStatusToStr(props.clickedAttendance.status)}</InputComponent>
      {props.clickedAttendance.status === 1 && (
        <>
          <InputComponent title="出欠理由">{props.clickedAttendance.reason}</InputComponent>
          <InputComponent title={`先生 `}>
            <SelectBox
              value={String(selected_teacher?.teacher_id || '')}
              onChange={(e) => onChangeClass(e, teachers)}
              datas={teachers.map((cl) => {
                return {
                  name: cl.teacher_last_name + cl.teacher_name,
                  value: cl.teacher_id,
                };
              })}
            />
          </InputComponent>
          <InputComponent title={`返信欄 `}>
            <textarea style={{ width: '100%' }} value={reply || ''} onChange={(e) => setReply(e.currentTarget.value)} />
          </InputComponent>
          <Footer>
            <RoundedButton onClick={conirmFinishClick} text="返信" />
          </Footer>
        </>
      )}
    </BpDialog>
  );
};

// -- finally export part --

export default AttendanceLogDialog;
