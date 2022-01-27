import React, { useEffect } from "react";
import { Divider, Image } from "antd";
import Macy from 'macy';
import './index.css';
import { Destination } from '../../config';

export interface tagComponentsProps {
  label: string;
  photosPathList: Array<string>;
  idx: string | number;
  value: string;
}

const Index = (props: tagComponentsProps) => {
  const { label, photosPathList, value } = props;

  useEffect(() => {
    new Macy({
      container: `#${value}-container`,
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container" id={`#${value}`}>
      <Divider orientation='left'>{label}</Divider>
      <div id={`${value}-container`}>
        {photosPathList.map((path: string) => {
          return <Image src={Destination+path} className="image" key={path} />;
        })}
      </div>
    </div>
  );
};

export default Index;