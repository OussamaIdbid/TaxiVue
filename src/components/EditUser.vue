<template>
    <div class="container">
      <div class="columns is-centered">
        <div class="column  is-half">
          <div class="card">
            <div class="card-content">
                <b-field grouped>
                <b-field v-bind:expanded=true label="Voornaam" :message="errors.name" >
                  <b-input  v-model="firstName" type="text" :disabled="formIsDisabled"></b-input>
                </b-field>
                <b-field v-bind:expanded=true label="Achternaam" :message="errors.name" >
                  <b-input v-model="lastName"  type="text" :disabled="formIsDisabled"></b-input>
                </b-field>               
              </b-field> 
              <b-field label="Email" :message="errors.email">
                <b-input v-model="user.email" type="email" :disabled="formIsDisabled" ></b-input>
              </b-field>
              <div class="buttons">
                <b-button @click.prevent="edit" type="is-danger"> {{buttonText}} </b-button>
                <b-button @click.prevent="cancel" type="is-danger" v-if="!formIsDisabled"> Annuleer </b-button>
              </div>

            
           </div>
         </div>
        <b-notification
            auto-close type="is-success"
            v-model="isActive"
            aria-close-label="Close notification">
            Je gegevens zijn bijgewerkt
        </b-notification>
        </div>
      </div>
      

    </div>
</template>

<script>
    import User from '../Api/User'

    export default {
        name: "EditUser",  
        data() {
            return {
                user: null,
                firstName: '',
                lastName: '',
                editedUser: null,
                errors: [],
                formIsDisabled: true,
                buttonText: 'Bewerk gegevens',
                isActive: false
            }
        },

        mounted() {
            User.auth().then(response => {
                console.log(response.data)
                this.user = response.data;
                var name = this.user.name.split(" ");

                this.firstName = name[0];
                this.lastName = name[1]
            })

        },
        methods: {
            edit(){

                if(this.formIsDisabled){
                    this.formIsDisabled = false
                    this.buttonText = "Bevestig gegevens"
                }
                else{
                    this.editedUser = {
                        name: this.firstName + " " + this.lastName,
                        email: this.user.email
                    }

                    User.update(this.editedUser)
                    .then(response => {
                        console.log(response)
                        this.user = this.editedUser
                        this.isActive = true
                        this.formIsDisabled = false
                        this.buttonText = "Bewerk gegevens"
                        this.errors = []


                    })
                    .catch((error) => {
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors;
                        }
                    })                    
                    }

            },

            cancel() {
                User.auth().then(response => {
                    this.user = response.data;
                    var name = this.user.name.split(" ");

                    this.firstName = name[0];
                    this.lastName = name[1]
                    this.formIsDisabled = true
                    this.buttonText = "Bewerk gegevens"
                    this.errors = []

                })
            }
        }
        
    }
</script>

<style scoped>
        article {
        margin-top: 1rem !important;
    }
</style>