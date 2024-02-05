import React, { useCallback, useState } from 'react';

import { Calendar } from '@natscale/react-calendar';

import '@natscale/react-calendar/dist/main.css';

export default function Cal() {
    const [value, setValue] = useState(new Date());
  
    const onChange = useCallback(
      (val) => {
        setValue(val);
      },
      [setValue],
    );
  
    return <Calendar value={value} onChange={onChange} />;
  }