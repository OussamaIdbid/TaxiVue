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
      <!-- <div class="column is-half is-centered">
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
                    <p id="km-text">Afstand:</p>
                    <p id="km-amount">{{ distanceS }}km</p>
                  </div>
                  <div id="min-container">
                    <p id="min-text">Reistijd:</p>
                    <p id="min-amount">{{ traveltimeS }}</p>
                  </div>
                </div>
                <div id="fare-container">
                  <p id="fare-text">Ritprijs:</p>
                  <p id="fare-amount">€{{ farePriceS }}</p>
                </div>
                <div v-if="!ReservationActive">
                  <button
                    class="button is-danger is-fullwidth"
                    id="back-home"
                    @click="ToReservation"
                  >
                    Boek nu een taxi
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      <!-- </div>  -->
      <!-- <ReservationForm v-if="ReservationActive"></ReservationForm> -->
    </div>
  </section>
</template>

<script>
import { DecryptKey } from "../../constants/keys";
import { mapGetters } from "vuex";
import MapBoxMap from "../MapBox/MapBoxMap.vue";
import ReservationSteps from "./ReservationSteps.vue";

export default {
  components: {
    MapBoxMap,
    ReservationSteps,
  },
  data() {
    return {
      startObject: this.CryptoJS.AES.decrypt(
        sessionStorage.getItem("startObject"),
        DecryptKey
      ).toString(this.CryptoJS.enc.Utf8),

      endObject: this.CryptoJS.AES.decrypt(
        sessionStorage.getItem("endObject"),
        DecryptKey
      ).toString(this.CryptoJS.enc.Utf8),

      routeObject: this.CryptoJS.AES.decrypt(
        sessionStorage.getItem("routeObject"),
        DecryptKey
      ).toString(this.CryptoJS.enc.Utf8),

      map_urlS: sessionStorage.getItem("map_url"),
      startAddressS: this.CryptoJS.AES.decrypt(
        sessionStorage.getItem("startAddress"),
        DecryptKey
      ).toString(this.CryptoJS.enc.Utf8),
      endAddressS: this.CryptoJS.AES.decrypt(
        sessionStorage.getItem("endAddress"),
        DecryptKey
      ).toString(this.CryptoJS.enc.Utf8),
      distanceS: sessionStorage.getItem("distance"),
      traveltimeS: sessionStorage.getItem("traveltime"),
      farePriceS: this.CryptoJS.AES.decrypt(
        sessionStorage.getItem("farePrice"),
        DecryptKey
      ).toString(this.CryptoJS.enc.Utf8),
      amountOfPeople: sessionStorage.getItem("amountOfPeople"),
      ReservationActive: false,
    };
  },
  computed: {
    ...mapGetters(["authenticated"]),
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
      setTimeout(function () {
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
