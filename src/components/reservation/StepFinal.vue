<template>
  <div class="container">
    <div class="box">
      <b-field label="Vertrekpunt" label-position="on-border">
        <b-input
          disabled
          v-model="reservation.reservation.StartObject.place_name"
          icon="circle"
        >
        </b-input>
      </b-field>
      <b-field label="Eindbestemming" label-position="on-border">
        <b-input
          disabled
          v-model="reservation.reservation.EndObject.place_name"
          icon="map-marker"
        >
        </b-input>
      </b-field>
    </div>
    <div class="box">
      <b-field label="Datum" label-position="on-border">
        <b-datepicker
          disabled
          v-model="date"
          :locale="locale"
          placeholder="Selecteer een datum..."
          icon="calendar-today"
        >
        </b-datepicker>
      </b-field>
      <b-field label="Tijd" label-position="on-border">
        <b-timepicker
          disabled
          v-model="time"
          placeholder="Selecteer een tijd..."
          icon="clock"
          :enable-seconds="enableSeconds"
          :hour-format="hourFormat"
          :locale="locale"
        >
        </b-timepicker>
      </b-field>

      <b-field label="Telefoonnummer" label-position="on-border">
        <b-input
          disabled
          v-model="reservation.userDetails.phonenumber"
          placeholder="Vul je telefoonnummer in"
          icon="phone"
        >
        </b-input>
      </b-field>
    </div>
    <div class="box">
      <div class="column-info">
        <span class="material-icons"> euro </span>
        <div v-if="!isLoading" class="info-end-wrapper">
          <p class="label">Subtotaal</p>
          <p class="info-end">€{{ reservation.reservation.farePrice }}</p>
        </div>
      </div>
      <div v-if="!discountIsCalculated" class="column-info">
        <span class="material-icons"> local_offer </span>
        <b-field label="Korting" label-position="on-border">
          <b-input v-model="discountCode" placeholder="Vul een kortingscode in">
          </b-input>
        </b-field>
        <b-button
          :disabled="DiscountButtonIsDisabled"
          @click="getDiscount"
          type="is-danger"
          >Toepassen</b-button
        >
      </div>
      <div v-else-if="discountIsCalculated" class="column-info">
        <span class="material-icons"> local_offer </span>
        <div v-if="!isLoading" class="info-end-wrapper">
          <p class="label">Korting</p>
          <div class="info-wrapper">
            <p class="info-end">-€{{ discount }}</p>
            <b-button @click="resetDiscount" size="is-small" type="is-danger"
              >Verwijder korting</b-button
            >
          </div>
        </div>
      </div>
      <div class="column-info">
        <span class="material-icons"> euro </span>
        <div v-if="!isLoading" class="info-end-wrapper">
          <p class="label">Totaal</p>
          <p class="info-end">€{{ totalPrice }}</p>
        </div>
      </div>

      <button
        id="cancel-edit-fare"
        class="button is-danger has-text-centered"
        @click="handlePayment()"
      >
        Naar Betalen
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Reservation from "./../../Api/Reservation";
import Discount from "./../../Api/Discount";
import { discountIsValid } from "./../../functions/discount";
export default {
  computed: {
    ...mapGetters("CurrentReservation", [
      "reservation",
      "userDetails",
      "currentDiscount",
      "discountIsUsed",
      "loading"
    ]),
    ...mapGetters(["user"]),
  },
  data() {
    return {
      isAnimated: false,
      isRounded: true,
      hasNavigation: false,
      isClickable: false,
      phoneNumber: "",
      time: null,
      date: null,
      discount: 0,
      totalPrice: 0,
      discountCode: "",
      discountIsCalculated: false,
      DiscountButtonIsDisabled: true,
    };
  },
  mounted() {
    this.$store.watch(
      (state) => {
        return state.CurrentReservation.currentStep;
      },
      (value) => {
        if (value) {
          this.phoneNumber = this.reservation.userDetails.phonenumber;
          this.time = new Date(this.reservation.userDetails.time);
          this.date = new Date(this.reservation.userDetails.date);
        }
      }
    );
    this.$store.watch(
      (state) => {
        return state.CurrentReservation.reservation;
      },
      (value) => {
        if (value) {
          this.totalPrice = this.reservation.reservation.farePrice;
        }
      }
    );
    if (this.discountIsUsed) {
      this.discountCode = this.currentDiscount;
      this.getDiscount();
    }
    this.phoneNumber = this.reservation.userDetails.phonenumber;
    this.time = new Date(this.reservation.userDetails.time);

    this.date = new Date(this.reservation.userDetails.date);
    this.totalPrice = this.reservation.reservation.farePrice;
  },
  watch: {
    discountCode: function (val) {
      this.setCurrentDiscount(val);
      val.length > 0
        ? (this.DiscountButtonIsDisabled = false)
        : (this.DiscountButtonIsDisabled = true);
    },
  },
  methods: {
    ...mapActions("CurrentReservation", [
      "setDiscountIsUsed",
      "setCurrentDiscount",
      "setLoading",
    ]),
    handlePayment() {
      Reservation.Payment(this.reservation.reservation.farePrice).then(
        (response) => {
          window.open(response.data, "_self");
        }
      );
    },
    getDiscount() {
      this.setLoading(true);
      Discount.getDiscount(this.discountCode)
        .then(async (response) => {
          const IsValid = await discountIsValid(this.user.id, response.data);

          if (IsValid.success === false) {
            this.$buefy.snackbar.open({
              type: "is-danger",
              actionText: "OK",
              position: "is-bottom",
              message: IsValid.errorMsg,
              duration: 1500,
            });
            this.setLoading(false)
            this.discountCode = "";
          } else {
            if (response.data.type === 0) {
              this.discount = (
                (this.reservation.reservation.farePrice / 100) *
                response.data.value
              ).toFixed(2);
            } else if (response.data.type === 1) {
              this.discount = response.data.value;
            }

            this.totalPrice = (
              this.reservation.reservation.farePrice - this.discount
            ).toFixed(2);
            this.discountIsCalculated = true;
            this.setDiscountIsUsed(true);

            this.setLoading(false);
          }
        })
        .catch(() => {
          this.setLoading(false)
          this.$buefy.snackbar.open({
            type: "is-danger",
            actionText: "OK",
            position: "is-bottom",
            message: "Kortingscode niet geldig",
            duration: 1500,
          });
          this.setDiscountIsUsed(false);
          this.discountCode = "";
        });
    },
    resetDiscount() {
      this.discountCode = "";
      this.setDiscountIsUsed(false);
      this.discount = 0;
      this.discountIsCalculated = false;
      this.totalPrice = this.reservation.reservation.farePrice;
    },
  },
};
</script>

<style>
#step-overview-next {
  display: flex;
  justify-content: space-between;
}
</style>


<style scoped>
.datepicker {
  display: block;
}
.label {
  font-size: large;
  margin-bottom: 0;
}
.material-icons {
  color: #f14668;
  margin-right: 1rem;
}
.column-info {
  display: flex;
  margin-bottom: 1rem;
}
.info-wrapper {
  display: flex;
}
.info-end {
  margin-right: 1rem;
}
</style>