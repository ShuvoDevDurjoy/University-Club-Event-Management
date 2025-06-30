import React from 'react';

const DateInput = ({ onChangeHandler, changeValue, classes, elementLabel, elementName, element_id }) => {
  // Get tomorrow's date in YYYY-MM-DD format
  const getDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <div className={`mb-3 ${classes}`}>
      <label className='block text-xl font-bold mb-1 text-gray-100 whitespace-nowrap' htmlFor={element_id}>
        {elementLabel}
      </label>
      <input
        id={element_id}
        className="outline-none w-full min-w-[200px] p-[10px] border-2 border-white/20 rounded-[5px] text-xl text-gray-100 bg-transparent"
        type="date"
        name={elementName}
        value={changeValue}
        onChange={onChangeHandler}
        min={getDate()}
      />
    </div>
  );
};

export default DateInput;
