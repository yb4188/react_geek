import React, { Component } from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Button,
  Select,
  DatePicker,
  Table,
} from "antd";
import { Link } from "react-router-dom";
import { ArtStatus } from "api/constant";
import { channel_id } from "api/channels";
import { getArts } from "api/arts";
import defaultImg from "assets/images/error.png";
const { Option } = Select;
const { RangePicker } = DatePicker;
export default class ArtList extends Component {
  //初始化状态
  state = {
    channels: [],
    artInfo: {},
  };
  //获取用户频道
  getChannel = async () => {
    let res = await channel_id();
    this.setState({
      channels: res.data.channels,
    });
  };

  //获取频道信息
  getArtsInfo = async () => {
    let res = await getArts();
    console.log(res.data);
    this.setState({
      artInfo: res.data,
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
            <img src={defaultImg} alt="" style={{ width: 200, height: 120 , objectFit:"cover" }} />
          );
        }
        return (
          <img
            src={data.cover.images[0]}
            alt=""
            style={{ width: 200, height: 120,objectFit:"cover" }}
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
      dataIndex: "tags",
    },
  ];
  //提交
  finish = (value) => {
    console.log(value);
  };

  render() {
    let { channels } = this.state;
    let { results, total_count } = this.state.artInfo;
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
              <Select
                style={{
                  width: 200,
                }}
                placeholder="请选择文章频道"
              >
                {channels.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            {/* 下拉框 */}
            {/* 日期 */}
            <Form.Item label="日期" name="data">
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
          <Table dataSource={results} columns={this.columns} rowKey="id" />;
        </Card>
      </div>
    );
  }

  componentDidMount() {
    this.getChannel();
    this.getArtsInfo();
  }
}
