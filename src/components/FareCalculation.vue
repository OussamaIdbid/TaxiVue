<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column">
        <h1 id="section_1_heading" class="has-text-white is-size-3">
          Bereken gemakkelijk je ritprijs
        </h1>
      </div>
    </div>
    <div class="columns is-centered" id="card-container">
      <div class="column is-one-third is-centered">
        <div id="calculate-fare-container" class="card">
          <div class="card-content">
            <div class="field">
              <b-field label="Vertrekpunt">
                <b-autocomplete
                  v-model="StartInput"
                  :data="placesStart"
                  placeholder="Voer een adres in"
                  field="place_name"
                  icon="map-marker"
                  :loading="isFetchingStart"
                  @input="getAsyncDataStart"
                  @select="assignTagStart($event)"
                >
                  <template slot-scope="props">
                    <div class="media">
                       <div v-if='props.option.place_type[0] === CATEGORIES.ADDRESS.name' class="media-left">
                        <b-icon  pack="fas" :icon="CATEGORIES.ADDRESS.icon_name"> </b-icon>
                      </div>
                       <div  v-else-if='props.option.place_type[0] === "poi" && props.option.properties.category === CATEGORIES.AIRPORT.name ' class="media-left">
                        <b-icon  pack="fas" :icon="CATEGORIES.AIRPORT.icon_name"> </b-icon>
                      </div>
                       <div  v-else-if='props.option.place_type[0] === "poi" && props.option.properties.category === CATEGORIES.RESTAURANT.name ' class="media-left">
                        <b-icon  pack="fas" :icon="CATEGORIES.RESTAURANT.icon_name"> </b-icon>
                      </div> 
                      <div  v-else-if='props.option.place_type[0] === "poi" && props.option.properties.category === CATEGORIES.HISTORIC_SITE.name ' class="media-left">
                        <b-icon  pack="fas" :icon="CATEGORIES.HISTORIC_SITE.icon_name"> </b-icon>
                      </div>
                      <div  v-else-if='props.option.place_type[0] === "poi" && props.option.properties.category === CATEGORIES.SUPERMARKET.name ' class="media-left">
                        <b-icon  pack="fas" :icon="CATEGORIES.SUPERMARKET.icon_name "> </b-icon>
                      </div>                                               
                      <div v-else class="media-left">
                        <b-icon  pack="fas" :icon="CATEGORIES.GENERAL.icon_name"> </b-icon>
                      </div>

                      <div class="media-content">
                        {{ props.option.place_name }}

                      </div>
                    </div>
                  </template>
                </b-autocomplete>
              </b-field>
            </div>
            <div class="field mb-5">
              <b-field label="Eindbestemming">
                <b-autocomplete
                  v-model="EndInput"
                  :data="PlacesEnd"
                  placeholder="Voer een adres in"
                  field="place_name"
                  icon="map-marker"
                  :loading="isFetchingEnd"
                  @input="getAsyncDataEnd"
                  @select="assignTagEnd($event)"
                >
                  <template slot-scope="props">
                    <div class="media">

                       <div v-if='props.option.place_type[0] === CATEGORIES.ADDRESS.name' class="media-left">
                        <b-icon  pack="fas" :icon="CATEGORIES.ADDRESS.icon_name"> </b-icon>
                      </div>
                       <div  v-else-if='props.option.place_type[0] === "poi" && props.option.properties.category === CATEGORIES.AIRPORT.name ' class="media-left">
                        <b-icon  pack="fas" :icon="CATEGORIES.AIRPORT.icon_name"> </b-icon>
                      </div>
                       <div  v-else-if='props.option.place_type[0] === "poi" && props.option.properties.category === CATEGORIES.RESTAURANT.name ' class="media-left">
                        <b-icon  pack="fas" :icon="CATEGORIES.RESTAURANT.icon_name"> </b-icon>
                      </div> 
                      <div  v-else-if='props.option.place_type[0] === "poi" && props.option.properties.category === CATEGORIES.HISTORIC_SITE.name ' class="media-left">
                        <b-icon  pack="fas" :icon="CATEGORIES.HISTORIC_SITE.icon_name"> </b-icon>
                      </div>
                      <div  v-else-if='props.option.place_type[0] === "poi" && props.option.properties.category === CATEGORIES.SUPERMARKET.name ' class="media-left">
                        <b-icon  pack="fas" :icon="CATEGORIES.SUPERMARKET.icon_name "> </b-icon>
                      </div>                                               
                      <div v-else class="media-left">
                        <b-icon  pack="fas" :icon="CATEGORIES.GENERAL.icon_name"> </b-icon>
                      </div>

                      <div class="media-content">
                        {{ props.option.place_name }}

                      </div>
                    </div>
                  </template>
                </b-autocomplete>
              </b-field>
            </div>

            <span></span>
            <b-field>
              <b-select
                placeholder="Aantal Personen"
                icon="user-friends"
                icon-pack="fas"
                v-model="categorySelect"
                v-on:input="FareCalculateValidation()"
              >
                <option
                  aria-placeholder="Aantal personen"
                  v-for="category in categories"
                  v-bind:value="{ id: category.id, text: category.name }"
                  v-bind:key="category.id"
                >
                  {{ category.name }}
                </option>
              </b-select>
            </b-field>

            <button
              id="calculate-fare"
              class="button is-danger has-text-centered is-static is-fullwidth"
              @click="processForm()"
            >
              Bereken prijs
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
//import "jquery-ui/ui/widgets/autocomplete";
import debounce from "lodash/debounce";
import { DecryptKey, HereApiKey } from "../variables/keys";
import { CALCULATION_CONSTANTS } from "../variables/fareCalculations";
import { CATEGORIES } from '../variables/mapBox/PlaceCategories'

export default {
  name: "FareCalculation",
  data() {
    return {
      platform: {},
      StartInput: "",
      EndInput: "",
      service: {},
      router: {},
      placesStart: [],
      PlacesEnd: [],
      placesService: {},
      distanceInMeters: null,
      distanceInKm: null,
      travelTimeInMin: null,
      fare: null,
      mapurl: "",
      startAddressGeo: "",
      endAddressGeo: "",
      categorySelect: "",
      categories: [
        { id: 1, name: "1-4 personen" },
        { id: 2, name: "4-7 personen" },
      ],
      returnResult: [
        {
          map_url: "",
          startAddress: "",
          endAddress: "",
          distance: 0,
          travelTime: 0,
          farePrice: 0,
          amountOfPeople: "",
          startAddressGeo: "",
          endAddressGeo: "",
        },
      ],
      isFetchingStart: false,
      isFetchingEnd: false,
      selected: null,
      CATEGORIES: CATEGORIES
    };
  },
  created() {
    this.platform = new H.service.Platform({
      apiKey: HereApiKey,
    });
    this.service = this.platform.getSearchService();
    this.router = this.platform.getRoutingService();
  },
  mounted() {
    localStorage.setItem("calculated", false);
  },
  methods: {
    passData() {
      $(".pageloader").addClass("is-active");
      setTimeout(() => {
        // console.log(response);

        sessionStorage.setItem("map_url", this.returnResult[0].map_url);
        sessionStorage.setItem(
          "startAddress",
          this.CryptoJS.AES.encrypt(
            this.returnResult[0].startAddress,
            DecryptKey
          ).toString()
        );
        sessionStorage.setItem(
          "endAddress",
          this.CryptoJS.AES.encrypt(
            this.returnResult[0].endAddress,
            DecryptKey
          ).toString()
        );
        sessionStorage.setItem(
          "startAddressGeo",
          this.CryptoJS.AES.encrypt(
            this.returnResult[0].startAddressGeo,
            DecryptKey
          ).toString()
        );
        sessionStorage.setItem(
          "endAddressGeo",
          this.CryptoJS.AES.encrypt(
            this.returnResult[0].endAddressGeo,
            DecryptKey
          ).toString()
        );
        sessionStorage.setItem("distance", this.returnResult[0].distance);
        sessionStorage.setItem("traveltime", this.returnResult[0].travelTime);
        sessionStorage.setItem(
          "farePrice",
          this.CryptoJS.AES.encrypt(
            this.returnResult[0].farePrice,
            DecryptKey
          ).toString()
        );
        sessionStorage.setItem(
          "amountOfPeople",
          this.returnResult[0].amountOfPeople
        );

        sessionStorage.setItem("calculated", true);

        this.$router.push({
          name: "FareCalculationResult",
        });
      }, 500);
    },
    /**
     * calculate distance between coordinates
     * @param {string} start
     * @param {string} end
     */
    calculateDistance: function(start, end) {
      const params = {
        mode: "fastest;car;traffic:enabled",
        waypoint0: start,
        waypoint1: end,
        representation: "display",
        routeAttributes: "summary",
      };

      this.router.calculateRoute(params, (success) => {
        this.distanceInMeters = success.response.route[0].summary.distance;
        this.travelTimeInMin =
          success.response.route[0].summary.trafficTime / 60;
        this.distanceInKm = this.distanceInMeters / 1000; // convert to KM

        // console.log("distance in km is" + this.distanceInKm);
        // console.log("travel time is" + this.travelTimeInMin);

        this.CalculateTaxiFare(
          this.distanceInKm,
          this.travelTimeInMin,
          this.categorySelect.id
        );
      });
    },
    processForm() {
      this.geocodeAddress(this.StartInput).then((response) => {
        this.startAddressGeo =
          response.Location.DisplayPosition.Latitude +
          "," +
          response.Location.DisplayPosition.Longitude;
        this.geocodeAddress(this.EndInput).then((response) => {
          this.endAddressGeo =
            response.Location.DisplayPosition.Latitude +
            "," +
            response.Location.DisplayPosition.Longitude;

          this.calculateDistance(this.startAddressGeo, this.endAddressGeo);
        });
      });
    },
    assignTagStart: function() {
      this.FareCalculateValidation();
    },
    assignTagEnd: function() {
      this.FareCalculateValidation();
    },
    getAsyncDataStart: debounce(function() {
      this.placesStart = [];
      if (!this.StartInput.length) {
        this.placesStart = [];
        return;
      }
      this.isFetchingStart = true;
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.StartInput}.json?autocomplete=true&language=nl&country=NL&access_token=pk.eyJ1Ijoib2lkYmlkIiwiYSI6ImNrZGJ0c29kMDAzdnQyc3FxcGRlaHR0aXEifQ.MLtBfQB6Hctj-y3FDuuckg`
        )
        .then(({ data }) => {
          console.log(data.features)
          data.features.forEach((place) => {
            this.placesStart.push(place);
          });
        })
        .catch((error) => {
          this.placesStart = [];
          throw error;
        })
        .finally(() => {
          this.isFetchingStart = false;
        });
      this.FareCalculateValidation();
    }, 500),

    getAsyncDataEnd: debounce(function() {
    this.PlacesEnd = [];
      if (!this.EndInput.length) {
        this.PlacesEnd = [];
        return;
      }
      this.isFetchingEnd = true;
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.EndInput}.json?autocomplete=true&language=nl&country=NL&access_token=pk.eyJ1Ijoib2lkYmlkIiwiYSI6ImNrZGJ0c29kMDAzdnQyc3FxcGRlaHR0aXEifQ.MLtBfQB6Hctj-y3FDuuckg`
        )
        .then(({ data }) => {
          console.log(data.features)
          data.features.forEach((place) => {
            this.PlacesEnd.push(place);
          });
        })
        .catch((error) => {
          this.PlacesEnd = [];
          throw error;
        })
        .finally(() => {
          this.isFetchingEnd = false;
        });
      this.FareCalculateValidation();
    }, 500),

    geocodeAddress(address) {
      return axios({
        method: "get",
        url: "https://geocoder.ls.hereapi.com/6.2/geocode.json",
        params: {
          searchtext: address,
          gen: "9",
          apikey: this.APIKEY,
        },
        responseType: "json",
      })
        .then(function(response) {
          return response.data.Response.View[0].Result[0];
        })
        .catch(function() {
          // console.log(error);
        });
    },

    /**
     * calculate taxi fare
     * @param {double} km
     * @param {int} min
     * @param {int} personCategory
     */
    CalculateTaxiFare(km, min, personCategory) {
      if (personCategory == 1) {
        this.fare = (
          CALCULATION_CONSTANTS.ONE_TO_FOUR_BASE +
          CALCULATION_CONSTANTS.PER_KM_ONE_TO_FOUR * km +
          CALCULATION_CONSTANTS.PER_MIN_ONE_TO_FOUR * min
        ).toFixed(2);
      } else {
        this.fare = (
          CALCULATION_CONSTANTS.FOUR_TO_SEVEN_BASE +
          CALCULATION_CONSTANTS.PER_KM_FOUR_TO_SEVEN * km +
          CALCULATION_CONSTANTS.PER_MIN_FOUR_TO_SEVEN * min
        ).toFixed(2);
      }
      this.getMapRouteImg(this.startAddressGeo, this.endAddressGeo);
    },
    /**
     * check if every field has been filled in correctly
     */
    FareCalculateValidation() {
      // console.log(this.StartInput);
      // console.log(this.EndInput);
      let startIsValid = this.validateAddress(this.StartInput);
      let endIsValid = this.validateAddress(this.EndInput);
      //var categorySelect = $("#person-category").val();
      if (this.categorySelect.text != null && startIsValid && endIsValid) {
        if (this.StartInput != this.EndInput) {
          $("#calculate-fare").removeClass("is-static");
          // console.log("true");
        } else {
          // console.log("addresses are the same");
        }
      } else {
        // console.log("false");
        $("#calculate-fare").addClass("is-static");
      }
    },
    /**
     * check if both input fields have correct address format
     * @param {string} address
     */
    validateAddress(address) {
      let amountOfCommas = 0;
      //console.log(address.length);

      for (let i = 0; i < address.length; i++) {
        if (String(address).charAt(i) == ",") {
          amountOfCommas++;
        }
      }
      if (amountOfCommas == 2 || amountOfCommas == 3 || amountOfCommas == 4) {
        return true;
      } else {
        return false;
      }
    },
    getMapRouteImg(start, end) {
      fetch(
        "https://image.maps.ls.hereapi.com/mia/1.6/routing?apiKey=4L8Nsl9VR_O3VV-MxXIlujMALfBGteJLT-6q25X4VuI&waypoint0=" +
          start +
          "&waypoint1=" +
          end +
          "&poix0=" +
          start +
          ";white;white;11;.&poix1=" +
          end +
          ";white;white;11;.&lc=1652B4&lw=15&vt=0&ppi=250&w=1000&h=1000",
        {
          method: "GET",
        }
      ).then((response) => {
        this.mapurl = response.url;
        this.returnResult[0].map_url = this.mapurl;
        this.returnResult[0].startAddress = this.StartInput;
        this.returnResult[0].endAddress = this.EndInput;
        this.returnResult[0].distance = Math.round(this.distanceInKm);
        this.returnResult[0].travelTime = this.time_convert(
          this.travelTimeInMin
        );
        this.returnResult[0].farePrice = this.fare;
        this.returnResult[0].amountOfPeople = this.categorySelect.text;
        this.returnResult[0].startAddressGeo = this.startAddressGeo;
        this.returnResult[0].endAddressGeo = this.endAddressGeo;
        // console.log(this.mapurl);
        this.passData();
      });
    },
    time_convert(num) {
      let hours = Math.floor(num / 60);
      let minutes = num % 60;
      // console.log(hours);
      // console.log(minutes);

      if (hours == 0) {
        return Math.round(minutes) + " min";
      } else {
        return hours + " uur en " + Math.round(minutes) + " min";
      }
    },
  },
};
</script>

<style scoped>
/*Mobile breakpoints*/
@media only screen and (max-width: 768px) {
  .section,
  .container {
    padding: 0 !important;
  }
  #card-container > .column {
    padding-right: 0;
    padding-left: 0;
  }
}
</style>
