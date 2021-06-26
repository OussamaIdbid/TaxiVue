<template>
  <div>
    <section v-if="!isLoading && IsPaid" class="section is-family-primary">
      <div class="result-header">
        <span class="material-icons result-header-icon">check_circle</span>
        <h1 class="result-header-text">Je reservering is bevestigd!</h1>
        <p class="result-header-info">
          Er is een bevestigingsmail verzonden naar
          <span class="email-span">{{ user.email }}</span>
        </p>
      </div>
      <div class="box">
        <div class="column-info">
          <span class="material-icons"> tag </span>
          <div v-if="!isLoading" class="info-end-wrapper">
            <p class="label">Reserveringsnummer</p>
            <p class="info-end">#{{ orderId }}</p>
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
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
export default {
  name: "PaymentResult",
  data() {
    return {
      PaymentStatus: "",
      userID: null,
      ReservationUserId: null,
      ReservationOrderId: null,
      ReservationPaymentId: null,
      orderId: null,
      paymentMethod: null,
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
      isLoading: true,
    };
  },
  mounted() {
    User.auth().then((response) => {
      this.userID = response.data.id;
    });

    Reservation.getReservationbyOrderId(this.$route.query.orderID)
      .then((response) => {
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
              this.resetOrder();
              this.IsPaid = true;
            } else if (response.data.status == "canceled") {
              this.$router.push({ name: "FareCalculationResult" });
            } else if (response.data.status == "expired") {
              this.$router.push({ name: "PaymentExpired" });
              this.resetOrder();
            } else if (response.data.status == "failed") {
              this.$buefy.toast.open({
                message: "Betaling mislukt. Probeer het opnieuw",
                type: "is-danger",
              });
              this.$router.push({ name: "FareCalculationResult" });
            }
          });
        }
      });
  },
  beforeDestroy() {},
  computed: {
    ...mapGetters("CurrentReservation", ["reservation"]),
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions("CurrentReservation", ["resetOrder"]),

    CreateReservation(userID) {
      Reservation.createReservation({
        start_address: this.reservation.reservation.StartObject.place_name,

        end_address: this.reservation.reservation.EndObject.place_name,

        start_address_geo:
          this.reservation.reservation.StartObject.geometry.coordinates[1] +
          ", " +
          this.reservation.reservation.StartObject.geometry.coordinates[0],

        end_address_geo:
          this.reservation.reservation.EndObject.geometry.coordinates[1] +
          ", " +
          this.reservation.reservation.EndObject.geometry.coordinates[0],

        amount_of_people: this.reservation.reservation.amountOfPeople,
        pickup_date:
          moment(this.reservation.userDetails.date).format("YYYY-DD-MM") +
          " " +
          moment(this.reservation.userDetails.time).format("HH:mm"),
        fare_price: this.reservation.reservation.farePrice,
        distance: this.reservation.reservation.distance,
        travel_time: this.reservation.reservation.travelTime,
        order_id: this.$route.query.orderID,
        payment_id: this.$route.query.paymentID,
        status: "Closed",
        user_id: userID,
      }).then((response) => {
        console.log(response);
        this.ReservationUserId = response.data.user_id;
        this.ReservationOrderId = response.data.payment_id;
        this.orderId = response.data.order_id;
        this.startAddress = response.data.start_address;
        this.endAddress = response.data.end_address;
        this.distance = response.data.distance;
        this.travelTime = response.data.travel_time;
        this.farePrice = response.data.fare_price;
        this.ReservationDate = response.data.pickup_date;

        Reservation.getWebhook({
          id: response.data.payment_id,
        }).then((response) => {
          console.log(response.data);
          this.PaymentStatus = response.data.status;
          this.paymentMethod = response.data.method;
          this.isLoading = false;
        });
      });
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
  display: flex;
  flex-direction: column;
}
.label {
  font-size: large;
  margin-bottom: 0;
}

.header {
  font-size: smaller;
}
.close-modal {
  align-self: flex-end;
  color: black !important;
}
.is-divider {
  margin: 0.9rem 0;
}
.material-icons {
  color: #f14668;
  margin-right: 1rem;
}

.result-header {
  display: flex;
  flex-direction: column;
  align-content: center;
}
.result-header-text {
  font-size: xx-large;
  font-weight: bold;
}
.box {
  width: 50%;
}
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.result-header {
  margin: 5rem;
  display: flex;
  align-items: center;
}
.result-header-icon {
  font-size: xxx-large;
}
.email-span {
  font-weight: bold;
}
/*Mobile breakpoints*/
@media only screen and (max-width: 768px) {
  .box {
    width: 100%;
  }
}
</style>
