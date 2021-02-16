<template>
  <div id="main">
    <HereMap
      :center="center"
      v-bind:startLocation="this.startLocation"
      v-bind:endLocation="this.endLocation"
    />
    <b-field label="start location">
      <b-input v-model="startInput"></b-input>
    </b-field>
    <b-field label="end location">
      <b-input v-model="endInput"></b-input>
    </b-field>
    <b-button @click="changeRoute">Click Me</b-button>
  </div>
</template>

<script>
import HereMap from "../HereAPI/HereMap";
export default {
  components: {
    HereMap,
  },
  data() {
    return {
      center: {
        lat: 52.516,
        lng: 13.3779,
      },
      startInput: '',
      endInput: '',
      startLocation: "40.730610,-73.935242",
      endLocation: "50.730610,-73.935242",
    };
  },
  methods: {
      changeRoute(){
          this.startLocation = this.startInput
          this.endLocation = this.endInput
          alert('hello')
      }
  }
};
</script>

<style scoped>
#main {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>