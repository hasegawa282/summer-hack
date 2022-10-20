import styled from 'styled-components';
import { colors } from 'utils/colors';

/**
 * ページフッター
 */
const BpFooter = () => {
  const now = new Date();
  const year = now.getFullYear() || 2022;
  return <StyledFooter>&copy; {year} BIPROGY D Team</StyledFooter>;
};

const StyledFooter = styled.div`
  width: 100%;
  height: 35px;
  background-color: ${colors.black};
  color: white;
  font-weight: bolder;
  display: flex;
  position: fixed;
  bottom: 0;
  justify-content: space-between;
  padding: 8px 30px;
`;

export default BpFooter;
