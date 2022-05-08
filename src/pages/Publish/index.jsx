import { useChannels } from "@/utils/customHooks";
import {
  Card,
  Breadcrumb,
  Form,
  Input,
  Select,
  Space,
  Button,
  Radio,
  Upload,
  message,
} from "antd";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addArticle } from "@/store/actions/article";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Publish() {
  // 频道数据
  const { channels } = useChannels();
  const [type, setType] = useState(1);
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const onTypeChange = (e) => {
    setType(e.target.value);
    setFileList([]);
  };

  const onUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const onFinish = (values) => {
    // 文章封面的 type 和 上传图片的数量是否和 type 一致
    if (type !== fileList.length) {
      return message.warning("上传图片的数量是否和类型不一致");
    }
    // 组合数据
    const data = {
      ...values,
      cover: {
        type,
        images: fileList.map((item) => item?.response?.data?.url || item.url),
      },
    };
    // 调用添加文章 action
    dispatch(addArticle(data));
    // 添加成功跳转到文章管理页面
    history.push("/home/article");
  };

  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/home/article">内容管理</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form labelCol={{ span: 4 }} onFinish={onFinish}>
          <Form.Item
            label="文章标题："
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="所属频道："
            name="channel_id"
            rules={[{ required: true, message: "请选择所属频道" }]}
          >
            <Select style={{ width: 400 }}>
              {channels?.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="文章封面">
            <Form.Item>
              <Radio.Group value={type} onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {(type === 1 || type === 3) && (
              <div style={{ marginTop: 16 }}>
                <Upload
                  name="image"
                  listType="picture-card"
                  action="http://toutiao.itheima.net/v1_0/upload"
                  fileList={fileList}
                  onPreview={() => {}}
                  onChange={onUploadChange}
                >
                  {fileList.length < type ? (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  ) : null}
                </Upload>
              </div>
            )}
          </Form.Item>
          <Form.Item
            label="文章内容"
            initialValue=""
            name="content"
            wrapperCol={{ span: 16 }}
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill placeholder="请输入文章内容"></ReactQuill>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发表文章
              </Button>
              <Button size="large">存入草稿</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
