import './element.css'

const SubmitButton = ({button_text, button_classes, onSubmitHandler}) => {
  return (
    <div className="w-full my-10">
        <button className={`block py-2 px-10 border-[2px] border-white text-white outline-none text-xl font-bold mx-auto cursor-pointer duration-200 bg-transparent rounded-[10px] hover:bg-white/20 ${button_classes}`} type="submit" onClick={onSubmitHandler}>{button_text}</button>
    </div>
  )
}

export default SubmitButton
