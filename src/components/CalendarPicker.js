import React from 'react';
import { Calendar } from 'react-native-calendars';

const CalendarPicker = ({ onDaySelect }) => (
  <Calendar
    onDayPress={day => onDaySelect(day.dateString)}
    markedDates={{ [day.dateString]: { selected: true } }}
  />
);

export default CalendarPicker;
