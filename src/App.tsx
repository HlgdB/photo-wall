import React, { useEffect } from "react";
import zhCN from "antd/lib/locale/zh_CN";
import "./App.css";
import Macy from "macy";
import logo from "./sheep.svg";
import binAvatar from "./bin.jpeg";
import yangAvater from "./yang.jpeg";
import { ConfigProvider, Image, Divider } from "antd";
import TimeRecorder from "./components/timeRecorder";

function App() {
  useEffect(() => {
    new Macy({
      container: "#photo-container",
      trueOrder: false,
      waitForImages: false,
      useOwnImageLoader: false,
      debug: true,
      mobileFirst: true,
      columns: 1,
      margin: {
        y: 16,
        x: 16,
      },
      breakAt: {
        1200: 3,
        940: 3,
        520: 3,
        400: 2,
      },
    });
    return () => {};
  }, []);

  let image_list = [
    "https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp",
    "https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp",
    "https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp",
  ];
  const power = 3;
  for (let i = 0; i < power; i++) image_list = image_list.concat(image_list);

  return (
    <ConfigProvider locale={zhCN}>
      <link rel="icon" href={logo} />
      <div className="App">
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
          <div className="container">
            <Divider />
            <div id="photo-container">
              {image_list.map((item: string, idx: number) => {
                return <Image src={item} className="image" />;
              })}
            </div>
          </div>
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
