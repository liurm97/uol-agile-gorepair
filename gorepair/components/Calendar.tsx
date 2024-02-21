import React, { useCallback, useState, forwardRef, useImperativeHandle } from 'react';

import { Calendar } from '@natscale/react-calendar';

import '@natscale/react-calendar/dist/main.css';
import { Input } from '@chakra-ui/react';

const CalFunc = (props) => {
  
    const onChange = useCallback(
      (val) => {
        props.onChangeValue(val);
      },
      [props.onChangeValue],
    );
  
    return <Calendar value={props.value} onChange={onChange}/>;
  }

  export default CalFunc