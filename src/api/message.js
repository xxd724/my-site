import request from './request'
/**
 * 提交评论
 * @param {Object} messageInfo //对象
 * nickname 昵称
 * content 评论内容
 * blogId 文章Id
 */
export async function postMessage(messageInfo) {
  return await request.post("/api/message", messageInfo);
}
/**
 * 分页获取评论
 * @param {Number} [page]  当前页码
 * @param {Number} [limit]  页容量
 * @param {String} keyword 模糊查询的关键字
 *  
 */
export async function getMessages( page = 1, limit = 10, keyword = '') {
  return await request.get('/api/message', {
    params: {
      page,
      limit,
      keyword
    }
  });
}