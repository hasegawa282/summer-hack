// -- basic library --
import React from 'react';
import styled from 'styled-components';
import colors from 'utils/colors';

// -- type declaration --
interface ToggleButtonProps {
  onClick: (e: React.MouseEvent<HTMLLabelElement>) => void;
  checked: boolean;
  test_id?: string;
  style?: React.CSSProperties;
  ok_text?: string;
  off_text?: string;
}

// -- main component --

export default function ToggleButton(props: ToggleButtonProps) {
  // -- preparations --

  // -- render part --
  return (
    <WholeArea style={props.style}>
      <OKArea checked={props.checked}>{props.ok_text || 'ON'}</OKArea>
      <Label htmlFor="toggle-button" onClick={props.onClick} checked={props.checked}>
        <Input id="toggle-button" type="checkbox" checked={props.checked} disabled />
        <SwitchContent checked={props.checked} />
        <SwitchCircle checked={props.checked} />
      </Label>
      <OFFArea checked={props.checked}>{props.off_text || 'OFF'}</OFFArea>
    </WholeArea>
  );
}

// -- styled components --
const WholeArea = styled.div`
  width: 117px;
  height: 25px;
  display: flex;
  align-items: center;
`;

const OKArea = styled.div<{
  checked?: boolean;
}>`
  width: 25px;
  height: 100%;
  margin-right: 7px;
  display: flex;
  align-items: center;
  color: ${(params) => (params.checked ? colors.component_main_color : colors.main_font_color)};
  opacity: ${(params) => (params.checked ? 1 : 0.2)};
`;

const OFFArea = styled.div<{
  checked?: boolean;
}>`
  width: 25px;
  height: 100%;
  margin-left: 10px;
  display: flex;
  align-items: center;
  opacity: ${(params) => (params.checked ? 0.2 : 1)};
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label<{
  checked: boolean;
}>`
  width: 50px;
  height: 100%;
  position: relative;
  display: inline-block;
`;

const SwitchContent = styled.span<{
  checked?: boolean;
}>`
  display: block;
  cursor: pointer;
  position: relative;
  border-radius: 25px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${colors.component_small_border_color};
  &::before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 25px;
    background-color: ${colors.toggle_background_color};
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: ${(params) => (params.checked ? 0 : '50%')};
    left: ${(params) => (params.checked ? 0 : '50%')};
    background-color: ${(params) => (params.checked ? colors.component_main_color : 'transparent')};
    width: ${(params) => (params.checked ? '100%' : 0)};
    height: ${(params) => (params.checked ? '100%' : 0)};
    border-radius: 25px;
    -webkit-transition: all 0.5s;
    -moz-transition: all 0.5s;
    -ms-transition: all 0.5s;
    -o-transition: all 0.5s;
    transition: all 0.5s;
  }
`;

const SwitchCircle = styled.span<{
  checked?: boolean;
}>`
  display: block;
  position: absolute;
  top: calc((25px - ((2 * 25px) / 3)) / 2);
  left: ${(params) => (params.checked ? '7%' : 'calc(50px * 0.93 - ((2 * 25px) / 3))')};
  width: calc((2 * 25px) / 3);
  height: calc((2 * 25px) / 3);
  border-radius: 25px;
  background-color: ${colors.white};
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
`;
