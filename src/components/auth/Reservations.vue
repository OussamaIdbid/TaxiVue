<template>
  <div>
    <div class="columns is-centered is-flex-direction-column">
      <reservation-card
        v-for="item in this.data"
        :key="item.id"
        v-bind:OrderID="item.id"
      ></reservation-card>
    </div>

    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
  </div>
</template>

<script>
import ReservationCard from "./ReservationCard";
import Reservations from "../../Api/Reservation.js";
import User from "../../Api/User.js";
export default {
  name: "Reservations",
  components: {
    ReservationCard,
  },
  data() {
    return {
      data: null,
      isLoading: true,
    };
  },
  mounted() {
    User.auth().then((response) => {
      if (response.data.user_type == 2) {
        Reservations.getAllReservations().then((response) => {
          this.data = response.data;
          this.isLoading = false;
        });
      } else {
        Reservations.getReservations().then((response) => {
          console.log(response);
          this.data = response.data;
          this.isLoading = false;
        });
      }
    });
  },
};
</script>

<style scoped>
.columns {
    flex-direction: column;
    align-items: center;
}
</style>