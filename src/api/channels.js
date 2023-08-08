/**
 * 频道列表的api
 */
import request from "utils/request";
export const channel_id = () =>
  request({
    url: "channels",
    method: "GET",
  });
