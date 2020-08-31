<template>
<div>
        <b-navbar fixed-top>
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                         <b-icon type="is-danger"
                icon="taxi" size="is-medium">
                
            </b-icon>
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item v-if="!isLoggedIn" tag="router-link" :to="{ path: '/login' }" >
                Login
            </b-navbar-item>
             <b-navbar-item v-if="!isLoggedIn" tag="router-link" :to="{ path: '/register' }" >
                register
            </b-navbar-item>
            <b-navbar-item v-if="isLoggedIn" tag="router-link" :to="{ path: '/dashboard' }" >
                dashboard
            </b-navbar-item>
            <b-navbar-item v-if="isLoggedIn" @click.prevent="logout">
              Log out
            </b-navbar-item>

        </template>
      
        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <b-button type="is-danger" icon-left="phone" href="tel:0202101903" >

                        020 - 2101903 Amsterdam
                    </b-button>
                    <b-button type="is-danger" icon-left="phone" href="tel:0362340021" onclick="return gtag_report_conversion('tel:0362340021');"  >
                         036 - 2340021 Almere
                    </b-button>
                </div>
                
            </b-navbar-item>
            
        </template>
            
    </b-navbar>

    </div>
</template>

<script>
import User from "../../Api/User"
export default {
    name: 'Navbar',
    data() {
      return{
         active: false,
         isLoggedIn: false
      } 
      

    },
    mounted() {
      this.$root.$on("login", () =>{
        this.isLoggedIn = true;
      })
      this.isLoggedIn = !!localStorage.getItem("auth");
    },
    methods: {
      logout() {
        User.logout().then(() => {
          this.isLoggedIn = false;
          localStorage.removeItem("auth");
          this.$router.push({name: 'Home'})
        })
      }
    }
}
</script>

<style scoped>


</style>