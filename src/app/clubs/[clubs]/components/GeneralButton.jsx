import './element.css'

const GeneralButton = ({button_text, button_classes, onSubmitHandler}) => {
  return (
    <div className="general_button_container">
        <button className={`general_button ${button_classes}`} onClick={onSubmitHandler}>{button_text}</button>
    </div>
  )
}

export default GeneralButton
