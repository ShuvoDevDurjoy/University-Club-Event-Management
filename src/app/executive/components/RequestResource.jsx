"use client";

import { useState } from "react";

const RequestResource = ({ item, ind, onSubmitHadler }) => {
  const [count, setCount] = useState(1);

  const onCountChange = (event) => {
    const match = event.target.value.match(/^[1-9]\d*$/);
    console.log(event.target.value, " and ", item.available);
    if (match && parseInt(event.target.value) <= parseInt(item.available)) {
      setCount(event.target.value);
    }
  };

  return (
    <div
      key={ind}
      className="px-3 py-3 flex justify-between items-center bg-white/20 rounded-[5px] border-white/20 border-[2px]"
    >
      <div>
        <p className="text-xl">Name: {item.name}</p>
        <p className="text-xl">Available: {item.available}</p>
      </div>
      {item.type === "dynamic" && (
        <div className="flex gap-2 items-center">
          <label htmlFor="count_reserve_request">Select Quantity</label>
          <input
            type="number"
            name="count"
            id="count_reserve_request"
            min={1}
            max={item.available}
            value={count}
            onChange={onCountChange}
            className="border-white/10 border-[2px] text-xl px-3 py-2"
          />
        </div>
      )}
      <div>
        <p
          onClick={() => {
            onSubmitHadler(item.resource_id, count);
          }}
          className="px-5 py-2 cursor-pointer bg-green-500 border-[2px] border-white/10 rounded-[5px] text-xl"
        >
          Procced
        </p>
      </div>
    </div>
  );
};

export default RequestResource;
