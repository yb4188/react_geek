import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";


import Home from "./pages/Layout";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <div>
        App
        <Link to="/login">登录</Link>
        <Link to="/home">首页</Link>
        {/* 配置路由的规则 */}
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route path="/home" component={Home}></Route>
          {/* 配置一个404组件 */}
        </Switch>
      </div>
    </Router>
  );
}
