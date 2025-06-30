'use client'
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TimeInput = ({ elementLabel, elementName, currentTime, onChangeHandler }) => {
  return (
    <div className="text-white">
      <p className="block text-xl font-bold mb-1 text-gray-100 whitespace-nowrap">{elementLabel}</p>
      <DatePicker
        selected={currentTime}
        onChange={(date) => onChangeHandler(elementName, date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="hh:mm aa"
        placeholderText="Select time"
        className="outline-none w-full min-w-[200px] p-[10px] border-2 border-white/20 rounded-[5px] text-xl text-gray-100 bg-transparent"
      />
    </div>
  );
};

export default TimeInput;
