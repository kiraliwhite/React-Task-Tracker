import PropTypes from "prop-types";

//Button function,接收傳進來的變數
const ButtonComponent = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className="btn"
    >
      {text}
    </button>
  );
};
//設定預設值,若沒有傳入變數時,使用預設值替代
ButtonComponent.defaultProps = {
  color: "steelblue",
  text: "Add",
};

//這邊的propTypes是關鍵字,大小寫要一致,內容則是大寫PropTypes,定義輸入參數必須是string
//func指的是這是一個function
ButtonComponent.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonComponent;
