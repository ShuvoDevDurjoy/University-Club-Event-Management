'use client'
const SelectionInput = ({elementLabel, elementName, options, onChangeHandler, selectedValue, classes, element_id, option_name, option_value}) => {
  return (
    <div className={`mb-3`}>
        <label className='block text-xl font-bold mb-1 text-gray-100 whitespace-nowrap' htmlFor={element_id}>{elementLabel}</label>
        <select className="appearance-none outline-none w-full min-w-[200px] p-[10px] capitalize border-2 border-white/20 rounded-[5px] text-xl text-black-100" id={element_id} value={selectedValue} name={elementName} onChange={onChangeHandler}>
            {
                options.map((option,index)=>{
                    return <option key={index} className=' text-black capitalize' value={option[option_value]}>{option[option_name]}</option>
                })
            }
        </select>
    </div>
  )
}

export default SelectionInput
