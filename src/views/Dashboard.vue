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
        </section>

    </div>
</template>

<script>
    import User from '../Api/User'
    import EditUser from '../components/auth/EditUser.vue'
    import EditPassword from '../components/auth/EditPassword'
    export default {
        name: 'Dashboard',
        data() {
            return {
                user: null
            }
        },
        components: {
            EditUser,
            EditPassword
        },
        mounted() {
            User.auth().then(response => {
                console.log(response.data)
                this.user = response.data;
            })



        },
        methods: {
            edit(){
                User.edit().then(response => {
                    console.log(response);
                })
            }
        }
    }
</script>

<style scoped>
    h3 {
        text-align: center;
    }
</style>