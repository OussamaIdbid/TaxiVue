<template>
    <div>
        <section class="section is-large">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-half">
                    <b-skeleton v-if="isLoading" width="100%" animated=true></b-skeleton>

                    <b-notification 
                        type="is-danger"
                         closable="false">
                        <b-skeleton v-if="isLoading" width="100%" animated=true></b-skeleton>

                        <p v-if="!isLoading">{{response.message}}</p> 
                    </b-notification>
 
                    </div>
                    <div class="column is-one-third ">
                        <b-button type="is-danger" size="is-medium" @click="toLogin" outlined>Naar login</b-button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import User from "../Api/User"
    export default {
        name: "verifyEmail",
        data() {
            return {
                response: [],
                isLoading: true
            }
        },
        methods: {
            toLogin() {
                this.$router.push({name: "Login"})
            }
        },
        mounted () {
            window.scrollTo(0, 0)
                User.verifyEmail(this.$route.query).then(response => {
                    this.response = response.data;
                }).then(this.isLoading = false)
            },
        created() {

        }
    }
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