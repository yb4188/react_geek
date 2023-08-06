/**
 * 此文件夹关于 user 的api接口
 */
import request from "utils/request";

export const userLogin = (data) => {
  return request({
    url: "authorizations",
    method: "POST",
    data,
  });
};
