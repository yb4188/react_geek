import React, { Component } from "react";
import { Card } from "antd";
import "./index.css";
import logo from "../../assets/images/logo.png";

export default class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <Card className="login" >
          <img src={logo} alt="" className="login-img"/>
        </Card>
      </div>
    );
  }
}
