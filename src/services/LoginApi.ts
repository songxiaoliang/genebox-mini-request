import { GET } from "../genebox-mini-request";

class LoginApi {
  
  // @GET('/static/article/queue_rules.html')
  // @Headers({'User-Agent1': 'request'})
  @GET('/v1/{0}/{1}', 'topics', 'aa')
// @GET('https://cnodejs.org/api/v1/topics')
// @GET({url: '/v1/topics', params: {limit: 10}})
  login(res, err) {
    
  }

  // @POST('https://cnodejs.org/api/v1/topics')
  logout() {

  }
}

export default new LoginApi();