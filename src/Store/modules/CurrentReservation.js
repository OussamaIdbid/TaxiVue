const state = {
    reservation: [],
    userDetails: {
        date: '',
        time: '',
        phonenumber: '',
    },
    currentStep: 0
}

const getters = {
    reservation(state) {
        return state
    },
    currentStep(state) {
        return state.currentStep
    }
}
const actions = {
    pushReservation({
        commit
    }, reservation) {
        commit('setReservation', reservation)
    },

    pushUserDetails({
        commit
    }, userDetails) {
        commit('setUserDetails', userDetails)
    },

    progressStep({
        commit
    }) {
        commit('incrementStep')
    }
}
const mutations = {
    setReservation: (state, reservation) => (state.reservation = reservation),

    setUserDetails: (state, userDetails) => (state.userDetails = userDetails),

    incrementStep: (state) => (state.currentStep++)
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}