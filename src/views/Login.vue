<template>
  <section class="section is-medium">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-one-third">
          <div class="card">
            <div class="card-content">
              <b-field label="Email" :message="errors.email">
                <b-input type="email" v-model="form.email"></b-input>
              </b-field>
              <b-field label="Wachtwoord" :message="errors.password">
                <b-input
                  v-model="form.password"
                  type="password"
                  password-reveal
                ></b-input>
              </b-field>
              <router-link class="is-size-7" :to="{ path: '/forgot-password' }"
                >Wachtwoord vergeten?</router-link
              >
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <b-button @click.prevent="login" :expanded="true" type="is-danger"
            >Log in</b-button
          >
        </div>

        <div class="column is-one-third">
          <div class="is-divider" data-content="Of"></div>
          <b-button
            tag="router-link"
            to="/register"
            type="is-link is-danger"
            :expanded="true"
            >Maak een account aan</b-button
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from "vuex";

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
      verificationMessage: "",
    };
  },
  mounted() {
    window.scrollTo(0, 0);
    console.log(this.$route.query.redirect);
  },
  methods: {
    ...mapActions(["signIn"]),
    login() {
      this.signIn(this.form)
        .then((response) => {
          if (response.isFulfilled == true) {
            if (response.response.verified == "false") {
              // console.log(response.data.message);
              this.verificationMessage = response.response.message;
              this.$buefy.toast.open({
                message: this.verificationMessage,
                type: "is-info",
              });
            } else {
              this.$buefy.toast.open({
                message: "Ingelogd",
                type: "is-success",
              });
              if (this.$route.query.redirect == "FareCalculationResult") {
                this.$router.push({ name: "FareCalculationResult" });
              } else {
                this.$router.push({ name: "Dashboard" });
              }
            }
          }
        })
        .catch((error) => {
          if (error.isFulfilled == false) {
            console.log(error);
            if (error.error.response.status === 422) {
              console.log(error.error.response.data.errors);
              this.errors = error.error.response.data.errors;
            }
          }

          console.log(error);
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
.is-divider,
.is-divider-vertical {
  border-top: 0.1rem solid black;
}
.card-header-title {
  justify-content: center;
}
@media only screen and (max-width: 768px) {
  .container {
    padding: 0 !important;
  }
  .container > .columns > .column:first-of-type {
    padding: 0;
  }
}
</style>
