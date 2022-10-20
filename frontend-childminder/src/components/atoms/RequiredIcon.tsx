// 必須を示すアイコン（*記号）
import React from 'react';
import styled from 'styled-components';
import colors from 'utils/colors';

const _RequiredIcon = styled.span`
  font-weight: normal;
  color: ${colors.red};
  margin-left: 4px;
  margin-top: 0px;
  font-size: smaller;
  font-family: inherit;
`;

const RequiredIcon = (props: { children?: React.ReactNode }) => {
  // eslint-disable-next-line react/jsx-pascal-case
  return <_RequiredIcon title="この項目は必須です">※{props.children}</_RequiredIcon>;
};

export default RequiredIcon;
