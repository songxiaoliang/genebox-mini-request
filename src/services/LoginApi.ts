import { Mock } from "@/genebox-mini-request/request/RequestConfig";
import { GET } from "../..";

class LoginApi {
  
  // @GET('/static/article/queue_rules.html')
  // @Headers({'User-Agent1': 'request'})
  @GET('/v1/{0}/{1}', 'topics', 'aa')
// @GET('https://cnodejs.org/api/v1/topics')
// @GET({url: '/v1/topics', params: {limit: 10}})
  login(res, err) {
    
  }

  // @POST('https://cnodejs.org/api/v1/topics')
  @Mock
  logout() {

  }
}

export default new LoginApi();