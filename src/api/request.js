import axios from "axios"
const ins = axios.create({
    baseURL: "https://mallapi.duyiedu.com/",
});
ins.interceptors.request.use((config) => {
    if (!config.url.includes("passport")) {
        config.params = {
            ...config.params,
            appkey: "wangwenming_1624265707110",
        };
    };
    return config;
}, (error) => Promise.reject(error));

ins.interceptors.response.use((response) => {
    if (response.status !== 200) {
        return response.statusText;
    }
    if (response.data.status !== 'success') {
        return Promise.reject(response.data.msg);
    }
    return response.data;

}, (error) => {
    return Promise.reject(error);
})
export default ins;