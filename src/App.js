//import寫好的HeaderComponent,TasksComponent
import HeaderComponent from "./components/Header";
import TasksComponent from "./components/Tasks";
//要使用useState這個hook,要從react import,
import { useState } from "react";
import AddTask from "./components/AddTask";

//在root element中呼叫該HeaderComponent,TasksComponent
function AppRootComponent() {
  const [showAddTask, setShowAddTask] = useState(false);
  //tasks這個變數一樣代表陣列(state),setTasks則是要來更新這個state(陣列)的變數
  const [tasksArray, setTasks] = useState([
    {
      id: 1,
      text: "Doctors Appointment",
      day: "Feb 5th at 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Metting at School",
      day: "Feb 6th at 1:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Food Shopping",
      day: "Feb 5th at 2:30pm",
      reminder: false,
    },
  ]);

  const addTask = (task) => {
    //const id = Math.floor(Math.random() * 10000) + 1;  //產生隨機數id
    const id = tasksArray.length + 1; //用現有tasksArray陣列長度產生id
    //使用id與傳進來的物件task(保留在form輸入的所有東西,包含text,day,reminder), 來建立一個新的物件
    const newTask = { id, ...task };
    //使用setTasks這個useState,保留原本所有的tasksArray的同時,將newTask 加到tasksArray這個state中
    setTasks([...tasksArray, newTask]);
    console.log(id);
  };

  //deleteTask function,會作為參數傳給TasksComponent
  //當SingleTaskComponent的 X icon的onClick被觸發時, 傳入該taskElement的id
  const deleteTask = (id) => {
    //呼叫我們在useState宣告的setTasks function來修改state
    //使用array.filter這個method, return出來的陣列, 只保留篩選後的結果
    //篩選的條件是, 當陣列中的每一個元素的id 不等於呼叫此deleteTasks的id時  才保留
    setTasks(
      tasksArray.filter((taskElement) => {
        return taskElement.id !== id;
      })
    );
  };

  //toggleRemider function會作為參數傳給TasksComponent
  //當SingleTaskComponent的Task被按兩下,會觸發此function,傳入被按的Task ID當作參數
  const toggleRemider = (id) => {
    //使用setTasks function修改state,
    setTasks(
      //使用Array.map方法, 抓取每個陣列元素回傳一個新的陣列
      //在回傳新陣列時, 使用Task陣列的元素ID 去比對傳入function的id, 若為true
      //則保留該元素的所有東西(...是複製的意思),並僅修改reminder,改為反向
      //若比對失敗,則保留原本的值
      //用意是當某Task被按兩下時,就會抓到該元素的id,並將元素的reminder值,重新設定為 反向
      tasksArray.map((taskElement) => {
        return taskElement.id === id
          ? { ...taskElement, reminder: !taskElement.reminder }
          : taskElement;
      })
    );
  };

  //由於tasks陣列(state)變成global state,因此要把陣列作為變數,傳到TasksComponent中,做處理
  return (
    <div className="container">
      <HeaderComponent onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasksArray.length > 0 ? (
        <TasksComponent
          tasksArray={tasksArray}
          onDelete={deleteTask}
          onToggle={toggleRemider}
        />
      ) : (
        "No Tasks To Show"
      )}
    </div>
  );
}

export default AppRootComponent;
