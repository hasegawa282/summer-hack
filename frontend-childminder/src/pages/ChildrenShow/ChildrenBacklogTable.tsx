import { Attendance } from 'api/attendances';
import { Table, Tbody, Td, Th, Thead, Tr } from 'components/atoms/BpTable';
import AttendanceDetailDialog from 'components/organisms/AttendanceDetailDialog';
import { useState } from 'react';
import { attendanceStatusToStr } from 'utils/attendanceStatusToStr';
import { getYMD } from 'utils/operateDate';
import AttentionIcon from 'components/atoms/AttentionIcon';

export interface AttendancesTableProps {
  // child_id: string;
  attendances?: Attendance[];
  loadAttendances: (child_id?: string) => Promise<void>;
}

/** 出欠確認画面のテーブル **/
export default function ChildrenBacklogTable(props: AttendancesTableProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedAttendance, setClickedAttendance] = useState<Attendance | undefined>();
  const onDateClick = (att: Attendance) => {
    setIsOpen(true);
    setClickedAttendance(att);
  };
  // ダイアログを閉じる
  const onDialogClose = async (cancel?: boolean) => {
    if (!cancel) {
      await props.loadAttendances(clickedAttendance?.child_id);
    }
    setIsOpen(false);
  };
  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>日付</Th>
            <Th>出欠</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.attendances?.map((att, index) => {
            return (
              <Tr key={index}>
                <Td can_click={true} title={getYMD(att.date)} onClick={() => onDateClick(att)}>
                  {getYMD(att.date)}
                </Td>
                <Td title={attendanceStatusToStr(att.status)}>
                  <span style={{ marginRight: 4 }}>{attendanceStatusToStr(att.status)}</span>
                  {att.reply === null && att.status !== 0 && <AttentionIcon />}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {clickedAttendance && isOpen && (
        <AttendanceDetailDialog attendance={clickedAttendance} isOpen={isOpen} onClose={onDialogClose} />
      )}
    </>
  );
}
