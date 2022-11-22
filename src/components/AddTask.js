import { useState } from "react";

const AddTask = ({ onAdd }) => {
  //text,day的預設值為空字串
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  //reminder state的預設值是false
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
	  //停止事件的預設動作
	  e.preventDefault()
	  //若text state為空值,則輸出錯誤訊息,然後跳出
	  if(!text) {
		  alert("Please add a task")
		  return
	  }

	  //若通過檢測,則呼叫onAdd function,傳入state的值
	  onAdd({text,day,reminder})
	  //呼叫完成後將state歸0
	  setText("")
	  setDay("")
	  //Reminder的state預設為false
	  setReminder(false)

  }

  //在回傳JSX時,回傳一個form表單,三個label與input value的值,value是抓取text state,預設是空值,onChange是當有任何輸入時,會觸發
  //一個箭頭函式,function參數為e 也就是event object,然後function內容是呼叫setText,去將值修改state,就會更新在input value上
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Day & Time"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input
          type="checkbox"
		  checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
