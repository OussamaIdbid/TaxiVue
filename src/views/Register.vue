<template>
  <section class="section is-medium">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Registreer</p>
            </header>
            <div class="card-content">
              <b-field grouped>
                <b-field :expanded=true label="Voornaam" :message="errors.name">
                  <b-input  type="text" v-model="firstName"></b-input>
                </b-field>
                <b-field :expanded=true label="Achternaam" :message="errors.name">
                  <b-input  type="text" v-model="lastName"></b-input>
                </b-field>               
              </b-field> 
              <b-field label="Email" :message="errors.email">
                <b-input type="email" v-model="form.email"></b-input>
              </b-field>
              <b-field label="Wachtwoord" :message="errors.password">
                <b-input v-model="form.password" type="password"></b-input>
              </b-field>
              <b-field label="Bevestig wachtwoord">
                <b-input v-model="form.password_confirmation" type="password"></b-input>
              </b-field>
              <b-button @click.prevent="register" :expanded=true type="is-danger">Registreer</b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import User from "../Api/User";

export default {
  name: "Register",
  data() {
    return {
      firstName: "",
      lastName: "",
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      error_email: "",
      error_password: "",
      error_password_confirmation: "",
      errors: [],
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    register() {
      this.errors = [];
      this.form.name = this.firstName + " " + this.lastName;
      User.register(this.form)
        .then(() => {
          this.$router.push({ name: "Login" });
            this.$buefy.toast.open({
              message: 'Er is een bevestigingsmail verstuurd naar email: ' + this.form.email,
              type: 'is-success'
            })          
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
            this.error_email = error.response.data.errors.email[0];
            this.error_password = error.response.data.errors.password[0];
            this.error_password_confirmation =
              error.response.data.errors.password[1];
                        }
        });
    },
  },
};
</script>

<style scoped>
.card-header-title{
  justify-content: center;
}
</style>