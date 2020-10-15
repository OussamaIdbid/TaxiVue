<template>
<div class="container">
      <div class="columns is-centered">
        <div class="column is-three-quarters">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Reserveringen</p>
            </header>
            <div class="card-content">
                <b-table
                :data="data"
                :bordered="isBordered"
                :striped="isStriped"
                :narrowed="isNarrowed"
                :hoverable="isHoverable"
                :loading="isLoading"
                :focusable="isFocusable"
                :mobile-cards="hasMobileCards"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page="currentPage"
                :pagination-simple="isPaginationSimple"
                
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page">
                

                <b-table-column v-bind="reservationID" label="Van" width="40" numeric v-slot="props">
                    {{ props.row.start_address }}
                </b-table-column>

                <b-table-column field="start_address" label="Naar" v-slot="props">
                    {{ props.row.end_address }}
                </b-table-column>

                <b-table-column field="end_address" label="Prijs" v-slot="props">
                    €{{ props.row.fare_price }}
                </b-table-column>
                <b-table-column field="view" label="" v-slot="props" >
                    <span type='button' class="tag is-success" @click="reservationID = props.row.id , isComponentModalActive = true">
                        Bekijk
                    </span>          
                </b-table-column>

        </b-table>
            </div>
         </div>
        </div>

      </div>

      <b-modal 
            v-model="isComponentModalActive"

            trap-focus
            full-screen
            :destroy-on-hide="true"
            aria-role="dialog"
            aria-modal>
            <template>
                <reservations-info v-bind:OrderID='reservationID'  ></reservations-info>
            </template>
        </b-modal>
    </div>
</template>

<script>
    import Reservations from '../../Api/Reservation';
    import User from '../../Api/User'
    import ReservationsInfo from '../payment/OrderSummary'

    export default {
        name: "ReservationsTable",
        data() {
            return {
                data: [],
                isEmpty: false,
                isBordered: false,
                isStriped: false,
                isNarrowed: false,
                isHoverable: true,
                isFocusable: false,
                isLoading: true,
                hasMobileCards: false,
                isComponentModalActive: false,
                reservationID: null,
                isPaginated: true,
                isPaginationSimple: true,
                currentPage: 1,
                perPage: 5
            }
        },
        components: {
            ReservationsInfo
        },
        methods: {
            reservationInfo(Id) {
                Reservations.getReservation(Id)
                .then(response => {
                    console.log(response);
                })

                
            }
        },
        mounted() {        
            
            User.auth()
            .then(response => {               
                if(response.data.user_type == 2){
                    Reservations.getAllReservations()
                    .then(response => {
                        this.data = response.data
                    })
                }
                else {
                    Reservations.getReservations()
                    .then(response => {
                        console.log(response);
                        this.data = response.data
                        this.isLoading = false
                    })
                }
            })

        }
    }
</script>

<style scoped>
    .card-content{
        padding: 0 !important;
    }
</style>