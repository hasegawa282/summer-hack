import { Attendance } from 'api/attendances';
import { Table, Tbody, Td, Th, Thead, Tr } from 'components/atoms/BpTable';
import { attendanceStatusToStr } from 'utils/attendanceStatusToStr';
import { getYMD } from 'utils/operateDate';
import AttentionIcon from 'components/atoms/AttentionIcon';

export interface AttendancesTodayTableProps {
  attendances_today?: Attendance[];
  onDateClick: (today: Attendance) => void;
}

/** 出欠確認画面のテーブル **/
export default function AttendancesTodayTable(props: AttendancesTodayTableProps) {
  // [TODO]　不必要な列を削除し、必要な列を追加する
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>名前</Th>
          <Th>日付</Th>
          <Th>出欠</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.attendances_today?.map((att_t, index) => {
          return (
            <Tr key={index}>
              <Td title={att_t.child_name || ''}>{att_t.child_name || ''}</Td>
              <Td can_click={true} title={getYMD(att_t.date)} onClick={() => props.onDateClick(att_t)}>
                {getYMD(att_t.date)}
              </Td>
              <Td title={attendanceStatusToStr(att_t.status)}>
                <span style={{ marginRight: 4 }}>{attendanceStatusToStr(att_t.status)}</span>
                {att_t.reply === null && att_t.status !== 0 && <AttentionIcon />}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
