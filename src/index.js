import React from "react";
import ReactDOM from "react-dom";
import zhCN from "antd/es/locale/zh_CN";
import { ConfigProvider } from "antd";
import "moment/locale/zh-cn";
import "antd/dist/antd.min.css";

import App from "./App";

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById("root")
);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
