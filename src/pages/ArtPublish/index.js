import React, { Component, createRef } from "react";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Space,
  Input,
  Radio,
  Upload,
  Modal,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Channel from "../../components/channel";
import styles from "./index.module.scss";
import { baseURL } from "utils/request";
import { sendArt, getArtById, updateArt } from "../../api/arts";

export default class ArtPublish extends Component {
  async componentDidMount() {
    if (this.state.id) {
      let res = await getArtById(this.state.id);
      const imgList = res.data.cover.images.map((item) => {
        return {
          url: item,
        };
      });
      const values = {
        ...res.data,
        type: res.data.cover.type,
      };
      this.artForm.current.setFieldsValue(values);
      console.log(res);
      this.setState({
        imgList,
      });
    }
  }
  state = {
    type: 1,
    imgList: [{ url: "" }],
    showPreview: false,
    previewImg: "",
    id: this.props.match.params.id,
  };
  artForm = createRef();
  //图片预览
  handlePreview = (file) => {
    const imgUrl = file.url || file.response.data.url;
    this.setState({
      showPreview: true,
      previewImg: imgUrl,
    });
  };
  //改变单选
  changeRadio = (e) => {
    this.setState({
      type: e.target.value,
      imgList: [],
    });
  };
  //上传图片
  uploadImg = (value) => {
    this.setState({
      imgList: value.fileList,
    });
  };
  //关闭弹窗
  onCancel = () => {
    this.setState({
      showPreview: false,
    });
  };
  //处理上传文件
  handleUpload = (file) => {
    if (file.size >= 1024 * 500) {
      message.warn(`上传图片不能大于500kb`);
      return Upload.LIST_IGNORE;
    }

    if (!["image/png", "image/jpeg"].includes(file.type)) {
      message.warn(`上传图片格式只能为jpg,jpeg`);
      return Upload.LIST_IGNORE;
    }
    return true;
  };
  save = () => {};
  //存入草稿
  handleDraft = async () => {
    let data = await this.artForm.current.validateFields();
    let { imgList, type } = this.state;
    if (imgList.length !== type) {
      return message.warn(`上传的图片数量不正确`);
    }
    const images = imgList.map((item) => {
      return item.url || item.response.data.url;
    });
    let res = await sendArt({
      ...data,
      cover: {
        type,
        images,
      },
      draft: true,
    });
    if (res.message === "OK") {
      message.success("文章发表成功");
      this.props.history.push(`/home/artlist`);
    } else {
      message.warn(`文章发表失败,请稍后重试`);
    }
  };
  //提交
  onFinish = async (data) => {
    if (this.state.id) {
      console.log(111);
      let { imgList, type } = this.state;
      if (imgList.length !== type) {
        return message.warn(`上传的图片数量不正确`);
      }
      const images = imgList.map((item) => {
        return item.url || item.response.data.url;
      });
      let res = await updateArt({
        ...data,
        cover: {
          type,
          images,
        },
        id: this.state.id,
      });
      if (res.message === "OK") {
        message.success("文章发表成功");
        this.props.history.push(`/home/artlist`);
      } else {
        message.warn(`文章发表失败,请稍后重试`);
      }
    } else {
      let { imgList, type } = this.state;
      if (imgList.length !== type) {
        return message.warn(`上传的图片数量不正确`);
      }
      const images = imgList.map((item) => {
        return item.url || item.response.data.url;
      });
      let res = await sendArt({
        ...data,
        cover: {
          type,
          images,
        },
      });
      if (res.message === "OK") {
        message.success("文章发表成功");
        this.props.history.push(`/home/artlist`);
      } else {
        message.warn(`文章发表失败,请稍后重试`);
      }
    }
  };

  render() {
    console.log(this.props);
    return (
      <div className={styles.pubContainer}>
        <Card
          title={
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/home">首页</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                {this.props.match.params.id ? "修改文章" : "发布文章"}
              </Breadcrumb.Item>
            </Breadcrumb>
          }
        >
          {/* 表单 */}
          <Form
            ref={this.artForm}
            labelCol={{ span: 4 }}
            validateTrigger={["onChange", "onBlur"]}
            onFinish={this.onFinish}
            initialValues={{ type: this.state.type }}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: "请输入文章标题",
                },
              ]}
            >
              <Input
                style={{ width: 400 }}
                placeholder="请输入文章的标题"
              ></Input>
            </Form.Item>
            <Form.Item
              label="频道"
              name="channel_id"
              rules={[
                {
                  required: true,
                  message: "请选择文章标题",
                },
              ]}
            >
              <Channel></Channel>
            </Form.Item>
            <Form.Item label="封面" name="type">
              <Radio.Group onChange={this.changeRadio}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              {this.state.type !== 0 && (
                <Upload
                  fileList={this.state.imgList}
                  name="image"
                  listType="picture-card"
                  action={`${baseURL}upload`}
                  onChange={this.uploadImg}
                  onPreview={this.handlePreview}
                  beforeUpload={this.handleUpload}
                >
                  {this.state.imgList.length < this.state.type && (
                    <PlusOutlined />
                  )}
                </Upload>
              )}
              {/* 弹窗 */}
              <Modal
                footer={null}
                title={`图片预览`}
                visible={this.state.showPreview}
                onCancel={this.onCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={this.state.previewImg}
                />
              </Modal>
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: "请输入文章内容" }]}
            >
              <ReactQuill placeholder="请输入文章内容"></ReactQuill>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button type="primary" htmlType="submit" size="large">
                  {this.props.match.params.id ? "修改文章" : "发布文章"}
                </Button>
                <Button size="large" onClick={this.handleDraft}>
                  存入草稿
                </Button>
              </Space>
            </Form.Item>
          </Form>
          {/* 表单 */}
        </Card>
      </div>
    );
  }
}
