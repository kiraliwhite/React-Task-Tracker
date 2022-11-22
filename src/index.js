import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppRootComponent from "./App"; //AppRootComponent來自這個檔案
import reportWebVitals from "./reportWebVitals";

//一個ReactDOM method,用來渲染root DOM node
const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render,React.StrictMod是嚴格模式,將App渲染到root DOM node上
//在render的時候呼叫AppRootComponent
root.render(
  <React.StrictMode>
    <AppRootComponent />
  </React.StrictMode>
);

reportWebVitals();
