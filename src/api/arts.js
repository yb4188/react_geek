/**
 * 文章api
 */
import request from "utils/request";
export const getArts = (params) =>
  request({
    url: "mp/articles",
    method: "GET",
    params,
  });
