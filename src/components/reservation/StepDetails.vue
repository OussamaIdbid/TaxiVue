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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedDate: null,
      selectedTime: null,
      phoneNumber: "",
      locale: "en-GB",
      hourFormat: undefined,
      enableSeconds: false,
      inputIsDisabled: true,
    };
  },
  mounted() {
    
    this.checkForm();
  },
  methods: {
    ...mapActions("CurrentReservation", [
      "pushReservation",
      "progressStep",
      "pushUserDetails",
      "enableNextButton",
      "disableNextButton",
    ]),
    checkForm() {
      const phoneRegexp = /^((\+|00)?31|0(?!0))(\d{9})$/;

      if (
        this.userDetails.date === null ||
        this.userDetails.time === null ||
        phoneRegexp.test(this.userDetails.phonenumber) === false ||
        this.userDetails.phonenumber == ""
      ) {

        this.disableNextButton();
      }

      if (
        this.userDetails.date !== null &&
        this.userDetails.time !== null &&
        phoneRegexp.test(this.userDetails.phonenumber)
      ) {
        console.log('enable');
        this.enableNextButton();
      }
    },
  },
  watch: {
    selectedDate: function (val) {
      this.pushUserDetails({ ...this.userDetails, date: val });
      this.checkForm();
    },
    selectedTime: function (val) {
      this.pushUserDetails({ ...this.userDetails, time: val });
      this.checkForm();
    },
    phoneNumber: function (val) {
      const phoneRegexp = /^((\+|00)?31|0(?!0))(\d{9})$/;

      if (phoneRegexp.test(val)) {
        this.pushUserDetails({ ...this.userDetails, phonenumber: val });
      }

      this.checkForm();
    },
  },
  computed: {
    ...mapGetters("CurrentReservation", ["userDetails"]),
    ...mapGetters(["authenticated"]),
  },
};
</script>

<style scoped>
.datepicker {
  display: block;
}
</style>