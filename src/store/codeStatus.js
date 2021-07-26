// 再次获取验证码计时器
export default {
  namespaced:true,
    state: {
        time: 60,
        loading: false,
    },
    mutations: {
        setTiem(state, number) {
            state.time = number;
        },
        setLoading(state) {
            state.loading = !state.loading;
        },
    },
    actions: {
        changeCode({ state, commit }) {
            if (!state.loading) {
              commit("setLoading", true);
              clearInterval(codeTime);
              const codeTime = setInterval(() => {
                if (!state.time == 0) {
                  commit("setTiem", state.time - 1);
                } else {
                  commit("setTiem", 60);
                  commit("setLoading", false);
                  clearInterval(codeTime);
                };
              }, 1000)
            };
          },
    },
    getters: {

    },

}