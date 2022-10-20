// -- basic library --
import styled from 'styled-components';
import styles from 'utils/styles';

/** styled componentsで作成した単純なコンポーネントを記述**/

/**Grid表示のWrapper**/
export const GridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
`;

/**widthが100%のdiv**/
export const Content = styled.div`
  width: 100%;
`;

/**widthが100%のimg**/
export const GNImg = styled.img`
  width: 100%;
  height: auto;
  max-height: 100%;
`;

// ポップオーバーエリア
export const PopoverWholeArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 25px 0px 25px;
  overflow: scroll;
`;

// コンテンツの全体領域
export const WholeArea = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding: ${styles.whole_padding};
`;

// トップエリア
export const TopArea = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: ${styles.interval_margin};
`;

// 上側のボタンエリア
export const TopButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 36px;
  margin: 2px auto;
`;
// フッター
export const Footer = styled.div`
  display: flex;
  justify-content: center;
`;
