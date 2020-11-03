import { GET, Headers, Config } from "../utils";

class LoginApi {
  
  @GET({
    url: 'https://cnodejs.org/api/v1/topics',
    params: {
        limit: 10
    }
  })
  @Config({timeout: 2000})
  @Headers({'User-Agent': 'request'})
  login(a) {

  }

  @GET('https://cnodejs.org/api/v1/topics')
  logout() {

  }
}

export default new LoginApi();