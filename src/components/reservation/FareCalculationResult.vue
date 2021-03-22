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
  </section>
</template>

<script>
//import { DecryptKey } from "../../constants/keys";
import { mapGetters } from "vuex";
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
      startObject: '',
      endObject: '',
      routeObject: '',
      distance: '',
      traveltime: '',
      farePrice: '',
      amountOfPeople: '',
      ReservationActive: false,

    };
  },
  computed: {
    ...mapGetters(["authenticated"]),
    ...mapGetters('CurrentReservation', ["reservation"])
  },
  methods: {
    backToHome() {
      this.$router.push({ name: "Home" });
      // localStorage.removeItem("calculated", false)
    },
    ToReservation() {
      if (!this.authenticated) {
        this.$router.push({
          name: "Login",
          query: { redirect: this.$route.name },
        });
      } else {
        this.ReservationActive = true;

      }
    },
    
  },
  mounted() {

    if (!sessionStorage.getItem("calculated")) {
      this.$router.push({ name: "Home" });
      sessionStorage.removeItem("map_url");
      sessionStorage.removeItem("startAddress");
      sessionStorage.removeItem("endAddress");
      sessionStorage.removeItem("distance");
      sessionStorage.removeItem("traveltime");
      sessionStorage.removeItem("farePrice");
      sessionStorage.removeItem("map_url");
    } else {
      setTimeout( () => {
        document.getElementById("loader").classList.remove("is-active");
        localStorage.removeItem("calculated", false);
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
