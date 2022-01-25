import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './index.css';
import { BACKEND_URL } from '../../config';

const Index = () => {
  const props = {
    name: 'photos',
    accept: 'image/*',
    multiple: true,
    data: {
      value: 'daily',
    },
    maxCount: 9,
    showUploadList: false,
    action: `${BACKEND_URL}/upload`,

    onChange(info: any) {
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
    <div className="uploadGroup">
      <Upload {...props}>
        <Button className="uploadBtn" type="dashed" icon={<UploadOutlined />}>tap me</Button>
      </Upload>
    </div>
  )
}

export default Index;