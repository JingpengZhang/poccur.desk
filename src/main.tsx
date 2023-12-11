import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import '@/assets/styles/preflight.css'
import "@/assets/styles/app.css"
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import {ConfigProvider} from "antd";
import zhCN from 'antd/locale/zh_CN'
import '@/assets/styles/nprogress.css'
import {Provider} from "react-redux";
import {store, persistor} from "@/store";
import {PersistGate} from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConfigProvider locale={zhCN}>
            <App/>
          </ConfigProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>,
);
