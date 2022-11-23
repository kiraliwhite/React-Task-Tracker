//要使用useState這個hook,要從react import,
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import寫好的HeaderComponent,TasksComponent
import HeaderComponent from "./components/Header";
import FooterComponent from "./components/Footer";
import TasksComponent from "./components/Tasks";
import AddTask from "./components/AddTask";
import AboutComponent from "./components/About";

//在root element中呼叫該HeaderComponent,TasksComponent
function AppRootComponent() {
  const [showAddTask, setShowAddTask] = useState(false);
  //tasks這個變數一樣代表陣列(state),setTasks則是要來更新這個state(陣列)的變數
  const [tasksArray, setTasks] = useState([]);

  //使用useEffect需呼叫一個function,會在整個頁面渲染完成後呼叫
  useEffect(() => {
    const getTasks = async () => {
      //呼叫fetchTasks 抓取資料,存到變數中
      const tasksFromServer = await fetchTasks();
      //用抓取到的資料修改state狀態
      setTasks(tasksFromServer);
    };
    getTasks();
    //Dependencies array如果你有一些value  你想要在這些value 更改時 執行他 可以放在內
  }, []);

  //抓資料的function放在外層,讓其他function也可以使用這個
  const fetchTasks = async () => {
    //使用fetch 方法 抓取網頁的json資料
    const response = await fetch("http://localhost:5000/tasks");
    //從response中提取json data
    const data = await response.json();
    //回傳json data
    return data;
  };

  //用id 來抓取單一Task
  const fetchSingleTasks = async (id) => {
    //使用fetch 方法 抓取網頁的json資料
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    //從response中提取json data
    const data = await response.json();
    //回傳json data
    return data;
  };

  const addTask = async (task) => {
    //使用post方法,對後端發送資料
    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      //body是發送的內容,透過JSON.stringify將物件轉為字串,變為json格式
      body: JSON.stringify(task),
    });

    //data變數 是等response回應的.json
    const data = await response.json();
    //用setTask修改state, 加入的值是data
    setTasks([...tasksArray, data]);
    //const id = Math.floor(Math.random() * 10000) + 1;  //產生隨機數id
    // const id = tasksArray.length + 1; //用現有tasksArray陣列長度產生id
    // //使用id與傳進來的物件task(保留在form輸入的所有東西,包含text,day,reminder), 來建立一個新的物件
    // const newTask = { id, ...task };
    // //使用setTasks這個useState,保留原本所有的tasksArray的同時,將newTask 加到tasksArray這個state中
    // setTasks([...tasksArray, newTask]);
    // console.log(id);
  };

  //deleteTask function,會作為參數傳給TasksComponent
  //當SingleTaskComponent的 X icon的onClick被觸發時, 傳入該taskElement的id
  const deleteTask = async (id) => {
    //使用fetch 抓取資料,匹配到id後,用delete request刪除他
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });

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
  const toggleRemider = async (id) => {
    //抓取單一 Task之後,存到變數內
    const taskToToggle = await fetchSingleTasks(id);
    //保留原本的Task的剩餘內容, 只更新reminder屬性,改為相反值
    const updateTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      //因為是更新而不是重新建立,所以用PUT方法
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updateTask),
    });

    //發送PUT request之後,將json存為變數,data,並將data.reminder更新到前端UI,如下方所寫
    const data = await response.json();

    //使用setTasks function修改state,
    setTasks(
      //使用Array.map方法, 抓取每個陣列元素回傳一個新的陣列
      //在回傳新陣列時, 使用Task陣列的元素ID 去比對傳入function的id, 若為true
      //則保留該元素的所有東西(...是複製的意思),並僅修改reminder,改為反向
      //若比對失敗,則保留原本的值
      //用意是當某Task被按兩下時,就會抓到該元素的id,並將元素的reminder值,重新設定為 反向
      tasksArray.map((taskElement) => {
        return taskElement.id === id
          ? { ...taskElement, reminder: data.reminder }
          : taskElement;
      })
    );
  };

  //由於tasks陣列(state)變成global state,因此要把陣列作為變數,傳到TasksComponent中,做處理
  return (
    //這整個回傳的JSX被Router包住  代表這裡面的component會做路由
    //Routes 則會包住 要路由的Component
    //Route 則寫入路徑名稱  例如 "/" 或是"/about" 後面的element則是要顯示出的元素(component)
    <Router>
      <div className="container">
        <HeaderComponent
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={
              <>
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
              </>
            }
          />
          <Route path="/about" element={<AboutComponent />} />
        </Routes>
        <FooterComponent />
      </div>
    </Router>
  );
}

export default AppRootComponent;
