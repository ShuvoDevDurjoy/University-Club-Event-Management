
import './element.css'

const PasswordInput = ({onChangeHandler, changeValue, classes, elementLabel, elementName, element_id}) => {
  return (
    <div className={`mb-3 ${classes}`}>
        <label className='block text-xl font-bold mb-1 text-gray-100 whitespace-nowrap' htmlFor="">{elementLabel}</label>
        <input id={element_id} className="outline-none w-full min-w-[200px] p-[10px] border-2 border-white/20 rounded-[5px] text-xl text-gray-100" type="password" name={elementName} value={changeValue} onChange={onChangeHandler}></input>
    </div>
  )
}

export default PasswordInput
