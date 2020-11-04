/**
 * 响应体
 * @class ResponseBody
 */
class ResponseBody {
  status: number;
  msg: string;
  data: any;
  constructor(status: number, msg: string, data: any) {
    this.status = status;
    this.msg = msg;
    this.data = data;
  }
}

export default ResponseBody;