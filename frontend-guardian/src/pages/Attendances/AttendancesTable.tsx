import { Attendance } from 'api/attendances';
import { Table, Tbody, Td, Th, Thead, Tr } from 'components/atoms/BpTable';
import AttendanceDetailDialog from 'components/organisms/AttendanceDetailDialog';
import { useState } from 'react';
import { attendanceStatusToStr } from 'utils/attendanceStatusToStr';
import { getYMD } from 'utils/operateDate';

export interface AttendancesTableProps {
  attendances?: Attendance[];
  loadAttendances: (child_id?: string) => Promise<void>;
}
/** 出欠確認画面のテーブル **/
export default function AttendancesTable(props: AttendancesTableProps) {
  // [TODO]ここにダイアログコンポーネントのisOpen状態をここで定義
  const [isOpen, setIsOpen] = useState(false);
  const [clickedAttendance, setClickedAttendance] = useState<Attendance | undefined>();
  // [TODO]ここに日付をクリックした時の関数を設置
  const onDateClick = (att: Attendance) => {
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
  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>日付</Th>
            <Th style={{ width: 60 }}>出欠</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.attendances?.map((att, index) => {
            return (
              <Tr key={index}>
                <Td can_click={true} title={getYMD(att.date)} onClick={() => onDateClick(att)}>
                  {getYMD(att.date)}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {clickedAttendance && isOpen && (
        <AttendanceDetailDialog attendance={clickedAttendance} isOpen={isOpen} onClose={onDialogClose} />
      )}
      {/** [TODO]ここにダイアログコンポーネントを置く(AttendanceDetailDialog)**/}
    </>
  );
}
