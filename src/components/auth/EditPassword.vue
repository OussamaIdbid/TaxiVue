<template>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-three-quarters">
          <div class="card">
            <div class="card-content">
                <b-field v-bind:expanded=true label="Huidige Wachtwoord" :message="errors.oldPassword">
                <b-skeleton v-if="isLoading" width="100%" :animated=true></b-skeleton>
                  <b-input v-if="!isLoading" v-model="editedPassword.oldPassword" type="password" :disabled="formIsDisabled" password-reveal></b-input>
                </b-field>
                <b-field v-bind:expanded=true label="Nieuwe Wachtwoord" :message="errors.password" >
                <b-skeleton v-if="isLoading" width="100%" :animated=true></b-skeleton>
                  <b-input v-if="!isLoading" v-model="editedPassword.password"  type="password" :disabled="formIsDisabled" password-reveal></b-input>
                </b-field>               
              <b-field label="Bevestig wachtwoord">
                <b-skeleton v-if="isLoading" width="100%" :animated=true></b-skeleton>
                <b-input v-if="!isLoading" v-model="editedPassword.password_confirmation" type="password" :disabled="formIsDisabled" password-reveal></b-input>
              </b-field>
              <div class="buttons">
                <b-skeleton v-if="isLoading" width="100%" :animated=true></b-skeleton>
                <b-button v-if="!isLoading" @click.prevent="changePassword" type="is-danger"> {{buttonText}} </b-button>
                <b-button @click.prevent="cancel" type="is-danger" v-if="!formIsDisabled"> Annuleer </b-button>
              </div>
                          
            </div>
         </div>
        </div>

      </div>
    </div>
</template>

<script>
    import User from '../../Api/User'

    export default {
        name: "EditPassword",
        data() {
            return {
                user: null,
                editedPassword: {
                    oldPassword: null,
                    password: null,
                    password_confirmation: null
                },
                errors: [],
                formIsDisabled: true,
                buttonText: 'Verander Wachtwoord',
                isLoading: false
            }
        },
        mounted() {
            User.auth().then(response => {
             this.user = response.data;

            }).then(this.isLoading = false)
        },
        methods: {
            changePassword() {
                
                if(this.formIsDisabled){
                    this.formIsDisabled = false
                    this.buttonText = "Bevestig wachtwoord"
                }
                else{
                    User.changePassword(this.editedPassword)
                    .then(() => {
                        this.formIsDisabled = true
                        this.buttonText = "Verander wachtwoord"
                        this.errors = []
                        this.editedPassword = {
                            oldPassword: null,
                            password: null,
                            password_confirmation: null
                        }
                        //this.isActive = true
                        this.$buefy.toast.open({
                            message: 'Je wachtwoord is bijgewerkt',
                            type: 'is-success'
                        })
                    })
                    .catch((error) => {
                    if (error.response.status === 422) {
                            this.errors = error.response.data.errors;                                
                        }
                    })
                }

            },
            cancel() {
                this.formIsDisabled = true
                this.buttonText = "Verander wachtwoord"
                this.errors = []
                this.editedPassword = {
                    oldPassword: null,
                    password: null,
                    password_confirmation: null
                }

            }
        }
    }
</script>

<style scoped>
        article {
        margin-top: 1rem !important;
    }
</style>