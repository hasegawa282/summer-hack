import { Attendance } from 'api/attendances';
import RoundedCard from 'components/atoms/RoundedCard';
import AttendanceDetailDialog from 'components/organisms/AttendanceDetailDialog';
import { useState } from 'react';
import styled from 'styled-components';
import { attendanceStatusToStr } from 'utils/attendanceStatusToStr';
import { getMD, getYMDForDateInput2 } from 'utils/operateDate';
import { DateRange } from '@blueprintjs/datetime2';
import attend_img from 'assets/maru.svg';
import absense_img from 'assets/batsu.svg';
import { BoldText, Img } from 'components/atoms/StyledTag';
import colors from 'utils/colors';
// import { isGeneratorFunction } from 'util/types';
import { IsBetweenStartEndDate, IsLargerThanStartDate, IsSmallerThanEndDate } from 'utils/checkDate';
import DataRangeInput from 'components/atoms/DateRangeInput';

export interface AttendancesViewProps {
  attendances?: Attendance[];
  loadAttendances: (child_id?: string) => Promise<void>;
}
/** 出欠確認画面のテーブル **/
export default function AttendancesView(props: AttendancesViewProps) {
  // [TODO]ここにダイアログコンポーネントのisOpen状態をここで定義
  const [isOpen, setIsOpen] = useState(false);
  const [clickedAttendance, setClickedAttendance] = useState<Attendance | undefined>();
  const [date_range, setDateRange] = useState<DateRange>([null, null]);
  // [TODO]ここに日付をクリックした時の関数を設置
  const onCardClick = (att: Attendance) => {
    setIsOpen(!isOpen);
    setClickedAttendance(att);
  };
  // ダイアログを閉じる
  const onDialogClose = async (cancel?: boolean) => {
    if (!cancel) {
      await props.loadAttendances(clickedAttendance?.child_id);
    }
    setIsOpen(false);
  };
  // attendancesを日付でフィルタリングする
  const getFilterdAttendances = (attendances: Attendance[]): Attendance[] => {
    // 開始日
    const start = date_range[0];
    // 終了日
    const end = date_range[1];

    let filterd_attendances = [...attendances];

    if (start && end) {
      //両方存在する時は間に入るかどうかでfilter
      filterd_attendances = filterd_attendances.filter((fa) => {
        return IsBetweenStartEndDate(fa.date, start, end);
      });
    } else if (start) {
      //startのみ存在する時はstart以上でfilter
      filterd_attendances = filterd_attendances.filter((fa) => {
        return IsLargerThanStartDate(fa.date, start);
      });
    } else if (end) {
      //endのみ存在する時はend以下でfilter
      filterd_attendances = filterd_attendances.filter((fa) => {
        return IsSmallerThanEndDate(fa.date, end);
      });
    }
    console.log(filterd_attendances);
    return filterd_attendances;
  };
  const cardStyle: React.CSSProperties = {
    width: '90%',
    height: 80,
    padding: '20px',
    margin: '10px auto',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  };
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {props.attendances && props.attendances.length > 0 && (
        <DataRangeInput
          formatDate={(dt) => getYMDForDateInput2(dt)}
          parseDate={(dt) => new Date(dt)}
          value={date_range}
          onChange={setDateRange}
          allowSingleDayRange={true}
          startInputProps={{ placeholder: '開始日' }}
          endInputProps={{ placeholder: '終了日' }}
          shortcuts={false}
        />
      )}
      <StyledAttendancesView>
        {props.attendances &&
          getFilterdAttendances(props.attendances).map((attendance, index) => {
            return (
              <RoundedCard style={cardStyle} key={index} onClick={() => onCardClick(attendance)}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <h2>{getMD(attendance.date)}</h2>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <BoldText
                      style={{
                        color: attendance.status === 0 ? colors.blue : colors.red,
                      }}
                    >
                      {attendanceStatusToStr(attendance.status)}
                    </BoldText>
                    <Img src={attendance.status === 0 ? attend_img : absense_img} alt="画像" />
                  </div>
                </div>
              </RoundedCard>
            );
          })}
      </StyledAttendancesView>
      {clickedAttendance && isOpen && (
        <AttendanceDetailDialog attendance={clickedAttendance} isOpen={isOpen} onClose={onDialogClose} />
      )}
    </div>
  );
}

const StyledAttendancesView = styled.div`
  width: 100%;
`;
