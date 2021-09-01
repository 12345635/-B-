// 是否登陆
import cookie from "@/utils/cookie";
import { routes } from "@/router";
function getmeuns(name, meuns) {
    for (let i = 0; i < meuns.length; i++) {
        if (name == meuns[i].name) {
            return meuns[i].name;
        }
    }
}
export default {
    namespaced: true,
    state: {
        loading: false,
        cookie: {},
        coustomerMeuns: [
            {
                name: 'Statistics',
            },
            {
                name: 'goods',
            },
            {
                name: 'goodsList',
            },
            {
                name: 'goodsAdd',
            }, {
                name: 'goodsEdit',
            },
        ],
        adminMeuns: [
            {
                name: 'Statistics',
            },
            {
                name: 'goods',
            },
            {
                name: 'goodsList'
            },
            {
                name: 'goodsAdd',
            },
            {
                name: 'goodsCategory',
            },
            {
                name: 'goodsEdit',
            },
        ]
    },
    mutations: {
        setLoading(state, p) {
            state.loading = p;
        },
        setCookie(state, p) {
            state.cookie = p;
        }
    },
    actions: {
        async howMI({ commit }) {
            commit('setLoading', true);
            const resq = await cookie.get();
            if (resq) {
                commit('setCookie', resq);
                commit('setLoading');
                return true
            }
            else{
                return false
            }
        },
        async login({ commit }, p) {
            commit("setLoading", true);
            const resp = await cookie.set(p);
            commit("setCookie", p);
            commit("setLoading", false);
            return resp;
        },
        async unlogin({ commit }, p) {
            await cookie.remove();
            commit("setCookie", null);
            commit("setLoading", false);
            return true;
        },
    },
    getters: {
        status(state) {
            // 没有登录
            if (state.loading) {
                // 登录中
                return "loading"
            } else if (state.cookie.email) {
                return "login"
            } else {
                // 已经登录了
                return "logon"
            };
        },
        // 动态生成的导航
        meuns(state) {
            let meunArray = null;
            if (state.cookie.role === "coustomer") {
                meunArray = routes.filter((r) => {
                    if (r.children) {
                        r.children = r.children.filter((r) => {
                            return r.name == getmeuns(r.name, state.coustomerMeuns) && !r.hidden
                        })
                        return !r.hidden
                    } else {
                        return !r.hidden;
                    }
                })
                return meunArray;
            } else {
                meunArray = routes.filter((r) => {
                    if (r.children) {
                        r.children = r.children.filter((r) => {
                            return r.name == getmeuns(r.name, state.adminMeuns)
                        })
                        return !r.hidden
                    } else {
                        return !r.hidden;
                    }
                })
            }
        }
    }
}