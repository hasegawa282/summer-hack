import top_logo from 'assets/cat1.jpeg';
import styled from 'styled-components';

interface TopLogoProps extends React.HTMLAttributes<HTMLImageElement> {}
/** ヘッダーに表示するロゴ**/
export default function TopLogo(props: TopLogoProps) {
  return <TopLogoImg {...props} src={top_logo} alt="トップのロゴ" />;
}

const TopLogoImg = styled.img`
  height: auto;
  width: auto;
  max-width: 200px;
  max-height: 100%;
`;
