<template>
  <section class="section is-family-primary is-large mb-6" id="section_1">
    <FareCalculation />
    <div class="columns is-centered">
      <div class="column is-one-third is-centered" id="reserve-column">
        <button
          id="reserve-button"
          class="bd-tw-button button is-danger has-text-centered is-fullwidth is-rounded is-centered"
          onclick="location.href='#footer'"
        >
          Neem nu contact op
        </button>

        <i class="fas fa-angle-down has-text-white is-centered"></i>
      </div>
    </div>
  </section>
</template>

<script>
import FareCalculation from "../FareCalculation";
export default {
  name: "Section1",
  components: {
    FareCalculation,
  },
  methods: {

  },
};
</script>
<style lang="stylus" scoped></style>
