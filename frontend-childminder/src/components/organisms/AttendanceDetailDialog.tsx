import BpDialog, { BpDialogProps } from 'components/atoms/BpDialog';
import BpTitle from 'components/atoms/BpTitle';
import { Footer } from 'components/atoms/StyledTag';
import RoundedButton from 'components/atoms/RoundedButton';
import { Weaken } from 'utils/types';
import InputComponent from 'components/molecules/InputCompont';
import { Attendance, attendancesIdPutAPI } from 'api/attendances';
import { getYMD } from 'utils/operateDate';
import { useEffect, useState, useCallback } from 'react';
import ConfirmDialog from './ConfirmDialog';
import AlertDialog from './AlertDialog';
import SelectBox from 'components/atoms/Selectbox';
import useArrayObjNotUndef from 'hooks/useArrayObjNotUndef/useArrayObjNotUndef';
import useStrNull from 'hooks/useStrNull/useStrNull';
import { validateReply } from 'utils/validation/validateReply';
import { Teacher, teachersGetAPI } from 'api/teachers';

// -- external datas --

// -- external functions --

// -- external types --
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AttendanceDetailDialogProps extends Weaken<BpDialogProps, 'onClose'> {
  attendance: Attendance; //出席情報
  onClose: (cancel?: boolean) => void; // 閉じる時の関数
}

// -- main component --
export const AttendanceDetailDialog = (props: AttendanceDetailDialogProps) => {
  const attend = props.attendance.status === 0;
  const [reply, setReply] = useStrNull(props.attendance.reply);
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

  // 選択された先生が変更された時の関数
  const onChangeClass = useCallback((e: React.ChangeEvent<HTMLSelectElement>, teachers: Teacher[]) => {
    console.log(e.currentTarget.value);
    console.log(teachers);
    const new_teacher = teachers.find((teacher) => {
      return teacher.teacher_id === e.currentTarget.value;
    });
    console.log(new_teacher);
    if (!new_teacher) {
      setSelectedteacher(undefined);
      return;
    }
    setSelectedteacher(new_teacher);
  }, []);
  // const [replyTeacherId, setReplyTeacherId ] = useState<number || undefined>(undefined);
  const onFinish = async (reply: string) => {
    // POSTに変更
    const res = await attendancesIdPutAPI({
      attendance_id: props.attendance.attendance_id,
      child_id: props.attendance.child_id,
      child_name: props.attendance.child_name,
      date: props.attendance.date,
      status: props.attendance.status,
      reason: props.attendance.reason,
      reply: reply,
      reply_teacher_id: selected_teacher?.teacher_id || null,
      reply_teacher_name: selected_teacher?.teacher_last_name || null,
    });
    if (res.status === 201 || res.status === 200) {
      props.onClose(false);
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
      onClose={() => props.onClose(true)}
      title={getYMD(props.attendance.date)}
      canOutsideClickClose={false}
    >
      {/* HACK: スタイルを当てる */}
      <BpTitle text={'出欠'} style={{ marginBottom: 8 }} />
      {props.attendance.status === 0 ? <div>出席</div> : <div>欠席</div>}
      {!attend && (
        <>
          <InputComponent title="欠席理由" style={{ marginTop: 15 }}>
            <textarea
              readOnly
              disabled
              style={{ width: '100%' }}
              value={props.attendance.reason || ''}
              onChange={() => {}}
            />
          </InputComponent>
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

export default AttendanceDetailDialog;
