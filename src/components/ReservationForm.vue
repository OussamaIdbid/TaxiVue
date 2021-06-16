<template>
  <section class="section is-medium" id="ReservationForm">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="card">
            <div class="card-content">
              <b-field label="Kies een datum">
                <b-datepicker
                  placeholder="klik om te selecteren"
                  :unselectable-dates="disabledDates"
                  :date-formatter="DateFormatter"
                  icon="calendar-today"
                  :locale="locale"
                  editable
                >
                </b-datepicker>
              </b-field>
              <b-field label="Kies een tijd">
                <b-timepicker
                  placeholder="klik om te selecteren"
                  icon="clock"
                  :time-formatter="TimeFormatter"
                  :enable-seconds="enableSeconds"
                  :unselectable-times="disabledTimes"
                  :hour-format="hourFormat"
                  :incrementMinutes="minutesGranularity"
                  locale="en-GB"
                >
                </b-timepicker>
              </b-field>
              <b-field v-bind:expanded="true" label="Telefoon Nummer">
                <b-input v-model="ReservationNumber" type="tel"></b-input>
              </b-field>

              <b-button @click="Payment" type="is-danger">Betaal</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
//import User from '../Api/User'
import Reservation from "../Api/Reservation";
import User from "../Api/User";
import { DecryptKey } from "../constants/keys";

export default {
  name: "ReservationForm",
  data() {
    return {
      map_urlS: sessionStorage.getItem("map_url"),
      startAddressS: sessionStorage.getItem("startAddress"),
      endAddressS: sessionStorage.getItem("endAddress"),
      distanceS: sessionStorage.getItem("distance"),
      traveltimeS: sessionStorage.getItem("traveltime"),
      farePrice: this.CryptoJS.AES.decrypt(
        sessionStorage.getItem("farePrice"),
        DecryptKey
      ).toString(this.CryptoJS.enc.Utf8),
      ReservationDate: null,
      Reservationtime: null,
      ReservationNumber: null,
      userID: null,
      hourFormat: "24",
      locale: "en-US", // Browser locale
      minutesGranularity: 5,
      disabledDates: [],
      disabledTimes: [],
    };
  },
  methods: {
    DateFormatter(date) {
      this.ReservationDate = date.toLocaleDateString("en-US");

      return date.toLocaleDateString("en-GB");
    },
    TimeFormatter(time) {
      this.Reservationtime = time;
      return time.toLocaleTimeString("en-GB");
    },
    Payment() {
      sessionStorage.setItem("pickup_date", this.ReservationDate);

      Reservation.Payment(this.farePrice.toString()).then((response) => {
        window.open(response.data, "_self");
      });
    },
  },
  mounted() {
    User.auth().then((response) => {
      this.userID = response.data.id;
    });

    Reservation.getAllReservations().then((response) => {
      for (const key in response.data) {
        console.log(key);
        console.log(response.data[key].pickup_date);
        this.disabledDates.push(new Date(response.data[key].pickup_date));
        this.disabledTimes.push(new Date());
      }
    });
  },
};
</script>

<style scoped>
.datepicker {
  display: block;
}
</style>
