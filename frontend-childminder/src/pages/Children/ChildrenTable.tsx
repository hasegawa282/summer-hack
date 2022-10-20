import { Child } from 'api/children';
import { Table, Tbody, Td, Th, Thead, Tr } from 'components/atoms/BpTable';
import { useNavigate } from 'react-router-dom';

export interface ChildrenTableProps {
  children?: Child[];
}

/** 園児一覧画面のテーブル **/
export default function ChildrenTable(props: ChildrenTableProps) {
  const naviate = useNavigate();
  const onNameClick = (child_id: string) => {
    naviate(`/children/${child_id}`);
  };
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>名前</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.children?.map((child, index) => {
          return (
            <Tr key={index}>
              <Td title={child.child_name} can_click={true} onClick={() => onNameClick(child.child_id)}>
                {child.child_name}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
