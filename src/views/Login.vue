<template>
  <section class="section is-large">
    <div class="container">
      <div class="columns is-centered">
        <div class="column  is-one-third">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Log in</p>
            </header>
            <div class="card-content">

              <b-field label="Email" :message="errors.email">
                <b-input type="email" v-model="form.email"></b-input>
              </b-field>
              <b-field label="Wachtwoord" :message="errors.password">
                <b-input v-model="form.password" type="password" password-reveal></b-input>
              </b-field>
              <b-button @click.prevent="login" expanded="true" type="is-danger">Log in</b-button>
            </div>
            <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="true"></b-loading>
          </div>
        </div>

        <div class="column is-one-third">
                  <div class="is-divider" data-content="Of"></div>
          <b-button
            tag="router-link"
            to="/register"
            type="is-link is-danger"
            expanded="true"
          >Maak een account aan</b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import User from "../Api/User";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: [],
      isLoading: false,
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  methods: {
    login() {
      User.login(this.form)
        .then(() => {
          this.$root.$emit("login", true);
          localStorage.setItem("auth", "true");
          this.$router.push({ name: "Dashboard" });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            console.log(error.response.data.errors);
            this.errors = error.response.data.errors;
          }
        });
    },
  },
};
</script>

<style scoped>
.columns {
  flex-direction: column;
}
.column {
  align-self: center;
}
.is-divider[data-content]::after {
  background: #f5f5f5;
  color: black;
}
.is-divider, .is-divider-vertical{
  border-top: .1rem solid black;
}
.card-header-title{
  justify-content: center;
}
</style>