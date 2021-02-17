<template>
  <div class="column is-one-third is-centered">
    <p>{{ date }}</p>
    <div class="card" id="order-route-card">
      <div class="card-content">
        <div class="content">
          <div class="columns">
            <div class="column is-1">
             <!-- div class="columns" style="flex-direction: column">
                <div class="column">
                  <span class="material-icons"> fiber_manual_record </span>
                </div>
                <div class="column">
                  <div class="vertical_dotted_line"></div>
                </div>
                <div class="column">
                  <span class="material-icons"> location_on </span>
                </div>
              </div>-->
            </div>
            <div class="column">
              <div class="columns" style="flex-direction: column">
                <div class="column">
                  <p class="label">Vertrekpunt</p>
                  <p class="info">{{ startAddress }}</p>
                </div>
                <div class="column">
                  <p class="label">Eindbestemming</p>
                  <p class="info">{{ endAddress }}</p>
                </div>
                <span
                  type="button"
                  class="tag is-success"
                  @click="isComponentModalActive = true"
                >
                  Bekijk
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      v-model="isComponentModalActive"
      trap-focus
      full-screen
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-modal
    >
      <template>
        <reservations-info v-bind:OrderID="OrderID"></reservations-info>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Reservation from "../../Api/Reservation.js";
import ReservationsInfo from "../payment/OrderSummary";
export default {
  props: {
    OrderID: Number,
  },
  data() {
    return {
      reservationData: null,
      startAddress: "",
      endAddress: "",
      date: "",
      isComponentModalActive: false,
    };
  },
  mounted() {
    Reservation.getReservation(this.OrderID).then((response) => {
      console.log("hello");
      this.reservationData = response.data;
      this.startAddress = response.data.start_address;
      this.endAddress = response.data.end_address;
      this.date = new Date(
        response.data.pickup_date
      ).toLocaleDateString("en-GB");
      console.log(this.reservationData);
    });
  },
  components: {
    ReservationsInfo,
  },
};
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
.material-icons {
  color: #f14668 !important;
}
.info {
  width: 100%;
  /*text-align: end;*/
  font-weight: bold;
}
.label {
  font-size: small;
  margin-bottom: 0;
  align-self: center;
  margin: 0;
  color: grey;
}
.vertical_dotted_line {
  border-left: 1px dotted black;
  height: 100px;
}
</style>