import SingleTaskComponent from "./SingleTask";

//被App.js所呼叫,接收來自App.js這個root component的變數(tasks陣列)
const TasksComponent = ({ tasksArray, onDelete, onToggle }) => {
  //tasks陣列使用map方法,傳入一個箭頭函式,箭頭函式的參數taskElement是代表每一個陣列元素
  //意思是指依序將陣列中的每一個元素,丟到箭頭函式內處理,回傳出JSX格式
  //陣列有三個元素,因此回傳時會獲得三個JSX,
  //這三個JSX是由三個元素的text屬性組成

  //在回傳JSX時,呼叫SingleTaskComponent,傳入tasks陣列的每一個陣列元素,當作變數輸入
  return (
    <>
      {tasksArray.map((taskElement) => {
        return (
          <SingleTaskComponent
            key={taskElement.id}
            taskElement={taskElement}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        );
      })}
    </>
  );
};
export default TasksComponent;
