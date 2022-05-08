// 导入当前组件的样式
import styles from "./index.module.scss";
// 导入 UI 组件
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
// 导入路由跳转组件（链接组件）
import { Link } from "react-router-dom";
// 导入 UI 图标
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// 导入自定义封装的 hook
import { useChannels } from "@/utils/customHooks";
// 导入 派发action的方法 和 获取 redux 中数据的方法
import { useDispatch, useSelector } from "react-redux";
// 导入 获取文章列表的action 和 删除文章的action
import { getArticleAction, delArticle } from "@/store/actions/article";
// 导入 副作用hook（来实现类组件中的生命周期钩子功能）和 获取DOM元素方法（还可以用于保存数据）
import { useEffect, useRef } from "react";
// 导入 使用路由对象 方法
import { useHistory } from "react-router-dom";
// 没有图片 -> 默认显示的图片
import defaultImg from "@/assets/error.png";
// 定义文章的状态
const statusLabel = [
  { text: "草稿", color: "default" },
  { text: "待审核", color: "blue" },
  { text: "审核通过", color: "green" },
  { text: "审核拒绝", color: "red" },
];

export default function Article() {
  // 获取 派发action 的方法
  const dispatch = useDispatch();
  // 使用 自定义hook 获取频道分类数据
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
  // 获取 redux 中的文章相关数据
  const { results, page, per_page, total_count } = useSelector(
    (state) => state.article
  );
  // 创建使用路由对象
  const history = useHistory();
  // 当 页面一加载 和 dispatch 发生变化时根据筛选条件来获取文章列表
  useEffect(() => {
    dispatch(getArticleAction(paramsRef.current));
  }, [dispatch]);
  // 定义表格的表头，及表格中显示内容
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      key: "cover",
      // 如何显示当前列中的数据，该属性接收一个函数，函数中的参数表示当前列的数据，可以自定义返回一个 jsx
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
        // Space 组件可以将被包裹的多个组件之间适当的间隙
        <Space size="middle">
          {/* 跳转到编辑文章 */}
          <Button
            onClick={() => history.replace("/home/publish/" + row.id)}
            type="link"
            icon={<EditOutlined />}
          />
          {/* 删除文章 */}
          <Button
            onClick={() => {
              Modal.confirm({
                title: "您是否删除该文章？",
                cancelText: "取消",
                okText: "确认",
                onOk: async () => {
                  // console.log(row.id);
                  // 这里需要 使用到 await, 因为执行删除后才获取新的数据
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

  // 点击筛选按钮, 获取筛选后的数据
  const onFinish = (values) => {
    // 拿到当前表单的筛选条件, 保存到筛选条件的对象中
    paramsRef.current.status = values.status;
    paramsRef.current.channel_id = values.channel_id;
    // 拿到日期组件中的日期数据, 进行格式化加入到筛选条件中
    if (values.dateArr) {
      paramsRef.current.begin_pubdate = values.dateArr[0].format(
        "YYYY-MM-DD HH:mm:ss"
      );
      paramsRef.current.end_pubdate = values.dateArr[1].format(
        "YYYY-MM-DD HH:mm:ss"
      );
    } else {
      // 如果没有时间筛选,则默认 undefined 来搜索
      paramsRef.current.begin_pubdate = undefined;
      paramsRef.current.end_pubdate = undefined;
    }
    // 筛选的时候需要重置页码为1
    paramsRef.current.page = 1;
    // console.log(paramsRef.current); // 根据当前条件筛选数据
    // 根据条件获取数据
    dispatch(getArticleAction(paramsRef.current));
  };

  // 切换分页获取数据
  const onPageChange = (page, pageSize) => {
    // 拿到分页器数据, 保存到筛选条件的对象中
    paramsRef.current.page = page;
    paramsRef.current.per_page = pageSize;
    // 根据筛选条件获取数据
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
