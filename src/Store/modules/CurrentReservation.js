import { defaultState } from "./../defaultState/currentReservation";

const state = {
  reservation: [],
  userDetails: {
    date: null,
    time: null,
    phonenumber: "",
  },
  discountIsUsed: false,
  currentDiscount: "",
  isCalculated: false,
  nextIsDisabled: false,
  previousIsVisible: false,
  nextIsVisible: true,
  currentStep: 0,
  loading: false
};

const getters = {
  loading(state) {
    return state.loading
  },
  reservation(state) {
    return state;
  },
  currentStep(state) {
    return state.currentStep;
  },
  userDetails(state) {
    return state.userDetails;
  },
  isCalculated(state) {
    return state.isCalculated;
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
  discountIsUsed(state) {
    return state.discountIsUsed;
  },
  currentDiscount(state) {
    return state.currentDiscount;
  },
};

const actions = {
  setLoading({commit}, loading) {
    commit("setLoading", loading);
  },
  pushReservation({ commit }, reservation) {
    commit("setReservation", reservation);
  },

  pushUserDetails({ commit }, userDetails) {
    commit("setUserDetails", userDetails);
  },

  setCalculating({ commit }, boolean) {
    commit("setCalculating", boolean);
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
  resetState({ commit }) {
    commit("resetState");
  },
  setCurrentDiscount({ commit }, discount) {
    commit("setCurrentDiscount", discount);
  },
  setDiscountIsUsed({ commit }, discountIsUsed) {
    commit("setDiscountIsUsed", discountIsUsed);
  },
};
const mutations = {
  setLoading: (state, loading) => (state.loading = loading),
  setReservation: (state, reservation) => (state.reservation = reservation),
  setUserDetails: (state, userDetails) => (state.userDetails = userDetails),
  setCalculating: (state, boolean) => (state.isCalculated = boolean),

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
  resetState: (state) => {
    Object.assign(state, defaultState);
  },
  setCurrentDiscount: (state, currentDiscount) =>
    (state.currentDiscount = currentDiscount),
    setDiscountIsUsed: (state, discountIsUsed) =>
    (state.discountIsUsed = discountIsUsed),
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
