<template>
  <section class="section is-family-primary" id="section-results">
    <!-- <div class="container"> -->
    <div class="columns is-centered" id="column-container">
      <div class="column">
        <ReservationSteps />
      </div>
      <div class="column">
        <MapBoxMap />
      </div>
    </div>
    <b-button
      label="Launch snackbar (with cancel)"
      size="is-medium"
      @click="hasCancel"
    />
  </section>
</template>

<script>
//import { DecryptKey } from "../../constants/keys";
import { mapGetters, mapActions } from "vuex";
import MapBoxMap from "../MapBox/MapBoxMap.vue";
import ReservationSteps from "./ReservationSteps.vue";
//import CryptoJS from 'crypto-js'
export default {
  components: {
    MapBoxMap,
    ReservationSteps,
  },
  data() {
    return {
      startObject: "",
      endObject: "",
      routeObject: "",
      distance: "",
      traveltime: "",
      farePrice: "",
      amountOfPeople: "",
      ReservationActive: false,
    };
  },
  computed: {
    ...mapGetters(["authenticated"]),
    ...mapGetters("CurrentReservation", ["isCalculated"]),
  },
  methods: {
    ...mapActions("CurrentReservation", ["resetOrder", "setCalculating"]),
    backToHome() {
      this.$router.push({ name: "Home" });
      // localStorage.removeItem("calculated", false)
    },
    ToReservation() {
      this.$router.push({
        name: "Login",
        query: { redirect: this.$route.name },
      });
    },
  },
  beforeRouteLeave: function (to, from, next) {
    if (this.authenticated) {
      if (this.isCalculated === false) {
        next();
      } else {
        this.$buefy.snackbar.open({
          indefinite: true,
          type: "is-danger",
          actionText: "Ja",
          position: "is-top",
          message: "Weet je zeker dat je je reservering wilt annuleren?",
          cancelText: "Nee",
          onAction: () => {
            this.setCalculating(false);
            this.resetOrder();
            next();
          },
        });
      }
    } else if (!this.authenticated) {
      this.setCalculating(false);
      next();
    }
  },
  mounted() {
    // console.log(localStorage.getItem("calculated"));
    // if (!this.authenticated) {
    //   this.ToReservation();
    // }
    if (this.isCalculated === false) {
      this.$router.push({ name: "Home" });
    } else {
      console.log("fdfdf");
      setTimeout(() => {
        document.getElementById("loader").classList.remove("is-active");
        localStorage.setItem("calculated", true);
      }, 3000);

      window.scrollTo(0, 0);
    }
  },
};
</script>

<style scoped>
#results-tile {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1),
    0 0 0 1px rgba(10, 10, 10, 0.02);
  margin-bottom: 1rem;
}
</style>
