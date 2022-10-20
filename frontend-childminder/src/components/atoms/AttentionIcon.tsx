import { Icon } from '@blueprintjs/core';

interface AttentionIconProps {
  style?: React.CSSProperties;
}
/**注意を促すアイコン**/
export default function AttentionIcon(props: AttentionIconProps) {
  return (
    <Icon style={props.style} icon="error" size={16} color="#d06267"/>

  );
}