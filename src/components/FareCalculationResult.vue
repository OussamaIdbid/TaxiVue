<template>
    <section class="section is-family-primary" id="section-results">
  <div class="container">
    <div class="columns is-centered" id="column-container">

      <div class="column is-half is-centered">
          <img id='map-img' :src=" map_url"> 

      </div>
      <div class="column is-one-third is-centered">
        <div id="results-tile" class="tile is-parent has-background-white rounded-container">
          <div class="content">
            <p class="title is-size-6">Details</p>

            <div class="content">
              <div id="route-wrapper">
                <div id="start-address-container">
                  <p id="start-address-text">Van:</p>
                  <p id="start-address">{{startAddress}}</p>
                </div>
                <div id="end-address-container">
                  <p id="end-address-text">Naar:</p>
                  <p id="end-address">{{endAddress}} </p>
                </div>  
              </div>
              <div id="details-wrapper">
                <div id='km-container'>
                  <p id="km-text"> Afstand:</p>
                  <p id="km-amount">{{distance}}km</p>
                </div>
                <div id='min-container'>
                  <p id="min-text">Reistijd:</p>
                  <p id="min-amount">{{traveltime}}</p>
                </div>
              </div>
              <div id="fare-container">
                <p id="fare-text">Ritprijs:</p>   
                <p id="fare-amount">€{{farePrice}}</p>
              </div>             
              <button class="button is-danger is-fullwidth" id='back-home'>Terug naar Home</button>
              
            </div>
          </div>
      
        </div>


     </div>
    </div>
  </div>

</section>
</template>

<script>
import $ from 'jquery'
export default {
    props: {
      map_url: String,
      startAddress: String,
      endAddress: String,
      distance:  String,
      traveltime: String,
      farePrice: String 
    },
    mounted() {
      setTimeout(function(){
        $('.pageloader').removeClass("is-active")
      },3000)
    }
}
</script>

<style scoped>

</style>