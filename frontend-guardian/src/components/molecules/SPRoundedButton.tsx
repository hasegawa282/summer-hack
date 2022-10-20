import RoundedButton from 'components/atoms/RoundedButton';
import styled from 'styled-components';
import { sp } from 'utils/media';
import styles from 'utils/styles';

const SRoundedButton = styled(RoundedButton)`
  ${sp`
    margin-left: ${styles.interval_narrow_margin};
    width: 170px;
  `}
`;

export default SRoundedButton;
