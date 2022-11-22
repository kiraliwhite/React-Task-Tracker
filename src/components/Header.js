//簡寫是impt
import PropTypes from "prop-types";
import ButtonComponent from "./Button";

//用呼叫Button箭頭函式的方式,且帶入變數color,與text,傳給Button.js
const HeaderComponent = ({ title, onAdd, showAdd }) => {
  //當Button按下時,觸發上方onClick function,列出Click,且onClick這個變數,傳送給Button.js的Component
  //一般的button是小寫,這裡的component使用大寫的Button來做區分
  return (
    <header className="header">
      <h1>{title}</h1>
      <ButtonComponent
        color={showAdd ? "red" : "green"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
    </header>
  );
};

//預設參數,會將沒有輸入參數的地方補上預設值
HeaderComponent.defaultProps = {
  title: "Task Tracker",
};

//定義參數類型,要求輸入參數title必須為string,否則會報錯,但還是會render
HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
};

export default HeaderComponent;
