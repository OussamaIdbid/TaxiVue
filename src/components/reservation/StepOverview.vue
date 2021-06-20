<template>
  <div class="container">
    <div class="box">
      <div class="columns">
        <div class="column">
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
                :disabled="!nextIsDisabled"
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
                :disabled="!nextIsDisabled"
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
          <div v-if="nextIsDisabled" class="buttons">
            <button
              id="recalculate-fare"
              class="button is-danger has-text-centered"
              @click="processForm()"
            >
              Bereken prijs
            </button>
            <button
              id="cancel-edit-fare"
              class="button is-danger has-text-centered"
              @click="cancelEditFare()"
            >
              Annuleer
            </button>
          </div>
          <button
            v-if="!nextIsDisabled"
            id="cancel-edit-fare"
            class="button is-danger has-text-centered"
            @click="editFare()"
          >
            Wijzig je reis
          </button>
        </div>
        <div class="is-divider-vertical" data-content=""></div>
        <div class="column" id="details-column">
          <div class="column-info">
            <span class="material-icons"> moving </span>
            <div v-if="!isLoading" class="info-end-wrapper">
              <p class="label">Afstand</p>
              <p class="info-end">€{{ reservation.reservation.distance }}</p>
            </div>
          </div>
          <div class="column-info">
            <span class="material-icons"> schedule </span>
            <div v-if="!isLoading" class="info-end-wrapper">
              <p class="label">Reistijd</p>
              <p class="info-end">€{{ reservation.reservation.travelTime }}</p>
            </div>
          </div>
          <div class="column-info">
            <span class="material-icons"> euro </span>
            <div v-if="!isLoading" class="info-end-wrapper">
              <p class="label">Prijs</p>
              <p class="info-end">€{{ reservation.reservation.farePrice }}</p>
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
import { CATEGORIES } from "../../constants/mapBox/PlaceCategories";
import axios from "axios";
import debounce from "lodash/debounce";
import { MapBoxKey } from "../../constants/keys";
import { SEARCH_API_BASE } from "../../constants/mapBox/BaseRequests";
import {
  getRoute,
  timeConvertToString,
  calculateTaxiFare,
  FareCalculateValidationEdit,
} from "./../../functions/reservationCalculation";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      CATEGORIES: CATEGORIES,
      inputIsDisabled: true,
      StartInput: "",
      EndInput: "",
      placesStart: [],
      PlacesEnd: [],
      selectedStart: [],
      selectedEnd: [],
      fare: null,
      startAddressGeo: "",
      endAddressGeo: "",
      isFetchingStart: false,
      isFetchingEnd: false,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("CurrentReservation", ["reservation", "nextIsDisabled"]),
    ...mapGetters(["authenticated"]),
  },

  mounted() {
    this.StartInput = JSON.parse(
      JSON.stringify(this.reservation)
    ).reservation.StartObject.place_name;
    this.EndInput = JSON.parse(
      JSON.stringify(this.reservation)
    ).reservation.EndObject.place_name;

    this.selectedStart = JSON.parse(
      JSON.stringify(this.reservation)
    ).reservation.StartObject;

    this.selectedEnd = JSON.parse(
      JSON.stringify(this.reservation)
    ).reservation.EndObject;
  },
  methods: {
    ...mapActions("CurrentReservation", [
      "pushReservation",
      "progressStep",
      "disableNextButton",
      "enableNextButton",
    ]),
    editFare() {
      this.disableNextButton();
    },
    cancelEditFare() {
      this.enableNextButton();

      this.StartInput = JSON.parse(
        JSON.stringify(this.reservation)
      ).reservation.StartObject.place_name;
      this.EndInput = JSON.parse(
        JSON.stringify(this.reservation)
      ).reservation.EndObject.place_name;
    },
    processForm() {
      getRoute(this.selectedStart, this.selectedEnd)
        .then((response) => {
          this.isLoading = true;
          const distanceInKm = Math.round(
            response.data.routes[0].distance / 1000
          );
          const dinstanceInKmString = distanceInKm + "km";
          const travelTimeInMin = response.data.routes[0].duration / 60;
          const travelTimeInHours = timeConvertToString(travelTimeInMin);

          const farePrice = calculateTaxiFare(
            distanceInKm,
            travelTimeInMin,
            this.reservation.reservation.amountOfPeople
          );

          this.pushReservation({
            StartObject: this.selectedStart,
            EndObject: this.selectedEnd,
            routeObject: response.data,
            amountOfPeople: this.reservation.reservation.amountOfPeople,
            travelTime: travelTimeInHours,
            farePrice: farePrice,
            distance: dinstanceInKmString,
          });
        })
        .then(() => {
          this.isLoading = false;
          this.enableNextButton();
        });
    },
    assignTagStart(slot) {
      this.selectedStart = slot;
      FareCalculateValidationEdit(
        this.StartInput,
        this.EndInput,
        "recalculate-fare"
      );
    },
    assignTagEnd: function (slot) {
      this.selectedEnd = slot;

      FareCalculateValidationEdit(
        this.StartInput,
        this.EndInput,
        "recalculate-fare"
      );
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
      FareCalculateValidationEdit(
        this.StartInput,
        this.EndInput,
        "recalculate-fare"
      );
    }, 500),

    getAsyncDataEnd: debounce(function () {
      this.PlacesEnd = [];
      if (!this.EndInput.length) {
        this.PlacesEnd = [];
        return;
      }
      this.isFetchingEnd = true;
      axios
        .get(
          `${SEARCH_API_BASE}${this.EndInput}.json?autocomplete=true&language=nl&country=NL&access_token=${MapBoxKey}`
        )
        .then(({ data }) => {
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
      FareCalculateValidationEdit(
        this.StartInput,
        this.EndInput,
        "recalculate-fare"
      );
    }, 500),
  },
};
</script>

<style scoped>
#step-overview-next {
  display: flex;
  justify-content: flex-end;
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
</style>
