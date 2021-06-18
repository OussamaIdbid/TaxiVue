<template>
  <MglMap :accessToken="token" :mapStyle="mapStyle" :center="coordinates">

  </MglMap>
</template>

<script>
import MapBox from "mapbox-gl";
import { MapBoxKey } from "../../constants/keys";
import { mapGetters } from "vuex";
import { MglMap } from "vue-mapbox";
export default {
  name: "MapBoxMap",
  components: {
    MglMap,
    // MglPopup,
    // MglMarker,
    // MglGeojsonLayer,
  },
  data() {
    return {
      map: null,
      token: MapBoxKey,
      mapbox: null,
      RouteObject: [],
      StartObject: [],
      EndObject: [],
      mapStyle: "mapbox://styles/mapbox/streets-v11",
      coordinates: [-111.549668, 39.014],
      // geoJsonSource: {
      //   id: 1,
      //   type: "Feature",
      //   properties: {},
      //   geometry: [
      //     {
      //       type: "LineString",
      //       coordinates: JSON.parse(JSON.stringify(this.reservation))
      //         .reservation.routeObject.routes[0].geometry.coordinates,
      //     },
      //   ],
      // },
      // geoJsonLayer: {},

      // Coords: {
      //   startCoords:
      //     this.StartObject.geometry.coordinates[1] +
      //     ", " +
      //     this.StartObject.geometry.coordinates[0],
      //   endCoords:
      //     this.EndObject.geometry.coordinates[1] +
      //     "," +
      //     this.EndObject.geometry.coordinates[0],
      // },
    };
  },
  created() {
    this.mapbox = MapBox;
    
  },
  mounted() {

    // this.RouteObject = JSON.parse(
    //   JSON.stringify(this.reservation)
    // ).reservation.routeObject;
    // this.StartObject = JSON.parse(
    //   JSON.stringify(this.reservation)
    // ).reservation.StartObject;
    // this.EndObject = JSON.parse(
    //   JSON.stringify(this.reservation)
    // ).reservation.EndObject;

    // this.mapbox.accessToken = MapBoxKey;
    // this.map = new this.mapbox.Map({
    //   container: "map", // container ID
    //   // style URL
    //   style: "mapbox://styles/mapbox/streets-v11",
    //   center: [5.2793703, 52.2129919], // starting position
    //   zoom: 5,
    // });
    // initialize the map canvas to interact with later
    //const canvas = this.map.getCanvasContainer();
    // an arbitrary start will always be the same
    // only the end or destination will change
    // this is where the code for the next step will go
    // addEventListener("resize", () => this.map.resize());
    // const Coords = {
    //   startCoords:
    //     this.StartObject.geometry.coordinates[1] +
    //     ", " +
    //     this.StartObject.geometry.coordinates[0],
    //   endCoords:
    //     this.EndObject.geometry.coordinates[1] +
    //     "," +
    //     this.EndObject.geometry.coordinates[0],
    // };
    // const data = this.RouteObject.routes[0];
    // const route = data.geometry.coordinates;
    // const geojson = {
    //   type: "Feature",
    //   properties: {},
    //   geometry: {
    //     type: "LineString",
    //     coordinates: route,
    //   },
    // };
    //   //this.map.on("load", () => {
    //     this.map.addLayer({
    //       id: "route",
    //       type: "line",
    //       source: {
    //         type: "geojson",
    //         data: {
    //           type: "Feature",
    //           properties: {},
    //           geometry: {
    //             type: "LineString",
    //             coordinates: geojson,
    //           },
    //         },
    //       },
    //       layout: {
    //         "line-join": "round",
    //         "line-cap": "round",
    //       },
    //       paint: {
    //         "line-color": "#3887be",
    //         "line-width": 40,
    //         "line-opacity": 0.75,
    //       },
    //     });
    //});
    // this.map.on("load", () => {
    //   // make an initial directions request that
    //   // starts and ends at the same location
    //   // Add starting point to the map
    //   this.map.addLayer({
    //     id: "point",
    //     type: "circle",
    //     source: {
    //       type: "geojson",
    //       data: {
    //         type: "FeatureCollection",
    //         features: [
    //           {
    //             type: "Feature",
    //             properties: {},
    //             geometry: {
    //               type: "Point",
    //               coordinates: Coords.startCoords,
    //             },
    //           },
    //         ],
    //       },
    //     },
    //     paint: {
    //       "circle-radius": 160,
    //       "circle-color": "#3887be",
    //     },
    //   });
    //   this.map.addLayer({
    //     id: "end",
    //     type: "circle",
    //     source: {
    //       type: "geojson",
    //       data: {
    //         type: "FeatureCollection",
    //         features: [
    //           {
    //             type: "Feature",
    //             properties: {},
    //             geometry: {
    //               type: "Point",
    //               coordinates: Coords.endCoords,
    //             },
    //           },
    //         ],
    //       },
    //     },
    //     paint: {
    //       "circle-radius": 10,
    //       "circle-color": "#f30",
    //     },
    //   });
    //   // this is where the code from the next step will go
    // });
  },
  computed: {
    ...mapGetters("CurrentReservation", ["reservation"]),
  },
};
</script>

<style>
.mgl-map-wrapper {
  width: 750px;
  height: 750px;
}
.mgl-map-wrapper,
.mapboxgl-map {
  border-radius: 10px;
}
/*Mobile breakpoints*/
@media only screen and (max-width: 768px) {
  .mgl-map-wrapper {
    top: 0;
    bottom: 0;
    width: 100%;
  }
}
</style>
