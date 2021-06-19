<template>
  <div class="container" v-if="!isLoading" style="position: relative">
    <div class="box">
      <button class="material-icons close-modal" @click="closeModal">
        close
      </button>

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
      <div v-if="Role === 3">
        <div v-if="IsRefund" class="buttons">
          <div v-if="data.refundIsConfirmed" class="column-info request-label">
            <span class="material-icons"> done </span>
            <div>
              <p class="label">Terugbetaling is geaccepteerd</p>
            </div>
          </div>
          <div v-else-if="data.refundIsDenied" class="column-info request-label">
            <span class="material-icons"> close </span>
            <div>
              <p class="label">Terugbetaling is geweigerd</p>
            </div>
          </div>
          <div v-else>
            <b-button type="is-danger" @click="confirmRefund"
              >Bevestig terugbetaling</b-button
            >
            <b-button type="is-danger" @click="denyRefund"
              >Weiger terugbetaling</b-button
            >
          </div>
        </div>
      </div>
      <div v-if="Role === 1">
        <div class="buttons">
          <b-button
            v-if="!data.refundIsAsked"
            @click="askRefund"
            expanded
            type="is-danger"
            >Terugbetaling aanvragen</b-button
          >
          <div v-else-if="data.refundIsAsked">
            <div
              v-if="data.refundIsConfirmed && data.refundIsAsked"
              class="column-info request-label"
            >
              <span class="material-icons"> done </span>
              <div>
                <p class="label">Je terugebetaling verzoek is bevestigd</p>
              </div>
            </div>
            <div
              v-else-if="data.refundIsDenied && data.refundIsAsked"
              class="column-info request-label"
            >
              <span class="material-icons"> close </span>
              <div>
                <p class="label">Je terugebetaling verzoek is geweigerd</p>
              </div>
            </div>
            <div v-else class="column-info request-label">
              <span class="material-icons"> hourglass_top </span>
              <div>
                <p class="label">Je terugebetaling verzoek is in behandeling</p>
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
  </div>
</template>

<script>
import Reservation from "../../Api/Reservation";
import moment from "moment";
import { ROLES } from "./../../constants/roles";
import { mapGetters } from "vuex";
export default {
  props: {
    OrderID: Number,
    IsRefund: Boolean,
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
      Role: null,
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  mounted() {
    console.log(this.IsRefund);
    switch (this.user.user_type) {
      case 1:
        this.Role = ROLES.CUSTOMER;
        break;
      case 3:
        this.Role = ROLES.ADMIN;
        break;
      default:
        break;
    }
    Reservation.getReservation(this.OrderID).then((response) => {
      const filteredStartAddress = response.data.start_address.replace(
        ", Nederland",
        ""
      );
      const filteredEndAddress = response.data.end_address.replace(
        ", Nederland",
        ""
      );
      this.data = response.data;
      console.log(this.data.refundIsAsked);
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
    askRefund() {
      this.data.refundIsAsked = 1;
      Reservation.updateReservation(this.OrderID, this.data).then(
        (response) => {
          console.log(response);
        }
      );
    },
    confirmRefund() {
      this.data.refundIsConfirmed = 1;
      Reservation.updateReservation(this.OrderID, this.data).then(
        (response) => {
          console.log(response);
        }
      );
    },
    denyRefund() {
      this.data.refundIsDenied = 1;
      Reservation.updateReservation(this.OrderID, this.data).then(
        (response) => {
          console.log(response);
        }
      );
    },
    closeModal() {
      this.$parent.close();
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
</style>
