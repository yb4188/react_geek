import React, { Component } from "react";
import { Select } from "antd";
import { channel_id } from "api/channels";
const { Option } = Select;
export default class index extends Component {
  state = {
    channels: [],
  };

  //获取用户频道
  getChannel = async () => {
    let res = await channel_id();
    this.setState({
      channels: res.data.channels,
    });
  };

  componentDidMount() {
    this.getChannel();
  }

  render() {
    let { channels } = this.state;
    return (
      <Select
        style={{
          width: 200,
        }}
        placeholder="请选择文章频道"
        value={this.props.value}
        onChange={this.props.onChange}
      >
        {channels.map((item) => {
          return (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          );
        })}
      </Select>
    );
  }
}
