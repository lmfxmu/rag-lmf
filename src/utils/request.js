import axios from 'axios'

export const request = axios.create({
	baseURL: '/api',  // 接口前缀
    timeout: 1000000
})

// request 拦截器
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    return config
}, error => {
    return Promise.reject(error)
});

request.interceptors.response.use(
    response => {
        let res = response.data;
        // 返回文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error) // 用于处理错误信息
        return Promise.reject(error)
    }
)

export default request
