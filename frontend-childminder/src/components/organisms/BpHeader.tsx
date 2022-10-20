// -- basic library --
import React, { useCallback } from 'react';
import styled from 'styled-components';
import styles from 'utils/styles';

// -- redux library --

// -- external components --

// -- external datas --
// import { AuthInfoContext } from 'hooks/authContext/authContext';
// import { Popover2 } from '@blueprintjs/popover2';
// import FunctionalText from 'components/atoms/FunctionalText';
// import { PopoverWholeArea } from 'components/atoms/StyledTag';
// import UserIcon from 'components/atoms/UserIcon';
// import useIsOpen from 'hooks/useIsOpen/useIsOpen';
import { useNavigate } from 'react-router-dom';
import useString from 'hooks/useString/useString';
import PageBlock from 'components/atoms/PageBlock';
import TopLogo from 'components/atoms/TopLogo';

const getId = () => {
  // 現在のURLパスから機能カテゴリを取得します。
  const s = window.location.pathname.split('/');
  return s.length > 1 ? s[1] : '';
};

// -- main component --
const BpHeader: React.FC = () => {
  // -- local states --
  // const [event_datas, setEventDatas] = useState<{ created_at: string; channel_name: string; channel_event_name: string }[]>([]);
  // const [is_open, { onClose }] = useIsOpen();
  const [url_id, setUrlId] = useString(getId());
  // const { auth_info, signOut } = useContext(AuthInfoContext);
  const navigate = useNavigate();

  // -- redux preparations --

  const toPage = useCallback((id: string) => {
    navigate(`/${id}`);
    setUrlId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -- render part --
  return (
    <HeaderWrapper>
      <PageBlock text="今日の出欠" onClick={() => toPage('')} selected={url_id === ''} />
      <PageBlock text="園児一覧" onClick={() => toPage('children')} selected={url_id === 'children'} />
      <MarginText />
      <TopLogo onClick={() => toPage('')} />
      {/* <React.Fragment>
        <Popover2
          content={
            <MenuContentForPopoverWholeArea>
              <AuthName>ユーザー名</AuthName>
              <FunctionalText text=">ログアウト" onClick={() => {}} />
            </MenuContentForPopoverWholeArea>
          }
          isOpen={is_open}
          onClose={onClose}
        >
          <UserIcon size={24} />
        </Popover2>
      </React.Fragment> */}
    </HeaderWrapper>
  );
};

// -- styled components --

const HeaderWrapper = styled.div`
  width: 100%;
  height: ${styles.topmenu_height};
  box-shadow: 0 1px 0 0 #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  background-color: #dcd0c0;
`;

const MarginText = styled.div`
  margin: auto;
`;

// const MenuContentForPopoverWholeArea = styled(PopoverWholeArea)`
//   width: 200px;
//   height: 300px;
// `;

// const BellContentForPopoverWholeArea = styled(PopoverWholeArea)`
//   width: 320px;
//   min-height: 450px;
// `;

// const TextArea = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-bottom: ${styles.interval_margin};
// `;

// const OccuredTimeText = styled.div`
//   font-size: ${styles.small_text_size};
//   margin-bottom: ${styles.interval_narrow_margin};
//   font-weight: bold;
// `;

// const EventText = styled.div`
//   font-size: ${styles.small_text_size};
//   font-weight: bold;
// `;

const AuthName = styled.div`
  margin-bottom: ${styles.interval_margin};
`;

// -- finally export part --

export default BpHeader;
