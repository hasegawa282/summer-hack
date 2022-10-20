import { ClassEntity, classesGetAPI } from 'api/classes';
import SelectBox from 'components/atoms/Selectbox';
import { Content, TopArea, WholeArea } from 'components/atoms/StyledTag';
import useArrayObj from 'hooks/useArrayObj/useArrayObj';
import { useCallback, useEffect, useState } from 'react';
import ChildrenTable from './ChildrenTable';
import styled from 'styled-components';
import useArrayObjNotUndef from 'hooks/useArrayObjNotUndef/useArrayObjNotUndef';
import { Child, childrenGetAPI } from 'api/children';

/** 園児一覧画面 **/
export default function Children() {
  // 選択できる園児のリストの状態を管理する
  const [children, { setArrayObj: setChildren }] = useArrayObj<Child>();
  // 選択できるクラスのリストの状態を管理する
  const [classes, { setArrayObj: setClasses }] = useArrayObjNotUndef<ClassEntity>();
  // 選択されている園児の状態を管理する
  const [selected_class, setSelectedClass] = useState<ClassEntity | undefined>(undefined);
  // classの配列をロードする
  const loadClasses = useCallback(async () => {
    const res = await classesGetAPI();
    if (res.status === 200) {
      setClasses(res.data);
    } else {
      setClasses([]);
    }
  }, [setClasses]);
  // childの配列をロードする
  const loadChildren = async (class_id?: number) => {
    // class_idが存在しない場合は、空配列を格納して終了
    if (!class_id) {
      setChildren([]);
      return;
    }
    const res = await childrenGetAPI({ class_id });
    if (res.status === 200) {
      setChildren(res.data);
    } else {
      setChildren([]);
    }
  };

  // 選択されたクラスが変更された時の関数
  const onChangeClass = useCallback((e: React.ChangeEvent<HTMLSelectElement>, classes: ClassEntity[]) => {
    const new_class = classes.find((cl) => String(cl.class_id) === e.currentTarget.value);
    if (typeof new_class === 'undefined') {
      setSelectedClass(undefined);
    } else {
      setSelectedClass(new_class);
    }
  }, []);
  // ローディング処理
  useEffect(() => {
    void (async function () {
      await loadClasses();
    })();
  }, [loadClasses]);

  // ローディング処理
  useEffect(() => {
    void (async function () {
      await loadChildren(selected_class?.class_id);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected_class]);

  return (
    <WholeArea>
      <TopArea>
        <StyledTag>
          <SelectBox
            value={String(selected_class?.class_id || '')}
            onChange={(e) => onChangeClass(e, classes)}
            datas={classes.map((cl) => {
              return {
                name: cl.class_name,
                value: String(cl.class_id),
              };
            })}
          />
        </StyledTag>
        {/* <RoundedButton text="本日の出欠" onClick={onOpen} /> */}
      </TopArea>
      <Content>
        <ChildrenTable children={children} />
      </Content>
    </WholeArea>
  );
}

const StyledTag = styled.div`
  width: 100%;
`;
