<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { MapBoxKey } from "../../constants/keys";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "MapBoxMap",
  components: {},
  data() {
    return {
      map: null,
      token: MapBoxKey,
    };
  },
  async mounted() {
    this.CreateMap();

    this.map.on("load", () => {
      this.addRoute();
    });
  },
  computed: {
    ...mapGetters("CurrentReservation", ["reservation"]),
  },
  methods: {
    async CreateMap() {
      mapboxgl.accessToken = MapBoxKey;
      this.map = new mapboxgl.Map({
        container: "map", // container ID
        // style URL
        style: "mapbox://styles/mapbox/streets-v11",
        center: [5.2793703, 52.2129919], // starting position
        zoom: 7,
      });
    },
    async addRoute() {
      const startCoords = [this.reservation.reservation.StartObject.geometry.coordinates[0], this.reservation.reservation.StartObject.geometry.coordinates[1]]

      const endCoords = [this.reservation.reservation.EndObject.geometry.coordinates[0], this.reservation.reservation.EndObject.geometry.coordinates[1]]

      const request = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords};${endCoords}?geometries=geojson&access_token=${MapBoxKey}`
      );
     
      this.map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: request.data.routes[0].geometry.coordinates,
            },
          },
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#f14668",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });

      this.map.addLayer({
        id: "start",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: startCoords,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 5,
          "circle-color": "black",
        },
      });
      this.map.addLayer({
        id: "end",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: endCoords,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 5,
          "circle-color": "#f14668",
        },
      });
    },
  },
};
</script>

<style>
#map {
  width: 750px;
  height: 750px;
  border-radius: 10px;
}
.mgl-map-wrapper,
.mapboxgl-map {
  border-radius: 10px;
}
/*Mobile breakpoints*/
@media only screen and (max-width: 768px) {
 #map{
    top: 0;
    bottom: 0;
    width: 100%;
  }
}
</style>
