<template>
    
  <section class="section is-large">
    <div class="container">
      <div class="columns is-centered">
        <div class="column  is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Reset wachtwoord</p>
            </header>
            <div class="card-content">
              <b-field label="Email" :message="errors.email">
                <b-input type="email" v-model="user.email" ></b-input>
              </b-field>
              <b-field label="Wachtwoord" :message="errors.password">
                <b-input type="password" v-model="user.password" password-reveal>></b-input>
              </b-field>
              <b-field label="Bevestig wachtwoord">
                <b-input type="password" v-model="user.password_confirmation" password-reveal>></b-input>
              </b-field>        
              <b-button @click.prevent="resetPassword" :expanded="true" type="is-danger">Bevestig</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    
</template>

<script>
import User from '../../Api/User'
    export default {
        name: "resetPassword",
        data() {
            return {
                user: {
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                errors: []
            }
        },
        mounted() {
          if(this.$route.query.token == undefined){
            this.$router.push({'name': "Login"})
          }
        },
        methods: {
            resetPassword() {
                     const token = this.$route.query.token;               
                User.resetPassword({
                    "email" : this.user.email,
                    "token" : token,
                    "password" : this.user.password,
                    "password_confirmation" : this.user.password_confirmation
                })
                .then(response => {
                    console.log(response)
                        this.$buefy.toast.open({
                            message: 'Wachtwoord successvol veranderd',
                            type: 'is-success'
                        })
                        this.$router.push({'name': 'Login'})
                })
                .catch(error => {
                    console.log(error)
                    if(error.response.status === 422) {
                       this.errors = error.response.data.errors
                    }
                    else if(error.response.status === 500){
                      if(error.response.data.response == "passwords.user" || error.response.data.response == "passwords.token" ){
                        this.$buefy.toast.open({
                            message: 'Resetten van wachtwoord mislukt',
                            type: 'is-danger'
                        })
                        this.errors = [];

                      }
                    }

                })
            }
        }
    }
</script>

<style scoped>
.card-header-title{
  justify-content: center;
}
</style>