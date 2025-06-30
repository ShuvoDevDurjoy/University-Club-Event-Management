import './element.css'
const TextArea = ({elementName, elementId, elementLabel, elementValue, classes, onChangeHandler}) => {
  return (
    <div className="mb-3">
        <label className='block text-xl font-bold mb-1 text-gray-100 whitespace-nowrap' htmlFor={elementId}>{elementLabel}</label>
        <textarea 
            name={elementName}
            id={elementId}
            value={elementValue}
            className={`outline-none w-full min-w-[200px] min-h-[300px] p-[10px] border-2 border-white/20 rounded-[5px] text-xl text-gray-100`}
            onChange={onChangeHandler}
        />
    </div>
  )
}

export default TextArea
