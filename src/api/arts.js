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

//删除文章
export const delAtr = (id) =>
  request({
    url: `mp/articles/${id}`,
    method: "DELETE",
  });

//发表文章
export const sendArt = (data, draft = false) =>
  request({
    url: `mp/articles?draft=${draft}`,
    method: "POST",
    data,
  });

//获取文章指定文章
export const getArtById = (id) =>
  request({
    url: `mp/articles/${id}`,
    method: "GET",
  });

//修改文章
export const updateArt = (data, draft = false) =>
  request({
    url: `mp/articles/${data.id}?draft=${draft}`,
    method: "PUT",
    data,
  });
