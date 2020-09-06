<template>
    <div>
        <section class="section is-medium">
            <EditUser />
            <EditPassword />
        </section>

    </div>
        <!-- <div class="home col-8 mx-auto py-5 mt-5">
            <h1>Dashboard</h1>
            <div class="card">
                <div class="card-body" v-if="user">
                    <h3>Welcome, {{user.name}}</h3>
                    <span>{{user.email}}</span>

                    <b-button @click="edit">
                        edit
                    </b-button>
                </div>
            </div>
        </div> -->
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

</style>