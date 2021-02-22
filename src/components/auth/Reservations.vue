<template>
  <div>
    
      <b-tabs v-model="activeTab" position="is-centered" :animated="false" class="block">
        <b-tab-item label="Reserveringen">
          <reservation-card
            v-for="item in this.data"
            :key="item.id"
            v-bind:OrderID="item.id"
          ></reservation-card>
        </b-tab-item>
        <b-tab-item label="Geschiedenis">
          Geen reserveringen
        </b-tab-item>
      </b-tabs>
    
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
      activeTab:0
    };
  },
  mounted() {
    User.auth().then((response) => {
      if (response.data.user_type == 3) {
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
.tab-item {

  display: flex;
  flex-direction: column;
  align-items: center;

}
/*Mobile breakpoints*/
@media only screen and (max-width: 768px) {
    section {
      padding: 0 !important;
     
    }


}
</style>