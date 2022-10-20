// -- basic library --

// -- http connection library --

// -- external components --
import BpDialog from 'components/atoms/BpDialog';
import InputComponent from 'components/molecules/InputCompont';
import { getYMD } from 'utils/operateDate';
import { attendanceStatusToStr } from 'utils/attendanceStatusToStr';
import { AttendanceDetailDialogProps } from '.';

// -- external datas --

// -- external functions --

// -- external types --

/** 過去のAttendanceの詳細ダイアログ**/
const AttendanceDetailPastDialog = (props: AttendanceDetailDialogProps) => {
  // -- render part --
  return (
    <BpDialog
      isOpen={props.isOpen}
      onClose={() => props.onClose(true)}
      title={getYMD(props.attendance.date)}
      canOutsideClickClose={false}
    >
      <InputComponent title="出欠">
        <div>{attendanceStatusToStr(props.attendance.status)}</div>
      </InputComponent>
      {props.attendance.status === 1 && (
        <InputComponent title="欠席理由">
          <textarea style={{ width: '100%' }} value={props.attendance.reason || ''} disabled />
        </InputComponent>
      )}
      {/** [TODO] ここに**返信した先生の名前を記入する**/}
      {props.attendance.status === 1 && props.attendance.reply && (
        <InputComponent title={`返信欄 ${props.attendance.reply_teacher_name || 'aaa'} 先生`}>
          <div>{props.attendance.reply}</div>
        </InputComponent>
      )}
    </BpDialog>
  );
};

// -- finally export part --

export default AttendanceDetailPastDialog;
