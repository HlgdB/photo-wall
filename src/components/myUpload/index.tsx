import React, { useState, useRef } from "react";
import { Upload, Button, message, Select, Drawer, Divider, Input } from "antd";
import { UpOutlined } from "@ant-design/icons";
import "./index.css";
import { BACKEND_URL } from "../../config";
import { tagComponentsProps } from "../tagPhotos";
import { AddTag, GetAllInfos } from "../../backend";

const { Option } = Select;

let shouldRefresh: boolean = false;

const DrawerInner = (props: any) => {
  const [allTags, setAllTags] = useState(props.tags);
  const [tagValue, setTagValue] = useState("daily");
  const [fileList, setFileList] = useState([]);
  const tagRef = useRef<Input>(null);

  const uploadProps = {
    name: "photos",
    accept: "image/*",
    multiple: true,
    data: {
      value: tagValue,
    },
    maxCount: 100,
    showUploadList: true,
    action: `${BACKEND_URL}/upload`,
    onChange(info: any) {
      shouldRefresh = true;
      setFileList(info.fileList);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const addTag = async () => {
    shouldRefresh = true;
    if(!tagRef.current){
      return;
    }
    const tagInfo = tagRef.current.state.value.split('---');
    if(tagInfo.length !== 2){
      message.error('格式错误！');
      return;
    }
    const tags = await AddTag(tagInfo[1], tagInfo[0]);
    setAllTags(tags);
    message.success("got it!");
  }

  return (
    <div className="drawer-inner">
      <section>
        <pre style={{ display: "inline" }}>Add a tag:     </pre>
        <Input
          ref={tagRef}
          style={{ width: "37%", marginRight: 8 }}
          autoComplete="off"
          placeholder="e.g. 日常---daily"
        />
        <Button onClick={() => {addTag()}}>confirm</Button>
        <Divider />
      </section>
      <section>
        <pre style={{ display: "inline" }}>Choose a tag:  </pre>
        <Select
          defaultValue="daily"
          onChange={(val) => {
            setTagValue(val);
          }}
        >
          {allTags.map((item: tagComponentsProps) => {
            return (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            );
          })}
        </Select>
        <Divider />
      </section>
      <section>
        <pre>Choose photos: </pre>
        <Upload {...uploadProps} listType="picture-card" fileList={fileList}>
          {"+ Upload"}
        </Upload>
        <Button
          type="default"
          onClick={() => {
            setFileList([]);
          }}
        >
          clear the list
        </Button>
      </section>
    </div>
  );
};

const Index = (props: any) => {
  const { tags, setRootData } = props;
  const [visible, setVisible] = useState(false);

  return (
    <div className="uploadGroup">
      <Button
        className="uploadBtn"
        type="default"
        icon={<UpOutlined />}
        onClick={() => {
          setVisible(true);
        }}
      />
      <Drawer
        title="Upload Photos"
        placement="bottom"
        visible={visible}
        maskClosable={true}
        closable={false}
        onClose={() => {
          setVisible(false);
          (async function() {
            shouldRefresh && setRootData(await GetAllInfos());
          })();
        }}
      >
        <DrawerInner tags={tags} />
      </Drawer>
    </div>
  );
};

export default Index;
