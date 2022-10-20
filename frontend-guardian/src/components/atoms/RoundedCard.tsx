import React from 'react';
import styled from 'styled-components';
import { Card, Elevation, CardProps } from '@blueprintjs/core';
import colors from 'utils/colors';

/**
 * 角に丸みをつけたカードコンテナ
 */
interface RoundedCardProps {
  badge_number?: number;
  menu?: JSX.Element;
  pinned?: boolean;
}
export default class RoundedCard extends React.PureComponent<RoundedCardProps & CardProps> {
  render() {
    return (
      <OriginalCard elevation={Elevation.TWO} {...this.props}>
        {this.props.children}
        <Badge badge_number={this.props.badge_number ? this.props.badge_number : -1}>
          {this.props.badge_number && this.props.badge_number >= 100 ? '99+' : this.props.badge_number}
        </Badge>
      </OriginalCard>
    );
  }
}

const OriginalCard = styled(Card)`
  position: relative;
  border-radius: 15px;
`;

const Badge = styled.span<{
  badge_number: number;
}>`
  display: ${(params) => (params.badge_number <= 0 ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  position: absolute;
  content: attr(${(params) => (params.badge_number > 100 ? '99+' : params.badge_number)});
  min-width: 50px;
  height: 50px;
  box-sizing: border-box;
  padding: 4px;
  font-size: 18px;
  font-weight: bold;
  color: ${colors.white};
  background-color: red;
  border: 1px solid #fff;
  border-radius: 50%;
  top: 0;
  right: 0;
  transform: translate(40%, -40%);
  z-index: 1;
`;
