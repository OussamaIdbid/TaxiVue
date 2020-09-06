// import { isLoggedIn } from "./utils";
export default {
    namespaced: true, 
    state: {
        isLoggedIn: false,
        user: {}
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setLoggedIn(state, payload) {
            state.isLoggedIn = payload;
        }
    },
    actions: {
        // async loadUser({ commit, dispatch }) {
        //     if (isLoggedIn) {
        //         try {
        //             const user = (await axios.get("/user")).data;
        //             commit("setUser", user);
        //             commit("setLoggedIn", true);
        //         } catch (error) {
        //             console.log(error)
        //         }
        //     }
        // }
    }
};

// export default {

//     state,
//     getters,
//     actions,
//     mutations
// }