<template>
<div id="app">
  <v-app id="inspire">
    <v-card
      color="red lighten-2"
      dark
    >

      <v-card-text>
        Explore hundreds of free API's ready for consumption! For more information visit
        <a
          class="grey--text text--lighten-3"
          href="https://github.com/toddmotto/public-apis"
          target="_blank"
        >the Github repository</a>.
      </v-card-text>
      <v-card-text>
        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          color="white"
          hide-no-data
          hide-selected
          item-text="Description"
          item-value="API"
          label="Public APIs"
          placeholder="Start typing to Search"
          prepend-icon="mdi-database-search"
          return-object
        ></v-autocomplete>
      </v-card-text>


        <v-list v-if="model" class="red lighten-3">
          <v-list-item
            v-for="(entry, i) in entries"
            :key="i"
          >

          </v-list-item>
        </v-list>

      <v-card-text>
        <v-autocomplete
          v-model="model1"
          :items="items1"
          :loading="isLoading1"
          :search-input.sync="search1"
          color="white"
          hide-no-data
          hide-selected
          item-text="Description"
          item-value="API"
          label="Public APIs"
          placeholder="Start typing to Search"
          prepend-icon="mdi-database-search"
 
        ></v-autocomplete>
      </v-card-text>

      <v-expand-transition>
        <v-list v-if="model" class="red lighten-3">
          <v-list-item
            v-for="(entry, i) in entries"
            :key="i"
          >

          </v-list-item>
        </v-list>
      </v-expand-transition>

    </v-card>
  </v-app>
</div>
</template>

<script>
import axios from 'axios'
  export default {
    props: {
      source: String,
    },
  

  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    APIKEY: '4L8Nsl9VR_O3VV-MxXIlujMALfBGteJLT-6q25X4VuI'
  }),
created(){
             this.platform =  new H.service.Platform({
                
          "apiKey": this.APIKEY
        });
        this.service = this.platform.getSearchService();
        this.router = this.platform.getRoutingService();
},
  computed: {

    items () {
        var addresses = []
         for (let index = 0; index < this.entries.length; index++) {
                      if (this.entries[index].includes("Nederland")) {
                          addresses.push(this.entries[index]);
                          console.log(addresses)
                          


                      }
                  }
      return addresses

        
      
    },
  },

  watch: {
    search (val) {
      // Items have already been loaded
      //if (this.items.length > 0) return

      // Items have already been requested
     //if (this.isLoading) return

      //this.isLoading = true

        axios.get('https://places.ls.hereapi.com/places/v1/suggest', {
          params: {
            at: "52.5159,13.3777",
            q: val,
            apikey: this.APIKEY,
      }
    })
    .then(Response => {
          
          //console.log(Response.data.suggestions)
          this.entries = Response.data.suggestions
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))

    },
  },
}
</script>