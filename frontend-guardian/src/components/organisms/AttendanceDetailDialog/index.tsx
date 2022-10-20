// -- basic library --

// -- http connection library --

// -- external components --
import { BpDialogProps } from 'components/atoms/BpDialog';
import { Weaken } from 'utils/types';
import { Attendance } from 'api/attendances';
import { isToday } from 'utils/IsToday';
import AttendanceDetailTodayDialog from './AttendanceDetailToday';
import AttendanceDetailPastDialog from './AttendanceDetailPastDialog';

// -- external datas --

// -- external functions --

// -- external types --
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AttendanceDetailDialogProps extends Weaken<BpDialogProps, 'onClose'> {
  attendance: Attendance; //出席情報
  onClose: (cancel?: boolean) => void; // 閉じる時の関数
}

/** Attendanceの詳細ダイアログ**/
const AttendanceDetailDialog = (props: AttendanceDetailDialogProps) => {
  // -- render part --
  return isToday(props.attendance.date) ? (
    <AttendanceDetailTodayDialog {...props} />
  ) : (
    <AttendanceDetailPastDialog {...props} />
  );
};

// -- finally export part --

export default AttendanceDetailDialog;
