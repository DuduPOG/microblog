import React, { useState } from 'react';
import { Flex, Rate } from 'antd';
import type { RateProps } from 'antd';

const desc: RateProps['tooltips'] = [
  'Terrível',
  { placement: 'top', title: 'Ruim', trigger: 'hover' },
  'Normal',
  'Bom',
  'Maravilhoso',
];

function getDescTitle(value: number, desc: RateProps['tooltips']) {
  const item = desc?.[value - 1];
  return item && typeof item === 'object' ? item.title : item;
}

const Rank: React.FC = () => {
    const [value, setValue] = useState(3);
    return (
        <Flex gap="medium" vertical>
            <Rate tooltips={desc} onChange={setValue} value={value} />
            {value ? <span>{getDescTitle(value, desc) as React.ReactNode}</span> : null}
        </Flex>
    );
}

export default Rank;