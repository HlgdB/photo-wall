import React, { useEffect, useState } from "react";
import zhCN from "antd/lib/locale/zh_CN";
import "./App.css";
import logo from "./sheep.svg";
import binAvatar from "./bin.jpeg";
import yangAvater from "./yang.jpeg";
import { ConfigProvider } from "antd";
import TimeRecorder from "./components/timeRecorder";
import TagPhotos, { tagComponentsProps } from './components/tagPhotos';
import MyUpload from "./components/myUpload";
import { BACKEND_URL } from './config';

function App() {
  const [rootData, setRootData] = useState([]);

  useEffect(() => {
    if(!rootData.length) {
      fetch(`${BACKEND_URL}/getAllInfos`, {
        method: 'GET',
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log(data);
        setRootData(data);
      });
    }
  }, [rootData]);

  return (
    <ConfigProvider locale={zhCN}>
      <div className="App">
        <MyUpload />
        <header className="header">
          <div className="container">
            <section>
              <img src={logo} className="logo" alt="logo" />
            </section>
            <section>
              <TimeRecorder />
            </section>
            <section style={{ textDecoration: "underline" }}>
              👏🏻👏🏻👏🏻 Welcome to our album.
              <br />
              I am here to share and save
              <br />
              the pieces of our lives.
              <br />
              Hope you will like it.
            </section>
            <section>
              <img src={yangAvater} className="avatar" alt="avatar" />
              {" with "}
              <img src={binAvatar} className="avatar" alt="avatar" />
            </section>
          </div>
        </header>
        <main className="main">
          {
            rootData ? rootData.map((item: tagComponentsProps) => {
              return(
                <TagPhotos {...item} key={item.idx} />
              )
            }) : null
          }
        </main>
        <footer className="footer">
          <div className="container">
            HRB with
            <a href="https://zh-hans.reactjs.org/"> React </a>
            and
            <a href="http://macyjs.com/"> Macy.js </a>
          </div>
        </footer>
      </div>
    </ConfigProvider>
  );
}

export default App;
