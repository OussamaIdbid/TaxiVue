<template>
  <div id="map">
    <div
      id="mapContainer"
      style="width: 100vw; height: 100vh"
      ref="hereMap"
    ></div>
  </div>
</template>

<script>
import { HereApiKey } from "../../variables.js";

export default {
  name: "HereMap",
  props: {
    center: Object,
    startLocation: String,
    endLocation: String,
  },
  data() {
    return {
      platform: null,
      apikey: HereApiKey,
      map: null,
      ui: null,
    };
  },
  async mounted() {
    const platform = new window.H.service.Platform({
      apikey: this.apikey,
    });
    this.platform = platform;
    this.initializeHereMap();
    this.calculateRouteFromAtoB(this.platform);
  },
  methods: {
    initializeHereMap() {
      // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      this.map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 11,
        center: this.center,
        // center object { lat: 40.730610, lng: -73.935242 }
      });

      addEventListener("resize", () => this.map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

      // add UI
      this.ui = H.ui.UI.createDefault(this.map, maptypes);
      this.ui.getControl('zoom').setVisibility(false)
      this.ui.getControl('scalebar').setVisibility(false)
      this.ui.getControl('mapsettings').setVisibility(false)
      console.log(this.ui.getControl())
      // End rendering the initial map
    },
    calculateRouteFromAtoB(platform) {
      var router = platform.getRoutingService(null, 8),
        routeRequestParams = {
          routingMode: "fast",
          transportMode: "car",
          origin: this.startLocation,
          destination: this.endLocation,
          return:
            "polyline,turnByTurnActions,actions,instructions,travelSummary",
        };

      router.calculateRoute(routeRequestParams, this.onSuccess, this.onError);
    },
    onSuccess(result) {
      let route = result.routes[0];
      this.addRouteShapeToMap(route);
      this.addManueversToMap(route);
    },
    onError(error) {
      alert("Can't reach the remote server " + error);
    },
    addRouteShapeToMap(route) {
      route.sections.forEach((section) => {
        // decode LineString from the flexible polyline
        let linestring = H.geo.LineString.fromFlexiblePolyline(
          section.polyline
        );

        // Create a polyline to display the route:
        let polyline = new H.map.Polyline(linestring, {
          style: {
            lineWidth: 7,
            strokeColor: "#f14668",
          },
        });

        // Add the polyline to the map
        this.map.addObject(polyline);
        // And zoom to its bounding rectangle
        this.map.getViewModel().setLookAtData({
          bounds: polyline.getBoundingBox(),
          zoom: 11
        });
      });
    },
    /**
     * Creates a series of H.map.Marker points from the route and adds them to the map.
     * @param {Object} route  A route as received from the H.service.RoutingService
     */
    addManueversToMap(route) {
      var svgMarkup =
          '<svg width="18" height="18" ' +
          'xmlns="http://www.w3.org/2000/svg">' +
          '<circle cx="8" cy="8" r="8" ' +
          'fill="#f14668" stroke="white" stroke-width="1"  />' +
          "</svg>",
        dotIcon = new H.map.Icon(svgMarkup, { anchor: { x: 8, y: 8 } }),
        group = new H.map.Group();

      route.sections.forEach((section) => {
        let poly = H.geo.LineString.fromFlexiblePolyline(
          section.polyline
        ).getLatLngAltArray();

        let actions = section.actions;

        let firstAction = actions[0];
        let firstMarker = new H.map.Marker(
          {
            lat: poly[firstAction.offset * 3],
            lng: poly[firstAction.offset * 3 + 1],
          },
          { icon: dotIcon }
        );
        firstMarker.instruction = firstAction.instruction;
        group.addObject(firstMarker);

        let lastAction = actions[actions.length - 1];
        let lastMarker = new H.map.Marker(
          {
            lat: poly[lastAction.offset * 3],
            lng: poly[lastAction.offset * 3 + 1],
          },
          { icon: dotIcon }
        );
        lastMarker.instruction = lastAction.instruction;
        group.addObject(lastMarker);

        // Add the maneuvers group to the map
        this.map.addObject(group);
      });
    },
  },
};
</script>

<style scoped>
#map {
  width: 60vw;
  min-width: 360px;
  text-align: center;
  margin: 0;
  background-color: #ccc;
}
html,
body {
  height: 100%;
}
.H_l_right .H_l_vertical .H_ctl{
  display: none !important;
}

</style>