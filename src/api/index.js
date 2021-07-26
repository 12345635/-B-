import axios from "./request"
// 查询类目列表信息
const getProductType = async (params) => await axios.get('/category/all', { params });
// 用户注册
const logon = async (options) => axios.post("/passport/logon", options);
// 用户登录
const login = async (options) => axios.post("/passport/login", options);
// 获取验证码
const getCode = async (options) => axios.post("/passport/getCode", options);
// 找回密码
const findBack = async (options) => axios.post("/passport/findBack", options);
// 获取产品列表
const getList = async (params) => axios.get("/products/all",{params});
// 上传图片接口
const upImages = async(parmas) => axios.post("/upload/images",parmas);
// 新增接口
const Add = async(parmas) => axios.post("/products/add",parmas);
// 删除接口
const remove = async(id) => axios.delete(`/products/${id}`);
// 商品详情
const product = async(id) => axios.get(`/products/${id}`);
// 修改商品
const Edit = async(parmas) => axios.put("/products/edit",parmas);
export default {
    getProductType,
    login,
    logon,
    getCode,
    findBack,
    getList,
    upImages,
    Add,
    remove,
    product,
    Edit,
}