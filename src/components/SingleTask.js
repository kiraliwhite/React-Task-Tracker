//從react-icons的library的fa資料夾中,提取FaTimes這個icon
import { FaTimes } from "react-icons/fa";

//此component,用意為Tasks列表底下的單一Task, 接收來自TasksComponent,傳過來的變數,是每一個Task陣列中的元素
//接收到元素之後,使用陣列元素的text,day 印出JSX
//使用icon FaTimes,就跟呼叫一般component是一樣的用法 <ComponetName />
const SingleTaskComponent = ({ taskElement, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${taskElement.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(taskElement.id)}
    >
      <h3>
        {taskElement.text}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(taskElement.id)}
        />
      </h3>
      <p>{taskElement.day}</p>
    </div>
  );
};

export default SingleTaskComponent;
