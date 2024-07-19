import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";

class HYRequest {
  // 创建构造函数
  constructor(baseURL, timeout) {
    // 创建instance实例
    this.instance = axios.create({
      baseURL,
      timeout,
    });
    // 配置拦截器，对获取数据进行响应
    this.instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        return err;
      }
    );
  }

  // request请求
  request(config) {
    return this.instance.request(config);
  }

  // 配置get请求方法
  get(config) {
    return this.request({ ...config, method: "get" });
  }

  // 配置post请求方法
  post(config) {
    return this.request({ ...config, method: "post" });
  }
}

const hyRequest = new HYRequest(BASE_URL, TIMEOUT);

export default hyRequest;
