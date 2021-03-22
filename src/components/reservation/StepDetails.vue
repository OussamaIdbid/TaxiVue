<template>
  <div class="container">
    <div class="box">
      <b-field label="Datum" label-position="on-border">
        <b-datepicker
          v-model="selectedDate"
          :locale="locale"
          placeholder="Selecteer een datum..."
          icon="calendar-today"
        >
        </b-datepicker>
      </b-field>
      <b-field label="Tijd" label-position="on-border">
        <b-timepicker
          v-model="selectedTime"
          placeholder="Selecteer een tijd..."
          icon="clock"
          :enable-seconds="enableSeconds"
          :hour-format="hourFormat"
          :locale="locale"
        >
        </b-timepicker>
      </b-field>

      <b-field label="Telefoonnummer" label-position="on-border">
        <b-input
          v-model="phoneNumber"
          placeholder="Vul je telefoonnummer in"
          icon="phone"
        >
        </b-input>
      </b-field>
    </div>
          <div id="step-overview-next">
        <button
          :disabled="!inputIsDisabled"
          id="next-step"
          class="button is-danger has-text-centered"
          @click="nextStep()"
        >
          Volgende Stap
        </button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: null,
      selectedTime: null,
      locale: "en-GB",
      hourFormat: undefined,
      enableSeconds: false,
    };
  },
};
</script>

<style scoped>
.datepicker {
  display: block;
}
</style>