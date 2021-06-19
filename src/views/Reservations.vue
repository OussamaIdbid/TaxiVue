<template>
  <div>
    <b-tabs
      v-model="activeTab"
      position="is-centered"
      :animated="false"
      class="block"
    >
      <b-tab-item label="Reserveringen">
        <reservation-card
          v-for="item in this.data"
          :key="item.id"
          v-bind:OrderID="item.id"
        ></reservation-card>
        <b-pagination
          :total="total"
          v-model="current"
          :range-before="rangeBefore"
          :range-after="rangeAfter"
          :order="order"
          :size="size"
          :simple="isSimple"
          :rounded="isRounded"
          :per-page="perPage"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page"
        >
        </b-pagination>
      </b-tab-item>
      <b-tab-item label="Geschiedenis"> Geen reserveringen </b-tab-item>
      <b-tab-item v-if="this.role == 3" label="Terugbetalingen">
        <reservation-card
          v-for="item in this.refundedData"
          :key="item.id"
          :OrderID="item.id"
          :IsRefund="item.isRefund"
        ></reservation-card>
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
import ReservationCard from "../components/auth/ReservationCard";
import Reservations from "../Api/Reservation.js";
import User from "../Api/User.js";
import { ROLES } from "../constants/roles";

export default {
  name: "Reservations",
  components: {
    ReservationCard,
  },
  data() {
    return {
      data: null,
      refundedData: null,
      isLoading: true,
      activeTab: 0,
      Role: null,
      total: null,
      current: 1,
      perPage: 10,
      rangeBefore: 3,
      rangeAfter: 1,
      order: "",
      size: "",
      isSimple: false,
      isRounded: false,
    };
  },
  mounted() {
    User.auth().then((response) => {
      if (response.data.user_type == ROLES.ADMIN) {
        Reservations.getReservationsByPage(this.current).then((response) => {
          this.total = response.data.total;
          this.perPage = response.data.per_page;
          this.data = response.data.data;
          this.refundedData = this.data.filter(reservation => reservation.refundIsAsked)
          this.refundedData.map(reservation => {
            reservation.isRefund = true
          });
          this.isLoading = false;
          this.role = ROLES.ADMIN;
        });
      } else if (response.data.user_type == ROLES.CUSTOMER) {
        Reservations.getReservationsByPage(this.current).then((response) => {
          console.log(response);
          this.total = response.data.total;
          this.perPage = response.data.per_page;
          this.data = response.data.data;
          this.isLoading = false;
          this.role = ROLES.CUSTOMER;
        });
      }
    });
  },
  watch: {
    current: function (val) {
      User.auth().then((response) => {
        console.log(response.data);
        if (response.data.user_type == ROLES.ADMIN) {
          Reservations.getReservationsByPage(val).then((response) => {
            this.data = response.data.data;
            this.isLoading = false;
            this.role = ROLES.ADMIN;
          });
        } else if (response.data.user_type == ROLES.CUSTOMER) {
          Reservations.getReservationsByPage(val).then((response) => {
            console.log(response);
            this.data = response.data.data;
            this.isLoading = false;
            this.role = ROLES.CUSTOMER;
          });
        }
      });
    },
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
