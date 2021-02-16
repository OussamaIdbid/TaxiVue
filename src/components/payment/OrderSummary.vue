<template>
  <div>
    <!--<section class="section is-family-primary" id="section-results">-->
    <div v-if="!isLoading" style="position: relative">
      <!--column structure for mobile. flex direction should be column
      pay attention to padding for connection order info and map-->
      <!--<div class="columns">-->
      <!--first column for map-->
      <!--<div class="column">-->

      <!--</div>-->
      <!--second column for order info-->
      <!--<div class="column">-->

      <!--</div>-->
      <!--</div>-->
      <!--<div class="columns is-centered" id="order-info">-->
      <div class="column is-2" id="order-route">
        <div class="card" id="order-route-card">
          <div class="card-content">
            <div class="content">
              <div class="columns">
                <div class="column is-1">
                  <div class="columns" style="flex-direction: column">
                    <div class="column">
                      <span class="material-icons"> fiber_manual_record </span>
                    </div>
                    <div class="column"></div>
                    <div class="column">
                      <span class="material-icons"> fiber_manual_record </span>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <div class="columns" style="flex-direction: column">
                    <div class="column">
                      <p class="label">Vertrekpunt</p>
                      <p class="info">{{ startAddressS }}</p>
                    </div>
                    <div class="column">
                      <p class="label">Eindbestemming</p>
                      <p class="info">{{ endAddressS }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--</div>-->

      <HereMap
        :center="center"
        :startLocation="this.startAddressGeo"
        :endLocation="this.endAddressGeo"
        :startAddress="this.startAddressS"
        :endAddress="this.endAddressS"
      />
      <div class="column is-3">
        <div class="card">
          <div class="card-content">
            <div class="content">
              Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at
              eros. Donec id elit non mi porta gravida at eget metus. Cum sociis
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Cras mattis consectetur purus sit amet fermentum.
            </div>
          </div>
        </div>
      </div>
      <!--<div class="columns is-centered" id="column-container">-->
      <!--<div class="column is-half is-centered">
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
        </div>-->
      <!--</div>-->
    </div>
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
  </div>
  <!--</section>-->
</template>

<script>
import Reservation from "../../Api/Reservation";
import HereMap from "../../components/HereAPI/HereMap";

export default {
  props: {
    OrderID: Number,
  },
  components: {
    HereMap,
  },
  data() {
    return {
      center: {
        lat: 52.516,
        lng: 13.3779,
      },
      map_urlS: "",
      startAddressS: "",
      endAddressS: "",
      startAddressGeo: "",
      endAddressGeo: "",
      distanceS: 0,
      traveltimeS: 0,
      ReservationDate: "",
      farePriceS: 0,
      paymentID: "",
      paymentMethod: "",
      isLoading: true,
    };
  },
  mounted() {
    Reservation.getReservation(this.OrderID).then((response) => {
      console.log(response.data);
      this.map_urlS = response.data.map_url;
      this.startAddressS = response.data.start_address;
      this.endAddressS = response.data.end_address;
      this.distanceS = response.data.distance;
      this.traveltimeS = response.data.travel_time;
      this.ReservationDate = new Date(
        response.data.pickup_date
      ).toLocaleDateString("en-GB");
      this.farePriceS = response.data.fare_price;
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
