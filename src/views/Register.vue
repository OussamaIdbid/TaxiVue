<template>
    <form>
        <div class="form-group">
            <label for="exampleInputEmail1">name</label>
            <input type="text" v-model="form.name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            <span class="text -danger" v-if="errors.name">
                {{errors.name[0]}}
            </span>
        </div>
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
        <div class="form-group">
            <label for="exampleInputPassword1">confirm password</label>
            <input type="password" v-model="form.password_confirmation" class="form-control" id="exampleInputPassword1" placeholder="Password">
            <span class="text -danger" v-if="errors.password_confirmation">
                {{errors.password_confirmation[0]}}
            </span>        
        </div>
        <button type="submit" @click.prevent="register" class="btn btn-primary">Submit</button>
    </form>
</template>

<script>
   import User from "../Api/User";


    export default {
        name: 'Register',
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: ''
                },
                errors: []
            }
        },
        methods: {
            register() {
                    User.register(this.form)
                    .then(() => {
                        this.$router.push({name: "Login"})
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

</style>