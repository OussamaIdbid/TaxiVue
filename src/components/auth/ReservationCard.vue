<template>
  <div class="column is-one-third is-centered" id="card-column">
    <h6 class="info-date">{{ date }}</h6>
    <div class="card" id="order-route-card">
      <div class="card-content">
        <div class="content">
          <div class="columns">
            <div class="column">
              <b-skeleton
                v-if="isLoading"
                width="100%"
                :animated="true"
              ></b-skeleton>
              <b-skeleton
                v-if="isLoading"
                width="100%"
                :animated="true"
              ></b-skeleton>
              <div class="columns" style="flex-direction: column">
                <div class="column-start">
                  <span v-if="!isLoading" class="material-icons">
                    fiber_manual_record
                  </span>
                  <div v-if="!isLoading" class="info-start-wrapper">
                    <p class="label">Vertrekpunt</p>
                    <p class="info-start">{{ startAddress }}</p>
                  </div>
                </div>
                <div class="column-end">
                  <span v-if="!isLoading" class="material-icons">
                    location_on
                  </span>

                  <div v-if="!isLoading" class="info-end-wrapper">
                    <p class="label">Eindbestemming</p>
                    <p class="info-end">{{ endAddress }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item">
          <a v-if="!isLoading"  @click="isComponentModalActive = true">Bekijk</a>
              <b-skeleton
                v-if="isLoading"
                :animated="true"
              ></b-skeleton>
        </a>
      </footer>
    </div>
    <b-modal
      v-model="isComponentModalActive"
      trap-focus
      
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
import moment from "moment";

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
      isLoading: true,
    };
  },
  mounted() {
    Reservation.getReservation(this.OrderID)
      .then((response) => {
        const filteredStartAddress = response.data.start_address.replace(
          ", Nederland",
          ""
        );
        const filteredEndAddress = response.data.end_address.replace(
          ", Nederland",
          ""
        );
        this.reservationData = response.data;
        this.startAddress = filteredStartAddress;
        this.endAddress = filteredEndAddress;
        this.date = moment(response.data.pickup_date).format("D MMMM YYYY");
      })
      .then(() => {
        this.isLoading = false;
      });
  },
  components: {
    ReservationsInfo,
  },
};
</script>

<style scoped>
.material-icons {
  color: #f14668 !important;
}
.column-start,
.column-end {
  display: flex;
}

.column-start {
  margin-bottom: 1rem;
}
.info-date{ 
  margin-bottom: 0.5rem;
  margin-left: 1rem;
}
.info-start-wrapper,
.info-end-wrapper {
  margin-left: 1rem;
}
.info-start,
.info-end {
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

/*Mobile breakpoints*/
@media only screen and (max-width: 768px) {
  .tab-content {
    padding: 0;
  }
  #card-column {
    width: 100%;
  }
}
</style>
