import { GET } from "../genebox-mini-request";

class LoginApi {
  
  @GET('/static/article/queue_rules.html')
  // @Headers({'User-Agent1': 'request'})
// @GET('/v1/{0}', 'topics')
// @GET('https://cnodejs.org/api/v1/topics')
// @GET({url: '/v1/topics', params: {limit: 10}})
  login(res, err) {
    
  }

  // @POST('https://cnodejs.org/api/v1/topics')
  logout() {

  }

  // let topicApi = TopicApi.getInstance();
  // topicApi.getTopicDetails('topicId=5433d5e4e737cbe96dcef312', {
  //     limit: 20
  // });
  // 参数会按 {} 自动匹配
  // topicApi.getTopicDetails({
  //     topicId: '5433d5e4e737cbe96dcef312',
  //     limit: 20
  // });
}

export default new LoginApi();