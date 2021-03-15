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
              <b-field label="Vertrekpunt" label-position="inside">
                <b-autocomplete
                  v-model="StartInput"
                  :data="placesStart"
                  placeholder="Voer een adres in"
                  field="place_name"
                  icon="circle"
                  :loading="isFetchingStart"
                  @input="getAsyncDataStart"
                  @select="assignTagStart($event)"
                >
                  <template slot-scope="props">
                    <div class="media">
                      <div
                        v-if="
                          props.option.place_type[0] === CATEGORIES.ADDRESS.name
                        "
                        class="media-left"
                      >
                        <b-icon pack="fas" :icon="CATEGORIES.ADDRESS.icon_name">
                        </b-icon>
                      </div>
                      <div
                        v-else-if="
                          props.option.place_type[0] === 'poi' &&
                          props.option.properties.category ===
                            CATEGORIES.AIRPORT.name
                        "
                        class="media-left"
                      >
                        <b-icon pack="fas" :icon="CATEGORIES.AIRPORT.icon_name">
                        </b-icon>
                      </div>
                      <div
                        v-else-if="
                          props.option.place_type[0] === 'poi' &&
                          props.option.properties.category ===
                            CATEGORIES.RESTAURANT.name
                        "
                        class="media-left"
                      >
                        <b-icon
                          pack="fas"
                          :icon="CATEGORIES.RESTAURANT.icon_name"
                        >
                        </b-icon>
                      </div>
                      <div
                        v-else-if="
                          props.option.place_type[0] === 'poi' &&
                          props.option.properties.category ===
                            CATEGORIES.HISTORIC_SITE.name
                        "
                        class="media-left"
                      >
                        <b-icon
                          pack="fas"
                          :icon="CATEGORIES.HISTORIC_SITE.icon_name"
                        >
                        </b-icon>
                      </div>
                      <div
                        v-else-if="
                          props.option.place_type[0] === 'poi' &&
                          props.option.properties.category ===
                            CATEGORIES.SUPERMARKET.name
                        "
                        class="media-left"
                      >
                        <b-icon
                          pack="fas"
                          :icon="CATEGORIES.SUPERMARKET.icon_name"
                        >
                        </b-icon>
                      </div>
                      <div v-else class="media-left">
                        <b-icon pack="fas" :icon="CATEGORIES.GENERAL.icon_name">
                        </b-icon>
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
              <b-field label="Eindbestemming" label-position="inside">
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
                      <div
                        v-if="
                          props.option.place_type[0] === CATEGORIES.ADDRESS.name
                        "
                        class="media-left"
                      >
                        <b-icon pack="fas" :icon="CATEGORIES.ADDRESS.icon_name">
                        </b-icon>
                      </div>
                      <div
                        v-else-if="
                          props.option.place_type[0] === 'poi' &&
                          props.option.properties.category ===
                            CATEGORIES.AIRPORT.name
                        "
                        class="media-left"
                      >
                        <b-icon pack="fas" :icon="CATEGORIES.AIRPORT.icon_name">
                        </b-icon>
                      </div>
                      <div
                        v-else-if="
                          props.option.place_type[0] === 'poi' &&
                          props.option.properties.category ===
                            CATEGORIES.RESTAURANT.name
                        "
                        class="media-left"
                      >
                        <b-icon
                          pack="fas"
                          :icon="CATEGORIES.RESTAURANT.icon_name"
                        >
                        </b-icon>
                      </div>
                      <div
                        v-else-if="
                          props.option.place_type[0] === 'poi' &&
                          props.option.properties.category ===
                            CATEGORIES.HISTORIC_SITE.name
                        "
                        class="media-left"
                      >
                        <b-icon
                          pack="fas"
                          :icon="CATEGORIES.HISTORIC_SITE.icon_name"
                        >
                        </b-icon>
                      </div>
                      <div
                        v-else-if="
                          props.option.place_type[0] === 'poi' &&
                          props.option.properties.category ===
                            CATEGORIES.SUPERMARKET.name
                        "
                        class="media-left"
                      >
                        <b-icon
                          pack="fas"
                          :icon="CATEGORIES.SUPERMARKET.icon_name"
                        >
                        </b-icon>
                      </div>
                      <div v-else class="media-left">
                        <b-icon pack="fas" :icon="CATEGORIES.GENERAL.icon_name">
                        </b-icon>
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
            <b-field label="Aantal personen" label-position="on-border">
              <b-select
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
import debounce from "lodash/debounce";
import { DecryptKey, MapBoxKey } from "../../constants/keys";
import { CATEGORIES } from "../../constants/mapBox/PlaceCategories";
import {
  SEARCH_API_BASE
} from "../../constants/mapBox/BaseRequests";
import { getRoute, calculateTaxiFare, timeConvertToString, FareCalculateValidation} from "./../../functions/reservationCalculation";
export default {
  name: "FareCalculation",
  data() {
    return {
      StartInput: "",
      EndInput: "",
      placesStart: [],
      PlacesEnd: [],
      selectedStart: [],
      selectedEnd: [],
      fare: null,
      mapurl: "",
      startAddressGeo: "",
      endAddressGeo: "",
      categorySelect: "",
      categories: [
        { id: 1, name: "1-4 personen" },
        { id: 2, name: "4-7 personen" },
      ],
      isFetchingStart: false,
      isFetchingEnd: false,
      CATEGORIES: CATEGORIES,
    };
  },
  created() {

  },
  mounted() {
    localStorage.setItem("calculated", false);
  },
  methods: {
    processForm() {
      document.getElementById("loader").classList.add("is-active");
      getRoute(this.selectedStart, this.selectedEnd).then((response) => {
        
        const stringifiedStartObject = JSON.stringify(this.selectedStart);
        const stringifiedEndObject = JSON.stringify(this.selectedEnd);
        const stringifiedRouteObject = JSON.stringify(response.data);
        const distanceInKm = response.data.routes.distance / 1000
        const travelTimeInMin = response.data.routes.duration / 60
        const travelTimeInHours = timeConvertToString(travelTimeInMin);

        calculateTaxiFare(distanceInKm, travelTimeInMin, this.categorySelect.id)

        sessionStorage.setItem("startObject", this.CryptoJS.AES.encrypt(stringifiedStartObject,DecryptKey).toString());
        sessionStorage.setItem("endObject",this.CryptoJS.AES.encrypt(stringifiedEndObject, DecryptKey).toString());
        sessionStorage.setItem("routeObject",this.CryptoJS.AES.encrypt(stringifiedRouteObject,DecryptKey).toString());
        sessionStorage.setItem("amountOfPeople", this.CryptoJS.AES.encrypt(this.categorySelect.text, DecryptKey).toString());
        sessionStorage.setItem("travelTime", this.CryptoJS.AES.encrypt(travelTimeInHours, DecryptKey).toString())

        sessionStorage.setItem("calculated", true);
      })
      .then( () => {
          this.$router.push({
          name: "FareCalculationResult",
        });
      })
    },
    assignTagStart(slot) {
      this.selectedStart = slot;
      FareCalculateValidation(this.StartInput, this.EndInput, this.categorySelect, 'calculate-fare');
    },
    assignTagEnd: function (slot) {
      this.selectedEnd = slot;

      FareCalculateValidation(this.StartInput, this.EndInput, this.categorySelect, 'calculate-fare');
    },
    getAsyncDataStart: debounce(function () {
      this.placesStart = [];
      if (!this.StartInput.length) {
        this.placesStart = [];
        return;
      }
      this.isFetchingStart = true;
      axios
        .get(
          `${SEARCH_API_BASE}${this.StartInput}.json?autocomplete=true&language=nl&country=NL&access_token=${MapBoxKey}`
        )
        .then(({ data }) => {
          console.log(data.features);
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
      FareCalculateValidation(this.StartInput, this.EndInput, this.categorySelect, 'calculate-fare');
    }, 500),

    getAsyncDataEnd: debounce(function () {
      this.PlacesEnd = [];
      if (!this.EndInput.length) {
        this.PlacesEnd = [];
        return;
      }
      console.log(SEARCH_API_BASE);
      this.isFetchingEnd = true;
      axios
        .get(
          `${SEARCH_API_BASE}${this.EndInput}.json?autocomplete=true&language=nl&country=NL&access_token=${MapBoxKey}`
        )
        .then(({ data }) => {
          console.log(data.features);
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
      FareCalculateValidation(this.StartInput, this.EndInput, this.categorySelect, 'calculate-fare');
    }, 500),
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
