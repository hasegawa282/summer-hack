import styled from 'styled-components';

interface BpTitleProps {
  text: string;
  icon?: JSX.Element;
  style?: React.CSSProperties;
}
/** ページのタイトルテキスト**/
export default function BpTitle(props: BpTitleProps) {
  return (
    <TitleArea style={props.style}>
      <TitleText>{props.text}</TitleText>
      {props.icon ? <IconArea>{props.icon}</IconArea> : null}
    </TitleArea>
  );
}
const TitleArea = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const TitleText = styled.h2`
  letter-spacing: 0px;
  margin: 0;
`;

const IconArea = styled.div`
  margin-left: 5px;
`;
