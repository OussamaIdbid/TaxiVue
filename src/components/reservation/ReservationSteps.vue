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
      <StepDetails/>
    </b-step-item>
    <b-step-item label="Overzicht" step="3" :clickable="isClickable"></b-step-item>
  </b-steps>
</template>

<script>
import { mapGetters } from 'vuex';
import StepOverview from "./../reservation/StepOverview.vue";
import StepDetails from "./../reservation/StepDetails.vue";

export default {
  components: {
    StepOverview,
    StepDetails
  },
  computed: {
    ...mapGetters('CurrentReservation',['currentStep'])
  },
  data() {
    return {
      isAnimated: false,
      isRounded: true,
      hasNavigation: false,
      isClickable: false
    };
  },
  mounted() {
  }
};
</script>

<style></style>
