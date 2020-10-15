<template>
  <div>
    <section class="section is-large">
      <div class="container">
        <div class="columns is-centered"></div>
      </div>
    </section>
  </div>
</template>

<script>
import User from "../../Api/User";
export default {
  name: "verifyEmail",
  data() {
    return {
      response: [],
      isLoading: true,
    };
  },
  methods: {
    toLogin() {
      this.$router.push({ name: "Login" });
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    User.verifyEmail(this.$route.query).then((response) => {
      this.response = response.data;
      this.$buefy.toast.open({
        message: this.response.message,
        type: "is-success",
      });
      this.$router.push({ name: "Login" });
    });
  },
  created() {},
};
</script>

<style scoped>
.column {
  text-align: center;
  color: #f14668;
}
.columns {
  flex-direction: column;
  align-items: center;
}
.notification > .delete {
  right: 0.5rem;
  position: absolute;
  top: 0.5rem;
  display: none;
}
</style>