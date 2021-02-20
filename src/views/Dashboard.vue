<template>
  <div>
    <section class="section is-medium">
      <div class="columns is-centered">
        <div class="column is-half">
          <h3 class="is-size-3"><strong>Account overzicht</strong></h3>
        </div>
      </div>
      <EditUser />
      <EditPassword />
      <!--<ReservationsTable />-->
    </section>
  </div>
</template>

<script>
import User from "../Api/User";
import EditUser from "../components/auth/EditUser.vue";
import EditPassword from "../components/auth/EditPassword";
//import ReservationsTable from '../components/auth/ReservationsTable.vue'
export default {
  name: "Dashboard",
  data() {
    return {
      user: null,
    };
  },
  components: {
    EditUser,
    EditPassword,
    //ReservationsTable
  },
  mounted() {
    User.auth().then((response) => {
      console.log(response.data);
      this.user = response.data;
    });
  },
  methods: {
    edit() {
      User.edit().then((response) => {
        console.log(response);
      });
    },
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
}
/*Mobile breakpoints*/
@media only screen and (max-width: 768px) {
    .section,.container {
        padding: 0 !important;
    }
}
</style>