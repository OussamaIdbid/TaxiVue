<template>
  <b-steps
    size="is-medium"
    type="is-danger"
    v-model="activeStep"
    :animated="isAnimated"
    :rounded="isRounded"
    :has-navigation="hasNavigation"
  >
    <b-step-item label="Account" icon="account-key"> 
        <StepOverview />
    </b-step-item>
    <b-step-item label="Profile" icon="account"></b-step-item>
    <b-step-item label="Social" icon="account-plus"></b-step-item>
  </b-steps>
</template>

<script>
import StepOverview from "./../reservation/StepOverview.vue";

export default {
  components: {
    StepOverview,
  },
  data() {
    return {
      activeStep: 0,
      isAnimated: false,
      isRounded: true,
      hasNavigation: false,
    };
  },
};
</script>

<style></style>
