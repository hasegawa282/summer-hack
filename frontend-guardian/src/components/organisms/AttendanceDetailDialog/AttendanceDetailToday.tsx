import BpDialog from 'components/atoms/BpDialog';
import { Footer } from 'components/atoms/StyledTag';
import RoundedButton from 'components/atoms/RoundedButton';
import InputComponent from 'components/molecules/InputCompont';
import useBool from 'hooks/useBool/useBool';
import ToggleButton from 'components/molecules/ToggleButton';
import { attendancesIdPutAPI } from 'api/attendances';
import { getYMD } from 'utils/operateDate';
import ConfirmDialog from 'components/organisms/ConfirmDialog';
import { AttendanceDetailDialogProps } from '.';
import useStrNull from 'hooks/useStrNull/useStrNull';

/** 本日のAttendanceの詳細ダイアログ**/
const AttendanceDetailTodayDialog = (props: AttendanceDetailDialogProps) => {
  const [reason, setReason] = useStrNull(props.attendance.reason);
  const [attend, { onSwitch }] = useBool(props.attendance.status === 0);
  // 完了した時の関数
  const onFinish = async () => {
    const res = await attendancesIdPutAPI({
      child_id: props.attendance.child_id,
      child_name: props.attendance.child_name,
      reply: props.attendance.reply,
      reply_teacher_id: props.attendance.reply_teacher_id,
      reply_teacher_name: props.attendance.reply_teacher_name,
      attendance_id: props.attendance.attendance_id,
      date: props.attendance.date,
      reason: !attend ? reason : null,
      status: attend ? 0 : 1,
    });
    if (res.status === 201 || res.status === 200) {
      props.onClose(false);
    }
  };
  const conirmFinishClick = async () => {
    ConfirmDialog.show(
      <div>
        [確認]登録された内容で出欠の更新を行います。
        <br />
        よろしいですか？
      </div>,
      onFinish,
      undefined
    );
  };
  // -- render part --
  return (
    <BpDialog
      isOpen={props.isOpen}
      onClose={() => props.onClose(true)}
      title={getYMD(props.attendance.date)}
      canOutsideClickClose={false}
    >
      <InputComponent title="出欠">
        <ToggleButton checked={attend} onClick={onSwitch} ok_text="出席" off_text="欠席" />
      </InputComponent>
      {!attend && (
        <InputComponent title="欠席理由">
          <textarea style={{ width: '100%' }} value={reason || ''} onChange={(e) => setReason(e.currentTarget.value)} />
        </InputComponent>
      )}
      <Footer style={{ marginBottom: 15 }}>
        <RoundedButton onClick={conirmFinishClick} text="更新" />
      </Footer>
      {/** [TODO] ここに**返信した先生の名前を記入する**/}
      {!attend && props.attendance.reply && (
        <InputComponent title={`返信欄 ${props.attendance.reply_teacher_name || 'aaa'} 先生`}>
          <div>{props.attendance.reply}</div>
        </InputComponent>
      )}
    </BpDialog>
  );
};

// -- finally export part --

export default AttendanceDetailTodayDialog;
