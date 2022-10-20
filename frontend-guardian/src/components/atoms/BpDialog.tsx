// -- basic library --
import React from 'react';
import styled from 'styled-components';

// -- external components --
import { Dialog, DialogProps } from '@blueprintjs/core';
import colors from 'utils/colors';

export interface BpDialogProps extends DialogProps {
  large?: boolean;
  /** 包含するdivエレメントに渡すプロパティを指定します。 */
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
}
/**
 * 作成、詳細(更新)画面などのダイアログ
 */
export default function BpDialog(props: BpDialogProps) {
  return (
    <StyledDialog {...props}>
      <GnDialogContent {...props.contentProps}>{props.children}</GnDialogContent>
    </StyledDialog>
  );
}

// -- styled components --

const StyledDialog = styled(Dialog)<{
  large?: boolean;
}>`
  ${(params) => (params.large ? 'height: 90vh;' : 'max-height: 90vh;')}
  width: ${(params) => (params.large ? '95vw' : '80vw')};
  max-width: ${(params) => (params.large ? '95vw' : '900px')};
  background-color: ${colors.white};
  border-radius: 10px;
  .bp3-dialog-header {
    min-height: 60px;
    background-color: ${colors.gray};
    .bp3-button.bp3-minimal {
      border: 1px solid ${colors.gray};
      border-radius: 50%;
    }
  }
`;

const GnDialogContent = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow-y: scroll;
`;
