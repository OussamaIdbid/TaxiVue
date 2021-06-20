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
    this.$store.watch(
      (state) => {
        return state.CurrentReservation.reservation;
      },
      (value) => {
        if (value) {
          this.addRoute();
        }
      }
    );
    this.CreateMap();

    this.map.on("load", () => {
      this.addRoute();
    });
  },
  computed: {
    ...mapGetters("CurrentReservation", ["reservation"]),
  },
  methods: {
    //TODO SET CENTER OF MAP AND ZOOM BASED ON COORDINATES 
    async CreateMap() {
      mapboxgl.accessToken = MapBoxKey;
      this.map = new mapboxgl.Map({
        container: "map", // container ID
        // style URL
        style: "mapbox://styles/mapbox/light-v10",
        center: [5.2793703, 52.2129919], // starting position
        zoom: 7,
      });
    },
    async addRoute() {
      const startCoords = [
        this.reservation.reservation.StartObject.geometry.coordinates[0],
        this.reservation.reservation.StartObject.geometry.coordinates[1],
      ];

      const endCoords = [
        this.reservation.reservation.EndObject.geometry.coordinates[0],
        this.reservation.reservation.EndObject.geometry.coordinates[1],
      ];

      const request = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords};${endCoords}?geometries=geojson&access_token=${MapBoxKey}`
      );

      const routeData = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: request.data.routes[0].geometry.coordinates,
        },
      };

      if (this.map.getSource("route")) {
        this.map.getSource("route").setData(routeData);
      } else {
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
            "line-color": "#3273dc",
            "line-width": 5,
            "line-opacity": 1,
          },
        });
      }
      const startData = {
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
      };
      if (this.map.getLayer("start")) {
        this.map.getSource("start").setData(startData);
      } else {
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
            "circle-radius": 10,
            "circle-color": "#3273dc",
            "circle-stroke-color": "white",
            "circle-stroke-width": 5,
            "circle-stroke-opacity": 1,
          },
        });
      }

      const endData = {
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
      };

      if (this.map.getLayer("end")) {
        this.map.getSource("end").setData(endData);
      } else {
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
            "circle-radius": 10,
            "circle-color": "#3273dc",
            "circle-stroke-color": "white",
            "circle-stroke-width": 5,
            "circle-stroke-opacity": 1,
          },
        });
      }
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
  #map {
    top: 0;
    bottom: 0;
    width: 100%;
  }
}
</style>
