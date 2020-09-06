<template>
    
  <section class="section is-large">
    <div class="container">
      <div class="columns is-centered">
        <div class="column  is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Wachtwoord vergeten</p>
            </header>
            <div class="card-content">
              <b-field label="Email" :message="errors.email" >
                <b-input type="email" v-model="email">></b-input>
              </b-field>
              <b-button @click.prevent="sendEmail" :expanded="true" type="is-danger">Stuur email</b-button>
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
        name: "forgotPassword",
        data() {
            return {
                email: '',
                errors: []
            }
        },
        methods: {
            sendEmail() {
                User.forgotPassword({
                    "email" : this.email
                })
                .then(response => {
                    console.log(response)
                        this.$buefy.toast.open({
                            message: 'Wachtwoord reset email verstuurd',
                            type: 'is-success'
                        })
                        
                    this.errors = [];
                    this.$router.push({'name' : 'Login'})
                
                })
                .catch(error => {
                    console.log(error)

                    if (error.response.status === 500) {
                        if(error.response.data.response == "passwords.throttled"){
                            this.$buefy.toast.open({
                                message: 'je hebt te vaak een email opgevraagd. wacht een minuut met het opvragen',
                                type: 'is-danger'
                            })
                        }
                        else if(error.response.data.response == "passwords.user") {
                                this.$buefy.toast.open({
                                message: 'Het versturen van de mail is mislukt',
                                type: 'is-danger'
                            })
                        }

                    }
                   else if(error.response.status === 422) {
                       this.errors = error.response.data.errors
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