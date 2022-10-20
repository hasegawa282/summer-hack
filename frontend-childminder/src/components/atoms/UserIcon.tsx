import { Icon } from '@blueprintjs/core';
import styled from 'styled-components';
import styles from 'utils/styles';
import { IconNames } from '@blueprintjs/icons';
import { MouseEventHandler } from 'react';

const _Icon = styled(Icon)`
  cursor: pointer;
  &:hover {
    opacity: ${styles.opacity_hover};
  }
`;

/**
 * アカウントを表すアイコンです。
 */
interface UserIconProps {
  onClick?: MouseEventHandler<HTMLElement>;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}
export default function UserIcon(props: UserIconProps) {
  // eslint-disable-next-line react/jsx-pascal-case
  return <_Icon {...props} icon={IconNames.USER} />;
}
