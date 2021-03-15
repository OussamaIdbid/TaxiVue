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
                :disabled="startIsDisabled"
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
                :disabled="endIsDisabled"
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
        </div>
        <div class="is-divider-vertical" data-content=""></div>
          <div class="column">
            <b-field grouped>
              <b-field label="Name" expanded>
                <b-field>
                  <b-select placeholder="Title">
                    <option>Mr.</option>
                    <option>Ms.</option>
                  </b-select>
                  <b-input placeholder="Name" expanded></b-input>
                </b-field>
              </b-field>
              <b-field label="Email" expanded>
                <b-input placeholder="some@email.com"></b-input>
              </b-field>
            </b-field>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CATEGORIES } from "../../constants/mapBox/PlaceCategories";

export default {
  data() {
    return {
      CATEGORIES: CATEGORIES,
      startIsDisabled: true,
      endIsDisabled: true
    };
  },
};
</script>

<style scoped></style>
