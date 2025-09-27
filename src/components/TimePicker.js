import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimePicker = ({ label, value, onChange }) => (
  <>
    <Text>{label}</Text>
    <DateTimePicker
      value={value}
      mode="time"
      display="spinner"
      onChange={(event, selectedDate) => onChange(selectedDate)}
    />
  </>
);

export default TimePicker;
