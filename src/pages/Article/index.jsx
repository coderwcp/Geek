import styles from "./index.module.scss";
import {
  Card,
  Form,
  Breadcrumb,
  Radio,
  Select,
  DatePicker,
  Button,
  Table,
  Space,
  Tag,
  Image,
  Modal,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useChannels } from "@/utils/customHooks";
import { useDispatch, useSelector } from "react-redux";
import { getArticleAction, delArticle } from "@/store/actions/article";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import defaultImg from "@/assets/error.png";
const statusLabel = [
  { text: "草稿", color: "default" },
  { text: "待审核", color: "blue" },
  { text: "审核通过", color: "green" },
  { text: "审核拒绝", color: "red" },
];

export default function Article() {
  const dispatch = useDispatch();
  const { channels } = useChannels();
  // 使用 ref 来保存筛选条件和分页切换的数据，不能使用setState来设置，因为会导致页面重新渲染数据刷新
  const paramsRef = useRef({
    page: 1,
    per_page: 10,
    begin_pubdate: undefined,
    end_pubdate: undefined,
    status: undefined,
    channel_id: undefined,
  });

  const { results, page, per_page, total_count } = useSelector(
    (state) => state.article
  );

  const history = useHistory();

  useEffect(() => {
    dispatch(getArticleAction(paramsRef.current));
  }, [dispatch]);

  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      render: (cover) => {
        let imgUrl = defaultImg;
        if (cover?.images?.length) {
          imgUrl = cover.images[0];
        }
        return (
          <Image
            src={imgUrl}
            style={{ objectFit: "cover" }}
            width={200}
            height={120}
          ></Image>
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <Tag color={statusLabel[status].color}>
            {statusLabel[status].text}
          </Tag>
        );
      },
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
      key: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
      key: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
      key: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
      key: "like_count",
    },
    {
      title: "操作",
      key: "action",
      render: (_, row) => (
        <Space size="middle">
          <Button
            onClick={() => history.replace("/home/publish/" + row.id)}
            type="link"
            icon={<EditOutlined />}
          />
          <Button
            onClick={() => {
              Modal.confirm({
                title: "您是否删除该文章？",
                cancelText: "取消",
                okText: "确认",
                onOk: async () => {
                  console.log(row.id);
                  await dispatch(delArticle(row.id));
                  message.success("删除成功");
                  dispatch(getArticleAction(paramsRef.current));
                },
              });
            }}
            danger
            type="link"
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  const onFinish = (values) => {
    paramsRef.current.status = values.status;
    paramsRef.current.channel_id = values.channel_id;
    if (values.dateArr) {
      paramsRef.current.begin_pubdate = values.dateArr[0].format(
        "YYYY-MM-DD HH:mm:ss"
      );
      paramsRef.current.end_pubdate = values.dateArr[1].format(
        "YYYY-MM-DD HH:mm:ss"
      );
    } else {
      paramsRef.current.begin_pubdate = undefined;
      paramsRef.current.end_pubdate = undefined;
    }
    paramsRef.current.page = 1; // 筛选的时候需要重置页码为1
    console.log(paramsRef.current); // 根据当前条件筛选数据
    dispatch(getArticleAction(paramsRef.current));
  };

  const onPageChange = (page, pageSize) => {
    paramsRef.current.page = page;
    paramsRef.current.per_page = pageSize;
    dispatch(getArticleAction(paramsRef.current));
  };

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
        <Form onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              {/* 默认选中 value={undefined} */}
              <Radio value={undefined}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>已通过</Radio>
              <Radio value={3}>已拒绝</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select style={{ width: 288 }}>
              {channels?.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="dateArr">
            <DatePicker.RangePicker
              style={{ width: 288 }}
            ></DatePicker.RangePicker>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
        <Card
          title={`根据筛选条件查询到 ${total_count} 条结果`}
          style={{ marginTop: 24 }}
        >
          <Table
            pagination={{
              current: page,
              pageSize: per_page,
              total: total_count,
              onChange: onPageChange,
            }}
            columns={columns}
            dataSource={results}
            rowKey="id"
          ></Table>
        </Card>
      </Card>
    </div>
  );
}
