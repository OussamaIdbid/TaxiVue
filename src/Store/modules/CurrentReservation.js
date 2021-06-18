const state = {
  reservation: [],
  userDetails: {
    date: null,
    time: null,
    phonenumber: "",
  },
  nextIsDisabled: false,
  previousIsVisible: false,
  nextIsVisible: true,
  currentStep: 0,
};

const getters = {
  reservation(state) {
    return state;
  },
  currentStep(state) {
    return state.currentStep;
  },
  userDetails(state) {
    return state.userDetails;
  },
  nextIsDisabled(state) {
    return state.nextIsDisabled;
  },
  previousIsVisible(state) {
    return state.previousIsVisible;
  },
  nextIsVisible(state) {
    return state.nextIsVisible;
  },
};

const actions = {
  pushReservation({ commit }, reservation) {
    commit("setReservation", reservation);
  },

  pushUserDetails({ commit }, userDetails) {
    commit("setUserDetails", userDetails);
  },

  resetOrder({ commit }) {
    commit("resetOrder");
  },

  progressStep({ commit }) {
    commit("incrementStep");
  },
  decreaseStep({ commit }) {
    commit("decrementStep");
  },
  checkStepStatus({ commit }) {
    commit("checkStepStatus");
  },
  enableNextButton({ commit }) {
    commit("enableButton");
  },
  disableNextButton({ commit }) {
    commit("disableButton");
  },
  changePreviousVisibility({ commit }) {
    commit("changePreviousVisibility");
  },
  changeNextVisibility({ commit }) {
    commit("changeNextVisibility");
  },
};
const mutations = {
  setReservation: (state, reservation) => (state.reservation = reservation),
  setUserDetails: (state, userDetails) => (state.userDetails = userDetails),
  resetOrder: (state) => {
    state.reservation = [];

    state.userDetails.date = null;
    state.userDetails.time = null;
    state.userDetails.phonenumber = "";

    state.nextIsDisabled = false;
    state.previousIsVisible = false;
    state.nextIsVisible = true;
    state.currentStep = 0;
  },
  incrementStep: (state) => {
    state.currentStep++;

    handleStep(state);
  },
  decrementStep: (state) => {
    state.currentStep--;

    handleStep(state);
  },
  checkStepStatus: (state) => {
    handleStep(state);
  },
  enableButton: (state) => (state.nextIsDisabled = false),
  disableButton: (state) => (state.nextIsDisabled = true),

  changePreviousVisibility: (state) =>
    state.currentStep === 0
      ? (state.previousIsVisible = false)
      : (state.previousIsVisible = true),
  changeNextVisibility: (state) =>
    state.currentStep === 2
      ? (state.nextIsVisible = false)
      : (state.nextIsVisible = true),
};

const handleStep = (state) => {
  console.log(state.currentStep);
  switch (state.currentStep) {
    case 0: {
      state.nextIsDisabled = false;
      state.previousIsVisible = false;
      state.nextIsVisible = true;
      break;
    }
    case 1: {
      const phoneRegexp = /^((\+|00)?31|0(?!0))(\d{9})$/;

      state.previousIsVisible = true;
      state.nextIsVisible = true;

      if (
        state.userDetails.date === null ||
        state.userDetails.time === null ||
        state.userDetails.phonenumber.length === 0 ||
        phoneRegexp.test(state.userDetails.phonenumber) === false
      ) {
        state.nextIsDisabled = true;
      } else {
        state.nextIsDisabled = false;
      }
      break;
    }
    case 2: {
      state.previousIsVisible = true;
      state.nextIsVisible = false;
      break;
    }
    default:
      break;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
