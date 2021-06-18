<template>
  <div class="container">
    <div class="box">
      <b-field label="Eindbestemming" label-position="on-border">
        <b-input
          disabled
          v-model="reservation.reservation.StartObject.place_name"
          icon="circle"
        >
        </b-input>
      </b-field>
      <b-field label="Eindbestemming" label-position="on-border">
        <b-input
          disabled
          v-model="reservation.reservation.EndObject.place_name"
          icon="map-marker"
        >
        </b-input>
      </b-field>
    </div>
    <div class="box">
      <b-field label="Datum" label-position="on-border">
        <b-datepicker
          disabled
          v-model="date"
          :locale="locale"
          placeholder="Selecteer een datum..."
          icon="calendar-today"
        >
        </b-datepicker>
      </b-field>
      <b-field label="Tijd" label-position="on-border">
        <b-timepicker
          disabled
          v-model="time"
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
          disabled
          v-model="phoneNumber"
          placeholder="Vul je telefoonnummer in"
          icon="phone"
        >
        </b-input>
      </b-field>
    </div>

    <div>
    Total: €{{reservation.reservation.farePrice}}
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("CurrentReservation", ["reservation", "userDetails"]),
  },
  data() {
    return {
      isAnimated: false,
      isRounded: true,
      hasNavigation: false,
      isClickable: false,
      phoneNumber: "",
      time: null,
      date: null,
    };
  },
  mounted() {
    console.log(this.reservation.userDetails);

    this.phoneNumber = this.reservation.userDetails.phonenumber;
    this.time = new Date(this.reservation.userDetails.time);

    this.date = new Date(this.reservation.userDetails.date);
  },
  methods: {},
};
</script>

<style>
#step-overview-next {
  display: flex;
  justify-content: space-between;
}
</style>


<style scoped>
.datepicker {
  display: block;
}
</style>