import React, { useState } from 'react';
import { Upload, Button, message, Select, Drawer, Divider } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import './index.css';
import { BACKEND_URL } from '../../config';
import { tagComponentsProps } from '../tagPhotos';

const { Option } = Select;

const DrawerInner = (props: any) => {
  const { tags } = props;
  const [tagValue, setTagValue] = useState('daily');
  const [fileList, setFileList] = useState([]);

  const uploadProps = {
    name: 'photos',
    accept: 'image/*',
    multiple: true,
    data: {
      value: tagValue,
    },
    maxCount: 100,
    showUploadList: true,
    action: `${BACKEND_URL}/upload`,
    onChange(info: any) {
      setFileList(info.fileList);
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return(
    <div className="drawer-inner">
      <section>
        <pre style={{ display: 'inline' }}>Choose a tag:  </pre>
        <Select defaultValue="daily" onChange={(val) => {
          setTagValue(val);
        }}>
          {tags.map((item: tagComponentsProps) => {
            return(
              <Option value={item.value} key={item.value}>{item.label}</Option>
            );
          })}
        </Select>
        <Divider />
      </section>
      <section>
      <pre>Choose photos:  </pre>
        <Upload {...uploadProps} listType="picture-card" fileList={fileList}>
          {'+ Upload'}
        </Upload>
        <Button type="default" onClick={() => {
          setFileList([]);
        }}>clear the list</Button>
      </section>
    </div>
  )
}

const Index = (props: any) => {
  const { tags } = props;
  const [visible, setVisible] = useState(false);

  return(
    <div className="uploadGroup">
      <Button className="uploadBtn" type="default" icon={<UpOutlined />} onClick={() => {
        setVisible(true);
      }} />
      <Drawer
          title="Upload Photos"
          placement="bottom"
          visible={visible}
          maskClosable={true}
          closable={false}
          onClose={() => {
            setVisible(false);
          }}
        >
          <DrawerInner tags={tags} />
        </Drawer>
    </div>
  )
}

export default Index;
