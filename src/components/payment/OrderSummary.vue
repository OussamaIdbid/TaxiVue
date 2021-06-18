<template>
  <div class='container' v-if="!isLoading" style="position: relative">
    <!-- <section class="section is-family-primary" id="section-results"> -->
    <div class="box">
      
    </div>


      <!-- <div class="columns is-centered" id="column-container">
      <div class="column is-half is-centered">
              <HereMap
        :center="center"
        :startLocation="this.startAddressGeo"
        :endLocation="this.endAddressGeo"
        :startAddress="this.startAddressS"
        :endAddress="this.endAddressS"
      />
          <img id="map-img" :src="map_urlS" />
        </div>
        <div class="column is-one-third is-centered">
          <div
            id="results-tile"
            class="tile is-parent has-background-white rounded-container"
          >
            <div class="content">
              <p class="title is-size-6">Overzicht</p>

              <div class="content">
                <div id="route-wrapper">
                  <div id="start-address-container">
                    <p id="start-address-text">Van:</p>
                    <p id="start-address">{{ startAddressS }}</p>
                  </div>
                  <div id="end-address-container">
                    <p id="end-address-text">Naar:</p>
                    <p id="end-address">{{ endAddressS }}</p>
                  </div>
                </div>
                <div id="details-wrapper">
                  <div id="km-container">
                    <p class="text">Afstand:</p>
                    <p class="amount">{{ distanceS }}km</p>
                  </div>
                  <div id="min-container">
                    <p class="text">Reistijd:</p>
                    <p class="amount">{{ traveltimeS }}</p>
                  </div>
                </div>
                <div class="details-container">
                  <p class="text">Datum:</p>
                  <p class="amount">{{ ReservationDate }}</p>
                </div>
                <div class="details-container">
                  <p class="text">Ritprijs:</p>
                  <p class="amount">€{{ farePriceS }}</p>
                </div>
                <div class="details-container">
                  <p class="text">Betaalmethode:</p>
                  <p class="amount">{{ paymentMethod }}</p>
                </div>

                <button @click="refundPayment()">Refund</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
  
  <!-- </section> -->
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
      traveltime: 0,
      ReservationDate: "",
      farePrice: 0,
      paymentID: "",
      paymentMethod: "",
      isLoading: true,
      data: null,
    };
  },
  mounted() {
    Reservation.getReservation(this.OrderID).then((response) => {
      console.log(response.data);
      this.data = response.data;
      this.startAddress = response.data.start_address;
      this.endAddress = response.data.end_address;
      this.distance = response.data.distance;
      this.traveltime = response.data.travel_time;
      this.ReservationDate = moment(response.data.pickup_date).format(
        "D MMMM YYYY"
      );
      this.farePrice = response.data.fare_price;
      this.paymentID = response.data.payment_id;
      this.startAddressGeo = response.data.start_address_geo;
      this.endAddressGeo = response.data.end_address_geo;

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
#column-container {
  flex-direction: row;
}
#order-info {
  position: absolute;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: none;
  z-index: 3;
}
.column {
  pointer-events: all;
}
#results-tile {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
}
#km-text,
#min-text,
.text,
.label {
  font-size: small;
  margin-bottom: 0;
  align-self: center;
  margin: 0;
  color: grey;
}
#start-address,
#end-address {
  font-size: small;
}
#start-address-text,
#end-address-text {
  font-size: small;
  margin-bottom: 0;
  color: grey;
}

#min-amount,
#km-amount,
#fare-amount,
.amount,
.info {
  width: 100%;
  /*text-align: end;*/
  font-weight: bold;
  font-size: small;
}
#details-wrapper > div {
  display: flex;
}
#details-wrapper,
#route-wrapper {
  margin-bottom: 1rem;
}
#details-wrapper {
  margin-bottom: 0.3rem;
  border-bottom-style: groove;
  border-bottom-width: 1px;
}
.details-container {
  display: flex;
}
.rounded-container {
  border-radius: 20px;
}
.material-icons {
  color: #f14668 !important;
}
#order-route {
  position: absolute;
  z-index: 3;
}
#order-route-card {
  margin-top: 1rem;
  margin-left: 1rem;
  border-radius: 1rem;
}
/**#map {
  width: 500px;
  height: 500px;
}*/
</style>
