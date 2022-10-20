import { DateRangeInput2 } from '@blueprintjs/datetime2';
import styled from 'styled-components';
import { sp } from 'utils/media';

const DataRangeInput = styled(DateRangeInput2)`
  white-space: normal !important;
  max-width: 90vw;
  text-align: center;
  .bp4-datepicker bp4-daterangepicker bp4-daterangepicker-contiguous {
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  .bp4-popover2-transition-container {
    inset: 0 auto 0 auto !important;
    margin: auto;
  }
  .bp4-control-group {
    justify-conetnt: center;
  }
  .bp4-input-group {
    margin: auto;
  }
  .bp4-input-group .bp4-input {
    border-radius: 5px;

    ${sp`
      width: 140px;
  `}
  }
`;

export default DataRangeInput;
