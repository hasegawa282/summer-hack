// -- basic library --
import React from 'react';
import styled from 'styled-components';
import colors from 'utils/colors';

// -- external components --
import styles from 'utils/styles';

export type BUTTON_TEXT_TYPE = 'CREATE' | 'UPDATE' | 'DETAIL';

const getButtonTextFromType = (default_text = '', text_type?: BUTTON_TEXT_TYPE) => {
  let text = default_text;
  switch (text_type) {
    case 'CREATE':
      text = '作成';
      break;
    case 'UPDATE':
      text = '更新';
      break;
    case 'DETAIL':
      text = '詳細';
      break;
    default:
      text = default_text;
  }
  return text;
};

// -- type declaration --
interface RoundedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  text_type?: BUTTON_TEXT_TYPE;
  is_white?: boolean;
  stop_propagation?: boolean;
  is_margin_right?: boolean; // ボタンが連続で連なる時に右側にmarginを設定
  is_margin_left?: boolean; // ボタンが連続で連なる時に左側にmarginを設定
  small?: boolean;
}
/** 丸みのあるボタンを描画します。
 * text にボタンの文字を指定します。
 */
const RoundedButton = (props: RoundedButtonProps) => {
  const new_props = { ...props };
  if (props.is_margin_right) {
    new_props.style = { ...props.style, marginRight: styles.interval_narrow_margin };
  }
  if (props.is_margin_left) {
    new_props.style = { ...props.style, marginLeft: styles.interval_narrow_margin };
  }
  if (props.small) {
    new_props.style = {
      ...new_props.style,
      width: styles.super_small_button_width,
      height: styles.super_small_button_height,
    };
  }
  if (props.stop_propagation) {
    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const on = props.onClick;
      if (on) {
        on(event);
      }
      // 親からのeventの伝達を止める
      event.stopPropagation();
    };
    new_props.onClick = onClick;
  }
  return <StyledButton {...new_props}>{getButtonTextFromType(props.text, props.text_type)}</StyledButton>;
};

export default RoundedButton;

// -- styled components --

const StyledButton = styled.button<{
  disabled?: boolean;
  is_white?: boolean;
}>`
  width: 240px;
  height: 35px;
  border-radius: 25px;
  background-color: ${(params) => (params.is_white ? colors.white : colors.component_main_color)};
  color: ${(params) => (params.is_white ? colors.component_main_color : 'white')};
  border: ${(params) => (params.is_white ? `1px solid ${colors.component_main_color}` : 'none')};
  font-family: inherit;
  &:disabled {
    cursor: not-allowed;
    background-color: ${colors.disabled_background_color};
    color: ${colors.main_font_color};
  }
  &:hover {
    opacity: ${(params) => (params.disabled ? 1 : styles.opacity_hover)};
    cursor: ${(params) => (params.disabled ? 'not-allowed' : 'pointer')};
  }
  font-weight: bolder;
`;
