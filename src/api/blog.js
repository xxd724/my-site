import request from './request';

/**
 * 获取博客列表数据
 * @param {Number} [page]  当前页码
 * @param {Number} [limit]  页容量
 * @param {Number} [categoryid]  所属分类，-1表示全部
 * @param {String} keyword 模糊查询的关键字
 *  
 */
async function getBlogs(page=1,limit=10,categoryid=-1,keyword=""){
    return await request.get('/api/blog',{
        params:{
            page,
            limit,
            categoryid,
            keyword
        }
    });
}
/**
 * 
 * 获取博客分类
 */
async function getBlogTypes(){
    return await request.get('/api/blogtype');
}

/**
 * 获取单个文章
 * //文章id
 * @param {Number} Id //文章Id
 * 
 */
async function getBlog(Id){
    return await request.get(`/api/blog/${Id}`);
}
/**
 * 提交评论
 * @param {Object} commentInfo //对象
 * nickname 昵称
 * content 评论内容
 * blogId 文章Id
 */
async function postComment(commentInfo) { 
    return await request.post('/api/comment',commentInfo);
 }
 /**
 * 分页获取评论
 * @param {Number} [page]  当前页码
 * @param {Number} [limit]  页容量
 * @param {Number} blogId 所属文章，-1表示不限
 * @param {String} keyword 模糊查询的关键字
 *  
 */
async function getComments(blogId,page=1,limit=10,keyword='') {
   return await request.get('/api/comment',{
        params:{
            blogId,
            page,
            limit,
            keyword
        }
    })
  }
// module.exports.getBlogTypes=getBlogTypes;
export default{
    getBlogs,
    getBlogTypes,
    getBlog,
    postComment,
    getComments
}