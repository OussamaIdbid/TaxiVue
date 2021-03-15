<template>
  <div>
    <section
      v-if="!isLoading && IsPaid"
      class="section is-family-primary"
      id="section-results"
    >
      <div class="container">
        <div class="columns is-centered" id="column-container">
          <div class="column is-half is-centered">
            <img id="map-img" :src="map_url" />
          </div>
          <div class="column is-one-third is-centered">
            <div
              id="results-tile"
              class="tile is-parent has-background-white rounded-container"
            >
              <div class="content">
                <p class="title is-size-6">Afspraak bevestiging</p>

                <div class="content">
                  <div id="route-wrapper">
                    <div id="start-address-container">
                      <p id="start-address-text">Van:</p>
                      <p id="start-address">{{ startAddress }}</p>
                    </div>
                    <div id="end-address-container">
                      <p id="end-address-text">Naar:</p>
                      <p id="end-address">{{ endAddress }}</p>
                    </div>
                  </div>
                  <div id="details-wrapper">
                    <div id="km-container">
                      <p class="text">Afstand:</p>
                      <p class="amount">{{ distance }}km</p>
                    </div>
                    <div id="min-container">
                      <p class="text">Reistijd:</p>
                      <p class="amount">{{ travelTime }}</p>
                    </div>
                  </div>
                  <div class="details-container">
                    <p class="text">Datum:</p>
                    <p class="amount">{{ ReservationDate }}</p>
                  </div>
                  <div class="details-container">
                    <p class="text">Ritprijs:</p>
                    <p class="amount">€{{ farePrice }}</p>
                  </div>
                  <div class="details-container">
                    <p class="text">Betaalmethode:</p>
                    <p class="amount">{{ PaymentMethod }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="true"
    ></b-loading>
  </div>
</template>

<script>
import Reservation from "../../Api/Reservation";
import User from "../../Api/User";
import { DecryptKey } from "../../constants/keys";

export default {
  name: "PaymentResult",
  data() {
    return {
      PaymentStatus: "",
      userID: null,
      ReservationUserId: null,
      ReservationOrderId: null,
      ReservationPaymentId: null,
      PaymentMethod: null,
      Errors: [],
      IsAuthorized: false,
      OrderIsFound: false,
      IsPaid: false,
      IsCanceled: false,
      startAddress: null,
      endAddress: null,
      distance: null,
      travelTime: null,
      ReservationDate: null,
      farePrice: null,
      map_url: null,
      isLoading: true,
    };
  },
  mounted() {
    User.auth().then((response) => {
      this.userID = response.data.id;
    });

    Reservation.getReservationbyOrderId(this.$route.query.orderID)
      .then((response) => {
        console.log(response.data);
        if (response.data.status == "Closed") {
          this.$router.push({ name: "notFound" });
        }
      })
      .catch((error) => {
        if (error.response.status === 404) {
          Reservation.getWebhook({
            id: this.$route.query.paymentID,
          }).then((response) => {
            console.log(response.data);
            if (response.data.status == "paid") {
              this.CreateReservation(this.userID);
              this.IsPaid = true;
            } else if (response.data.status == "canceled") {
              this.$router.push({ name: "FareCalculationResult" });
            } else if (response.data.status == "expired") {
              //create error page that says payment has expired and payment didnt go through
              console.log("payment expired");
            } else if (response.data.status == "failed") {
              //create error page that says payment has failed and redirect to fare result page
              console.log("payment failed");
            }
          });
        }
      });
  },
  methods: {
    CreateReservation(userID) {
      Reservation.createReservation({
        start_address: this.CryptoJS.AES.decrypt(
          sessionStorage.getItem("startAddress"),
          DecryptKey
        ).toString(this.CryptoJS.enc.Utf8),

        end_address: this.CryptoJS.AES.decrypt(
          sessionStorage.getItem("endAddress"),
          DecryptKey
        ).toString(this.CryptoJS.enc.Utf8),

        start_address_geo: this.CryptoJS.AES.decrypt(
          sessionStorage.getItem("startAddressGeo"),
          DecryptKey
        ).toString(this.CryptoJS.enc.Utf8),

        end_address_geo: this.CryptoJS.AES.decrypt(
          sessionStorage.getItem("endAddressGeo"),
          DecryptKey
        ).toString(this.CryptoJS.enc.Utf8),

        amount_of_people: sessionStorage.getItem("amountOfPeople"),
        pickup_date: sessionStorage.getItem("pickup_date"),
        fare_price: this.CryptoJS.AES.decrypt(
          sessionStorage.getItem("farePrice"),
          DecryptKey
        ).toString(this.CryptoJS.enc.Utf8),
        distance: sessionStorage.getItem("distance"),
        travel_time: sessionStorage.getItem("traveltime"),
        map_url: sessionStorage.getItem("map_url"),
        order_id: this.$route.query.orderID,
        payment_id: this.$route.query.paymentID,
        status: "Closed",
        user_id: userID,
      }).then((response) => {
        console.log(response);
        this.ReservationUserId = response.data.user_id;
        this.ReservationOrderId = response.data.payment_id;
        this.startAddress = response.data.start_address;
        this.endAddress = response.data.end_address;
        this.distance = response.data.distance;
        this.travelTime = response.data.travel_time;
        this.farePrice = response.data.fare_price;
        this.ReservationDate = response.data.pickup_date;
        this.map_url = response.data.map_url;

        Reservation.getWebhook({
          id: response.data.payment_id,
        }).then((response) => {
          console.log(response.data);
          this.PaymentStatus = response.data.status;
          this.PaymentMethod = response.data.method;
          this.isLoading = false;
        });
      });
    },
  },
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
