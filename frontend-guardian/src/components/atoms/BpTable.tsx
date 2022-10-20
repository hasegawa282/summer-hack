// テーブルエレメントのUIデザインコンポーネント
import styled from 'styled-components';
import colors from 'utils/colors';
import styles from 'utils/styles';

// sideを固定する際のstyle
const stick_side_style = `
:first-child {
  /* 横スクロール時に固定する */
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 1;
  background-color: ${colors.gray};
}
`;

// headを固定する際のstyle
const stick_head_style = `
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: ${colors.gray};
  :first-child {
    z-index: 3;
  }
`;

export const Table = styled.table<{
  sticky?: boolean;
}>`
  width: 100%;
  height: 100%;
  border-spacing: 0;
  border: 1px solid ${colors.component_small_border_color};
  border-collapse: separate;
  border-radius: ${styles.radius};
  table-layout: fixed;
  overflow: ${(p) => (p.sticky ? 'overflow' : 'hidden')};
`;

export const Thead = styled.thead`
  width: 100%;
  height: 45px;
  max-height: 45px;
  background-color: ${colors.gray};
`;

export const Tbody = styled.tbody`
  width: 100%;
  height: calc(100% - 45px);
  text-align: center;
  background-color: ${colors.white};
  text-align: center;
`;

export const Tr = styled.tr<{
  checked?: boolean;
}>`
  width: 100%;
  height: 35px;
  ${(params) => (params.checked ? `background-color: ${colors.table_checked_background_color};` : '')}
  &:hover {
    background-color: ${(params) =>
      params.checked ? colors.table_checked_background_color : colors.table_hover_background_color};
  } ;
`;

export const Th = styled.th<{
  head_sticky?: boolean;
  side_sticky?: boolean;
}>`
  vertical-align: middle;
  border-right: 1px solid ${colors.component_small_border_color};
  :last-child {
    border-right: none;
    /*tableのoverflow: hiddenでない時は、border-radiusの分だけはみ出てしまう。それを回避するために、border-radiusをつける*/
    border-top-right-radius: ${styles.radius};
  }
  :first-child {
    /*tableのoverflow: hiddenでない時は、border-radiusの分だけはみ出てしまう。それを回避するために、border-radiusをつける*/
    border-top-left-radius: ${styles.radius};
  }
  border-bottom: 1px solid ${colors.component_small_border_color};
  ${(p) => (p.side_sticky ? stick_side_style : '')};
  ${(p) => (p.head_sticky ? stick_head_style : '')};
`;

export const Td = styled.td<{
  last_row?: boolean;
  side_sticky?: boolean;
  can_click?: boolean;
}>`
  vertical-align: middle;
  border-right: 1px solid ${colors.component_small_border_color};
  border-bottom: ${(params) => (params.last_row ? 'none' : `1px solid ${colors.component_small_border_color}`)};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: ${(params) => (params.can_click ? 'underline' : 'none')};
  :last-child {
    border-right: none;
    /*tableのoverflow: hiddenでない時は、border-radiusの分だけはみ出てしまう。それを回避するために、border-radiusをつける*/
    border-bottom-right-radius: ${(p) => (p.last_row ? `${styles.radius}` : '0px')};
  }
  :first-child {
    /*tableのoverflow: hiddenでない時は、border-radiusの分だけはみ出てしまう。それを回避するために、border-radiusをつける*/
    border-bottom-left-radius: ${(p) => (p.last_row ? `${styles.radius}` : '0px')};
  }
  ${(p) => (p.side_sticky ? stick_side_style : '')};
  &:hover {
    cursor: ${(p) => (p.can_click ? 'pointer' : 'default')};
  }
`;

// テーブル内のチェックボックスを包むコンポーネント
export const CheckBoxArea = styled.div`
  display: flex;
  margin: auto 6px;
  align-items: center;
`;
