// 关于商品
import api from "@/api"
export default {
  namespaced: true,
  state: {
    // 商品类目列表
    productTypeList: [],
    // 商品具体信息
    form: {
      title: "",
      desc: "",
      category: null,
      c_items: "",
      tags: [],
      price: "",
      price_off: "",
      unit: null,
      inventory: "",
      status: null,
      images: [],
    },
    // 商品列表
    productList: [],
    // 添加中显示的步骤
    current: 0,
    // 添加或修改信息的步骤
    steps: [
      {
        title: '基本信息',
      },
      {
        title: '商品价格',
      },
    ],
  },
  mutations: {
    setProductTypeList(state, p) {
      state.productTypeList = p;
    },
    setProductList(state, p) {
      state.productList = p;
    },
    setForm(state, p) {
      let key = p.key;
      let value = p.value
      state.form[key] = value;
    },
    resetForm(state, p) {
      state.form = p;
    },
    setProduct(state, p) {
      state.form = p;
    },
    setCurrent(state, p) {
      state.current = p;
    }
  },
  actions: {
    async getProductTypeList({ commit }) {
      await api.getProductType().then((resq) => {
        commit("setProductTypeList", resq.data.data)
        return true
      }, (error) => {
        alert(error)
        return false;
      });
    },
    async getProductList({ commit }, params) {
      await api.getList(params).then((resq) => {
        commit("setProductList", resq.data.data)
        return true
      }, (error) => {
        alert(error)
        return false;
      });
    },
    setProduct({ commit }, p) {
      commit("setForm", p)
    },
    resetProduct({ commit }, p) {
      commit("resetForm", p)
    }
  },
}