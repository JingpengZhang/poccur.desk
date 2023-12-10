import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import '@/assets/styles/preflight.css'
import "@/assets/styles/app.css"
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import {ConfigProvider} from "antd";
import zhCN from 'antd/locale/zh_CN'
import '@/assets/styles/nprogress.css'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <ConfigProvider locale={zhCN}>
        <App/>
      </ConfigProvider>
    </React.StrictMode>,
);
