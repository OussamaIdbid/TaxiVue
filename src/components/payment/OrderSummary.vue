<template>
  <section class="section is-family-primary" id="section-results">
    <div v-if="!isLoading" class="container">
      <div class="columns is-centered" id="column-container">
        <div class="column is-half is-centered">
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
    </div>
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
  </section>
</template>

<script>
import Reservation from "../../Api/Reservation";
export default {
  props: {
    OrderID: Number,
  },
  data() {
    return {
      map_urlS: "",
      startAddressS: "",
      endAddressS: "",
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
      Reservation.RefundPayment(this.paymentID,this.farePriceS)
      .then( (response) => {
        console.log(response);
      });
    }
  }
};
</script>

<style scoped>
#column-container {
  flex-direction: row;
}
#results-tile {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
}
#km-text,
#min-text,
.text {
  font-size: small;
  margin-bottom: 0;
  align-self: center;
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
.amount {
  width: 100%;
  text-align: end;
  font-weight: bold;
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
.footer {
}

#map {
  width: 500px;
  height: 500px;
}
</style>
