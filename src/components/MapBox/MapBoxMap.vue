<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

export default {
  name: "MapBoxMap",

  data() {
    return {
      map: null,
      token:
        "pk.eyJ1Ijoib2lkYmlkIiwiYSI6ImNrZGJ0c29kMDAzdnQyc3FxcGRlaHR0aXEifQ.MLtBfQB6Hctj-y3FDuuckg",
    };
  },
  mounted() {
    mapboxgl.accessToken = this.token;
    this.map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v11", // style URL
    });

    addEventListener("resize", () => this.map.resize());
  },
};
</script>

<style scoped>
#map {
  width: 750px;
  height: 750px;
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
