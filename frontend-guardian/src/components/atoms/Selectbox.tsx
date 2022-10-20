// -- basic library --
import React from 'react';
import styled from 'styled-components';

// -- type declaration --

export interface SelectData<V = string> {
  name: string;
  value: V;
}

export interface SelectBoxProps<V = string> {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  test_id?: string;
  value: string;
  datas: SelectData<V>[];
  default_text?: string;
  default_text_value?: string;
  style?: React.CSSProperties;
  long?: boolean;
}

// -- main component --

const SelectBox: React.FC<SelectBoxProps> = (params) => {
  // -- preparations --
  const default_text = params.default_text || 'ー選択してくださいー';
  const default_text_value = params.default_text_value || '';

  // -- render part --
  return (
    <RoundedSelect
      onChange={params.onChange}
      date-testid={params.test_id}
      value={params.value}
      style={params.style}
      long={params.long}
    >
      {default_text === 'null' ? null : <option value={default_text_value}>{default_text}</option>}
      {params.datas.map((data, index) => (
        <option value={data.value} key={index}>
          {data.name}
        </option>
      ))}
    </RoundedSelect>
  );
};
const RoundedSelect = styled.select<{
  long?: boolean;
}>`
  max-width: 180px;
`;

// -- finally export part --

export default SelectBox;
