<template>
  <b-navbar fixed-top>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img src="../../assets/img/TaxiLagelandenLogo.png" alt="" />
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item
        v-if="!authenticated"
        tag="router-link"
        :to="{ path: '/login' }"
      >
        Login
      </b-navbar-item>
      <b-navbar-dropdown label="Mijn account" v-if="authenticated">
        <b-navbar-item
          v-if="authenticated"
          tag="router-link"
          :to="{ path: '/dashboard' }"
        >
          Account details
        </b-navbar-item>
        <b-navbar-item
          v-if="authenticated"
          tag="router-link"
          :to="{ path: '/reservations' }"
        >
          Reserveringen
        </b-navbar-item>
        <b-navbar-item v-if="authenticated" @click.prevent="logout">
          Uitloggen
        </b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <b-button type="is-danger" icon-left="phone" href="tel:0202101903">
            020 - 2101903 Amsterdam
          </b-button>
          <b-button
            type="is-danger"
            icon-left="phone"
            href="tel:0362340021"
            onclick="return gtag_report_conversion('tel:0362340021');"
          >
            036 - 2340021 Almere
          </b-button>
        </div>
      </b-navbar-item>
      <b-loading
        :is-full-page="true"
        v-model="isLoading"
        :can-cancel="true"
      ></b-loading>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      active: false,
      isLoggedIn: false,
      isLoading: false,
    };
  },
  mounted() {

  },
  methods: {
    ...mapActions(["signOut"]),
    
    logout() {
      this.isLoading = true;
      console.log(this.isLoading);
      this.signOut()
        .then((response) => {
          if (response.isFulfilled) {
            this.isLoading = false;
            this.$router.push({ name: "Login" });
          }
        })
        .catch((error) => {
          if (!error.isFulfilled) {
            console.log(error.error);
          }
        });

    },
  },
  computed: {
    ...mapGetters({
      authenticated: "authenticated",
      user: "user",
    }),
  },
};
</script>

<style scoped></style>
