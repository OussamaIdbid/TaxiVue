<template>
  <b-steps
    size="is-medium"
    type="is-danger"
    v-model="currentStep"
    :animated="isAnimated"
    :rounded="isRounded"
    :has-navigation="hasNavigation"
    :clickable="isClickable"
  >
    <b-step-item label="Reis Overzicht" step="1" :clickable="isClickable">
      <StepOverview />
    </b-step-item>
    <b-step-item label="Reis Details" step="2" :clickable="isClickable">
      <StepDetails />
    </b-step-item>
    <b-step-item
      label="Overzicht"
      step="3"
      :clickable="isClickable"
    >
    <StepFinal />
    </b-step-item>
    <div id="step-overview-next">
      <button
        :disabled="previousIsDisabled"
        id="next-step"
        v-bind:style="{
          display: previousIsVisible === true ? 'block' : 'none',
        }"
        class="button is-danger has-text-centered"
        @click="previousStep()"
      >
        Vorige Stap
      </button>
      <button
        :disabled="nextIsDisabled"
        id="next-step"
        v-bind:style="{
          display: nextIsVisible === true ? 'block' : 'none',
        }"
        class="button is-danger has-text-centered"
        @click="nextStep()"
      >
        Volgende Stap
      </button>
    </div>
  </b-steps>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import StepOverview from "./../reservation/StepOverview.vue";
import StepDetails from "./../reservation/StepDetails.vue";
import StepFinal from "./../reservation/StepFinal.vue"

export default {
  components: {
    StepOverview,
    StepDetails,
    StepFinal
  },
  computed: {
    ...mapGetters("CurrentReservation", [
      "currentStep",
      "nextIsDisabled",
      "previousIsVisible",
      "nextIsVisible",
      "reservation"
    ]),
  },
  data() {
    return {
      isAnimated: false,
      isRounded: true,
      hasNavigation: false,
      isClickable: false,
    };
  },
  mounted() {
    this.checkStepStatus()
  },
  methods: {
    ...mapActions("CurrentReservation", ["progressStep", "decreaseStep", "checkStepStatus"]),
    nextStep() {
      this.progressStep();
    },
    previousStep() {
      this.decreaseStep();
    },
  },
};
</script>

<style>
#step-overview-next {
  display: flex;
  justify-content: space-between;
}
</style>
