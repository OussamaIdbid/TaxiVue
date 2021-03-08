const state = {
    reservation: [],
}

const getters = { 
    reservation(state) {
        return state
    }
}
const actions = {
    pushReservation( { commit }, reservation) {
        commit('setReservation', reservation)
    }
}
const mutations = {
    setReservation: (state, reservation) => (state.reservation = reservation )
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}