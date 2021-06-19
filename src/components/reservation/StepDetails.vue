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
import moment from 'moment'
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
    this.phoneNumber = this.reservation.userDetails.phonenumber;

    if(this.reservation.userDetails.time !== null) {
        this.selectedTime = new Date(this.reservation.userDetails.time);
    }
    else {
      this.selectedTime = null
    }
    if(this.reservation.userDetails.date !== null) {
        this.selectedDate = new Date(this.reservation.userDetails.date);
    }
    else {
      this.selectedDate = null
    }

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
        this.selectedDate === null ||
        this.selectedTimee === null ||
        phoneRegexp.test(this.phoneNumber) === false ||
        this.phoneNumber == ""
      ) {
        this.disableNextButton();
      } else if (
        this.selectedDate !== null &&
        this.selectedTime !== null &&
        phoneRegexp.test(this.phoneNumber)
      ) {
        this.enableNextButton();
      }
    },
  },
  watch: {
    selectedDate: function (val) {
      console.log(moment(val).format('DD-MM-YYYY'))
      this.pushUserDetails({ ...this.userDetails, date: val });
      this.checkForm();
    },
    selectedTime: function (val) {
      console.log(moment(val).format('HH:mm:ss'))
      this.pushUserDetails({ ...this.userDetails, time: val });
      this.checkForm();
    },
    phoneNumber: function (val) {
      this.pushUserDetails({ ...this.userDetails, phonenumber: val });

      this.checkForm();
    },
  },
  computed: {
    ...mapGetters("CurrentReservation", ["reservation","userDetails"]),
    ...mapGetters(["authenticated"]),
  },
};
</script>

<style scoped>
.datepicker {
  display: block;
}
</style>