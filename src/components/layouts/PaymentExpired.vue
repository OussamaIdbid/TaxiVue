<template>
    <div>
        <section class="section is-large">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-one-third">
                        Betaling is niet geldig     
                    </div>
                    <div class="column is-one-third ">
                        <b-button type="is-danger" size="is-medium" @click="toHome" outlined>Terug naar Home</b-button>
                    </div>
                </div>
            </div>

        </section>
    </div>
</template>

<script>
    export default {
        name: "NotFound",
        methods: {
            toHome() {
                this.$router.push({name: "Home"})
            }
    },
    mounted () {
        window.scrollTo(0, 0)
        },

    }
</script>

<style scoped>
    .column {
        text-align: center;
        color: #f14668;
        font-size: xx-large;
    }
    .columns {
        flex-direction: column;
        align-items: center;

    }
</style>
