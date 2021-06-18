<template>
  <div class="container" v-if="!isLoading" style="position: relative">
    <div class="box">
      <div class="column-info">
        <span class="material-icons"> tag </span>
        <div v-if="!isLoading" class="info-end-wrapper">
          <p class="label">Reserveringsnummer</p>
          <p class="info-end">#{{ orderNumber }}</p>
        </div>
      </div>
      <div class="is-divider" data-content=""></div>

      <div class="column-info">
        <span class="material-icons"> fiber_manual_record </span>
        <div v-if="!isLoading" class="info-start-wrapper">
          <p class="label">Vertrekpunt</p>
          <p class="info-start">{{ startAddress }}</p>
        </div>
      </div>
      <div class="column-info">
        <span class="material-icons"> location_on </span>
        <div v-if="!isLoading" class="info-end-wrapper">
          <p class="label">Eindbestemming</p>
          <p class="info-end">{{ endAddress }}</p>
        </div>
      </div>
      <div class="is-divider" data-content=""></div>
      <div class="column-info">
        <span class="material-icons"> insert_invitation </span>
        <div v-if="!isLoading" class="info-end-wrapper">
          <p class="label">Datum</p>
          <p class="info-end">{{ ReservationDate }}</p>
        </div>
      </div>
      <div class="column-info">
        <span class="material-icons"> moving </span>
        <div v-if="!isLoading" class="info-end-wrapper">
          <p class="label">Afstand</p>
          <p class="info-end">{{ distance }}</p>
        </div>
      </div>
      <div class="column-info">
        <span class="material-icons"> schedule </span>
        <div v-if="!isLoading" class="info-end-wrapper">
          <p class="label">Reistijd</p>
          <p class="info-end">{{ travelTime }}</p>
        </div>
      </div>
      <div class="is-divider" data-content=""></div>

      <div class="column-info">
        <span class="material-icons"> payments </span>
        <div v-if="!isLoading" class="info-end-wrapper">
          <p class="label">Betaalmethode</p>
          <p class="info-end">{{ paymentMethod }}</p>
        </div>
      </div>
      <div class="column-info">
        <span class="material-icons"> euro </span>
        <div v-if="!isLoading" class="info-end-wrapper">
          <p class="label">Prijs</p>
          <p class="info-end">€{{ farePrice }}</p>
        </div>
      </div>
    </div>
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
  </div>
</template>

<script>
import Reservation from "../../Api/Reservation";
import moment from "moment";

export default {
  props: {
    OrderID: Number,
  },
  components: {},
  data() {
    return {
      startAddress: "",
      endAddress: "",
      distance: 0,
      travelTime: 0,
      ReservationDate: "",
      farePrice: 0,
      paymentID: "",
      paymentMethod: "",
      isLoading: true,
      data: null,
      orderNumber: "",
    };
  },
  mounted() {
    Reservation.getReservation(this.OrderID).then((response) => {
      const filteredStartAddress = response.data.start_address.replace(
        ", Nederland",
        ""
      );
      const filteredEndAddress = response.data.end_address.replace(
        ", Nederland",
        ""
      );
      console.log(response.data);
      this.data = response.data;
      this.startAddress = filteredStartAddress;
      this.endAddress = filteredEndAddress;
      this.distance = response.data.distance;
      this.travelTime = response.data.travel_time;
      this.ReservationDate = moment(response.data.pickup_date).format(
        "D MMMM YYYY"
      );
      this.farePrice = response.data.fare_price;
      this.paymentID = response.data.payment_id;
      this.startAddressGeo = response.data.start_address_geo;
      this.endAddressGeo = response.data.end_address_geo;
      this.orderNumber = response.data.order_id;

      Reservation.getWebhook({ id: response.data.payment_id }).then(
        (response) => {
          console.log(response);
          this.paymentMethod = response.data.method;
          this.isLoading = false;
        }
      );
    });
  },
  methods: {
    refundPayment() {
      Reservation.RefundPayment(this.paymentID, this.farePriceS).then(
        (response) => {
          console.log(response);
        }
      );
    },
    updateTest() {
      this.data.refundIsAsked = 1;
      Reservation.updateReservation(this.OrderID, this.data).then(
        (response) => {
          console.log(response);
        }
      );
    },
  },
};
</script>

<style scoped>
.column-info {
  display: flex;
  margin-bottom: 1rem;
}
.column {
  pointer-events: all;
}
.container {
  width: max-content;
}
.box {
  padding: 3rem;
}
.label {
  font-size: large;
  margin-bottom: 0;
}
.header {
  font-size: smaller;
}
.material-icons {
  color: #f14668 !important;
  margin-right: 1rem;
}
</style>
