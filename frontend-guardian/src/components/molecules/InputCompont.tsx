// -- basic library --
import RequiredIcon from 'components/atoms/RequiredIcon';
import React from 'react';
import styled from 'styled-components';
import styles from 'utils/styles';

// -- type declaration --
interface InputComponentProps {
  title: string;
  required?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// -- main component --

const InputComponent = (props: InputComponentProps) => {
  // -- preparations --

  // -- render part --
  return (
    <WholeArea style={props.style}>
      <InputTitle title={props.title}>
        {props.title}
        {props.required ? <RequiredIcon /> : null}
      </InputTitle>
      {props.children}
    </WholeArea>
  );
};
// -- finally export part --
export default InputComponent;

// -- styled components --

const WholeArea = styled.div`
  display: block;
  align-items: center;
  margin-bottom: ${styles.interval_margin};
  font-family: inherit;
`;

const InputTitle = styled.div`
  min-width: 180px;
  margin-bottom: 10px;
  display: flex;
  font-size: 14px;
  font-family: inherit;
  font-weight: bold;
`;
