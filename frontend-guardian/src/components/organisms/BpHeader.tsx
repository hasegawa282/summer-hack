// -- basic library --
import React from 'react';
import styled from 'styled-components';
import styles from 'utils/styles';

// -- redux library --

// -- external components --

// -- external datas --
// import { Popover2 } from '@blueprintjs/popover2';
// import FunctionalText from 'components/atoms/FunctionalText';
// import { PopoverWholeArea } from 'components/atoms/StyledTag';
// import UserIcon from 'components/atoms/UserIcon';
// import useIsOpen from 'hooks/useIsOpen/useIsOpen';
import TopLogo from 'components/atoms/TopLogo';
import { useNavigate } from 'react-router-dom';

// -- external functions --
// import dateShapeToDate from 'utils/convertDate';

// -- main component --
const BpHeader: React.FC = () => {
  const navigate = useNavigate();
  // -- local states --
  // const [is_open, { onClose }] = useIsOpen();

  // -- render part --
  return (
    <HeaderWrapper>
      <MarginText />
      <TopLogo onClick={() => navigate('/')} />

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
  display: flex;
  justify-content: space-between;
  font-size: 24px;
`;

const MarginText = styled.div`
  margin: auto;
`;

// const MenuContentForPopoverWholeArea = styled(PopoverWholeArea)`
//   width: 200px;
//   height: 300px;
// `;

// const AuthName = styled.div`
//   margin-bottom: ${styles.interval_margin};
// `;

// -- finally export part --

export default BpHeader;
