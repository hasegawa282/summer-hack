// -- basic library --
import styled from 'styled-components';
import { colors } from 'utils/colors';

// -- external components --
import styles from 'utils/styles';

// -- type declaration --
interface PageBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  disabled?: boolean;
  selected?: boolean;
}
const PageBlock = (props: PageBlockProps) => {
  return (
    <StyledPageBlock>
      <Text {...props}>{props.text}</Text>
    </StyledPageBlock>
  );
};

export default PageBlock;

// -- styled components --

const Text = styled.div<{
  disabled?: boolean;
  selected?: boolean;
}>`
  display: inline-block;
  text-decoration: ${(params) => (params.disabled ? 'none' : 'underline')};
  opacity: ${(params) => (params.disabled ? styles.opacity_disabled : 1)};
  color: ${(params) => (params.selected ? colors.component_main_color : colors.component_sub_color)};
  font-weight: ${(params) => (params.selected ? 'bold' : 'normal')};
  &:hover {
    cursor: ${(params) => (params.disabled ? 'not-allowed' : 'pointer')};
    color: ${(params) => (params.disabled ? colors.component_sub_color : colors.component_main_color)};
  }
`;

export const StyledPageBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 100%;
  margin-right: ${styles.interval_narrow_margin};
`;
