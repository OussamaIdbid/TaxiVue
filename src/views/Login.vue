<template>

    <section class="section is-large">
        <div class="container">
            <div class="columns is-centered is-half">
                <div class="column is-half">
                    <b-field label="Email">
                        

                            <b-input type="email"  v-model="form.email"></b-input>

                    </b-field>
                        
                    <b-field label="Password">
                        

                            <b-input v-model="form.password" type="password" password-reveal></b-input>

                     </b-field>
                    <b-button @click.prevent="login" expanded=true type="is-danger">Log in</b-button>  
                </div>
                <div class="is-divider" data-content="NIEUWE KLANT"></div>
                    <div class="column is-half">
                        <b-button tag="router-link" to="/register" type="is-link is-danger" expanded=true >Maak een account aan</b-button>  
                    </div>
            </div>

        </div>
    </section>
    <!-- <form>
        <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input type="email" v-model="form.email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            <span class="text -danger" v-if="errors.email">
                {{errors.email[0]}}
            </span>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" v-model="form.password" class="form-control" id="exampleInputPassword1" placeholder="Password">
            <span class="text -danger" v-if="errors.password">
                {{errors.password[0]}}
            </span>
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button @click.prevent="login" class="btn btn-primary">Submit</button>
    </form> -->
</template>

<script>
   import User from "../Api/User";

    export default {
        name: 'Login',
        data() {
            return {
                form: {
                    email: '',
                    password: ''
                },
                errors: [

                ]
            }
        },
        methods: {
            login() {
                User.login(this.form).then(() => {
                    this.$root.$emit("login", true)
                    localStorage.setItem("auth", "true");
                    this.$router.push({name: "Dashboard"})
                })
                .catch(error => {
                    if(error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                })
            }
        }
    }
</script>

<style scoped>
.columns {

    flex-direction: column;

}
.column {
    margin-bottom: 2rem;
    align-self: center;
}
.is-divider[data-content]::after {
    background: #f5f5f5;

}
</style>