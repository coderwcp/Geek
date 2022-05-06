import styles from "./index.module.scss";
import {
  Card,
  Form,
  Breadcrumb,
  Radio,
  Select,
  DatePicker,
  Button,
} from "antd";
import { Link } from "react-router-dom";

export default function Article() {
  return (
    <div className={styles.root}>
      <Card
        title={
          // 面包屑
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* 表单 */}
        <Form>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={undefined}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>已通过</Radio>
              <Radio value={3}>已拒绝</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select style={{ width: 288 }}>
              <Select.Option value={1}>java</Select.Option>
              <Select.Option value={2}>java</Select.Option>
              <Select.Option value={3}>java</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="dateArr">
            <DatePicker.RangePicker
              style={{ width: 288 }}
            ></DatePicker.RangePicker>
          </Form.Item>
          <Form.Item>
            <Button type="primary">筛选</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
