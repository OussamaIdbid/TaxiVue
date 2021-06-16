const state = {
    reservation: [],
    userDetails: {
        date: null,
        time: null,
        phonenumber: '',
    },
    nextIsDisabled: false,
    previousIsVisible: false,
    nextIsVisible: true,
    currentStep: 0
}

const getters = {
    reservation(state) {
        return state
    },
    currentStep(state) {
        return state.currentStep
    },
    userDetails(state) {
        return state.userDetails
    },
    nextIsDisabled(state) {
        return state.nextIsDisabled
    },
    previousIsVisible(state) {
        return state.previousIsVisible

    },
    nextIsVisible(state) {
        return state.nextIsVisible

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
    },
    decreaseStep({
        commit
    }) {
        commit('decrementStep')
    },

    enableNextButton({
        commit
    }) {
        commit('enableButton')
    },
    disableNextButton({
        commit
    }) {
        commit('disableButton')
    },
    changePreviousVisibility({
        commit
    }) {
        commit('changePreviousVisibility')
    },
    changeNextVisibility({
        commit
    }) {
        commit('changeNextVisibility')
    },
    
}
const mutations = {
    setReservation: (state, reservation) => (state.reservation = reservation),
    setUserDetails: (state, userDetails) => (state.userDetails = userDetails),

    incrementStep: (state) => (state.currentStep++),
    decrementStep: (state) => (state.currentStep--),

    enableButton: (state) => (state.nextIsDisabled = false),
    disableButton: (state) => (state.nextIsDisabled = true),

    changePreviousVisibility: (state) => ( state.currentStep === 0 ? state.previousIsVisible = false : state.previousIsVisible = true),
    changeNextVisibility: (state) => (state.currentStep === 2 ? state.nextIsVisible = false : state.nextIsVisible = true),



    
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}