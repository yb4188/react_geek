import React, { Component } from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Button,
  DatePicker,
  Table,
  Tag,
  Space,
  Modal,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { ArtStatus } from "api/constant";

import { getArts, delAtr } from "api/arts";
import defaultImg from "assets/images/error.png";
import Channel from "../../components/channel";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { confirm } = Modal;
export default class ArtList extends Component {
  //初始化状态
  state = {
    channels: [],
    artInfo: {},
  };
  //获取频道信息
  getArtsInfo = async () => {
    let res = await getArts(this.reqParams);

    this.setState({
      artInfo: res.data,
    });
  };
  //定义页码数量对象
  reqParams = {
    page: 1,
    per_page: 10,
  };
  //页码发生改变时
  changePage = (page, pagesize) => {
    this.reqParams.page = page;
    this.reqParams.per_page = pagesize;
    this.getArtsInfo(this.reqParams);
  };
  //提交
  finish = ({ status, channel_id, date }) => {
    if (status !== -1) {
      this.reqParams.status = status;
    } else {
      delete this.reqParams.status;
    }
    if (channel_id !== undefined) {
      this.reqParams.channel_id = channel_id;
    } else {
      delete this.reqParams.channel_id;
    }
    if (date) {
      this.reqParams.begin_pubdate = date[0]
        .startOf("day")
        .format("YYYY-MM-DD HH:MM:SS");
      this.reqParams.end_pubdate = date[1]
        .endOf("day")
        .format("YYYY-MM-DD HH:MM:SS");
    } else {
      delete this.reqParams.begin_pubdate;
      delete this.reqParams.end_pubdate;
    }
    this.reqParams.page = 1;
    this.getArtsInfo();
  };
  //删除文章
  delArt = (id) => {
    //提示
    confirm({
      title: "你好好瞅瞅",
      icon: <ExclamationCircleOutlined />,
      content: "确定删了啊",
      onOk: async () => {
        let res = await delAtr(id);
        if (res.message === "OK") {
          this.getArtsInfo();
          message.success("删除成功", 1);
        }
      },
    });
  };
  //表格列
  columns = [
    {
      title: "封面",
      dataIndex: "",
      render(data) {
        if (data.cover.type === 0) {
          return (
            <img
              src={defaultImg}
              alt=""
              style={{ width: 200, height: 120, objectFit: "cover" }}
            />
          );
        }
        return (
          <img
            src={data.cover.images[0]}
            alt=""
            style={{ width: 200, height: 120, objectFit: "cover" }}
          />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "状态",
      dataIndex: "status",
      render(status) {
        let obj = ArtStatus.find((item) => item.id === status);
        return <Tag color={obj.color}>{obj.name}</Tag>;
      },
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space>
            <Button
              type="primary"
              shape="circle"
              onClick={() => {
                this.props.history.push(`/home/artpublish/${data.id}`);
              }}
              icon={<EditOutlined />}
            />
            <Button
              type="primary"
              shape="circle"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                this.delArt(data.id);
              }}
            />
          </Space>
        );
      },
    },
  ];

  render() {
    let { page, per_page, results, total_count } = this.state.artInfo;
    return (
      <div>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>文章列表</Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          {/* 表单 */}
          <Form initialValues={{ status: -1 }} onFinish={this.finish}>
            <Form.Item label="状态" name="status">
              <Radio.Group>
                {ArtStatus.map((item) => {
                  return (
                    <Radio value={item.id} key={item.id}>
                      {item.name}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </Form.Item>
            {/* 下拉框 */}
            <Form.Item label="频道" name="channel_id">
              <Channel></Channel>
            </Form.Item>
            {/* 下拉框 */}
            {/* 日期 */}
            <Form.Item label="日期" name="date">
              <RangePicker></RangePicker>
            </Form.Item>
            {/* 日期 */}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                筛选
              </Button>
            </Form.Item>
          </Form>
          {/* 表单 */}
        </Card>
        <Card title={`根据筛选条件共查询到${total_count}条结果`}>
          <Table
            dataSource={results}
            columns={this.columns}
            rowKey="id"
            pagination={{
              position: ["topLeft"],
              total: total_count,
              current: page,
              pageSize: per_page,
              onChange: this.changePage,
            }}
          />
          ;
        </Card>
      </div>
    );
  }

  componentDidMount() {
    this.getArtsInfo();
  }
}
