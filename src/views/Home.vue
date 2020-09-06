<template>
<div>
    <Section1 @clicked='onChildClick' />
    <Section3 />
</div>
</template>

<script>
import Section1 from '../components/Sections/Section1'
import Section3 from '../components/Sections/Section3'
export default {
    name: 'Home',
    components: {
        Section1,
        Section3
    },
    data () {
        return {
        returnedData: [],
        clicked: false
        }
  },
    mounted () {
        window.scrollTo(0, 0)

    },
  methods: {
      onChildClick(value) {
          this.returnedData = value[0]
          console.log(this.returnedData)

          this.$emit('clicked', value)
      }
  },
    
}
</script>

<style scoped>

</style>