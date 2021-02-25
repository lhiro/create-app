import curl from '../utils/request';



interface queryPostParams {
  page: number;
}
/**
 * 获取博主排行
 * @param page 展示页数
 */
export async function queryPost(params: queryPostParams) {
  return curl('/api/post', {
    data: params
  });
}

