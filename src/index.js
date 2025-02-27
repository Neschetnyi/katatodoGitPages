import React from "react";
import ReactDOM from "react-dom/client";
import TodoApp from "./components/TodoApp/TodoApp";
import "./index.css";

const app = <TodoApp />;

const root = ReactDOM.createRoot(document.querySelector(".app"));
root.render(app);
