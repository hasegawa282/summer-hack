// -- basic library --
import styled from 'styled-components';
import { colors } from 'utils/colors';

// -- external components --
import styles from 'utils/styles';

// -- type declaration --
interface FunctionalTextProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  disabled?: boolean;
}
const FunctionalText = (props: FunctionalTextProps) => {
  return <Text {...props}>{props.text}</Text>;
};

export default FunctionalText;

// -- styled components --

const Text = styled.div<{
  disabled?: boolean;
}>`
  display: inline-block;
  text-decoration: ${(params) => (params.disabled ? 'none' : 'underline')};
  opacity: ${(params) => (params.disabled ? styles.opacity_disabled : 1)};
  &:hover {
    cursor: ${(params) => (params.disabled ? 'not-allowed' : 'pointer')};
    color: ${(params) => (params.disabled ? 'inherit' : colors.component_main_color)};
  }
`;
