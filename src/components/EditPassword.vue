<template>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="card">
            <div class="card-content">
                <b-field v-bind:expanded=true label="Huidige Wachtwoord" :message="errors.oldPassword">
                  <b-input v-model="editedPassword.oldPassword" type="password" :disabled="formIsDisabled" password-reveal></b-input>
                </b-field>
                <b-field v-bind:expanded=true label="Nieuwe Wachtwoord" :message="errors.password" >
                  <b-input v-model="editedPassword.password"  type="password" :disabled="formIsDisabled" password-reveal></b-input>
                </b-field>               
              <b-field label="Bevestig wachtwoord">
                <b-input v-model="editedPassword.password_confirmation" type="password" :disabled="formIsDisabled" password-reveal></b-input>
              </b-field>
              <div class="buttons">
                <b-button @click.prevent="changePassword" type="is-danger"> {{buttonText}} </b-button>
                <b-button @click.prevent="cancel" type="is-danger" v-if="!formIsDisabled"> Annuleer </b-button>
              </div>
            </div>
         </div>
        <b-notification
            auto-close type="is-success"
            v-model="isActive"
            aria-close-label="Close notification">
            Je wachtwoord is bijgewerkt
        </b-notification>
        </div>

      </div>
    </div>
</template>

<script>
    import User from '../Api/User'

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
                isActive: false
            }
        },
        mounted() {

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
                        this.isActive = true
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