import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AuthRoute from "components/AuthRoute";
import history from "utils/history";

import Home from "pages/Layout";
import Login from "pages/Login";

export default function App() {
  return (
    <Router history={history}>
      {/* <Link to="/login">登录</Link>
      <Link to="/home">首页</Link> */}
      <div>
        {/* 配置路由的规则 */}
        <Switch>
          <Redirect exact from="/" to="/home"></Redirect>
          <Route path="/login" component={Login}></Route>
          <AuthRoute path="/home" component={Home}></AuthRoute>
          {/* 修改的路由 */}
          
          {/* 配置一个404组件 */}
        </Switch>
      </div>
    </Router>
  );
}
