<template>
      <section class="section" data-aos="fade-up" id="section_3">
    <div class="columns is-centered" id="section_3_columns">
      <div class="column is-one-third">
        <h3 class="is-size-3"><strong>Over ons</strong></h3>
            <p>
Bent u op zoek naar een betrouwbare en betaalbare taxi in Amsterdam, Amsterdam-Noord, Amsterdam-Zuid, Amsterdam-West of Amsterdam-Oost? Dan bent u bij Lage landen taxi service aan het juiste adres! Onze ervaren en vakbekwame chauffeurs zullen u altijd vriendelijk te woord staan, de deur voor u openen en u van goede service voorzien. <br> <br> Ook voor een taxi naar Amsterdam Schiphol Airport bent u bij deze taxicentrale aan het juiste adres. Lage landen taxi is uw taxibedrijf in Amsterdam/Almere en omgeving voor al uw privévervoer of luchthavenservice.
            </p>
        
        <b-collapse animation="slide" :open="false" position="is-bottom" aria-id="contentIdForA11y1">
            <a slot="trigger" slot-scope="props" aria-controls="contentIdForA11y1">
                <b-icon  :icon="!props.open ? 'menu-down' : 'menu-up'" ></b-icon>
                {{ !props.open ? 'Lees meer' : 'Lees minder' }}
            </a>
            <p>
 Het luxe wagenpark van Lage Landen Taxi Service beschikt over goed uitgeruste taxi’s met nette en professionele chauffeurs. Wij verzorgen al uw taxivervoer uw zakelijk vervoer en van en naar Schiphol. <br><br>Ook zijn we te vinden in: Oostzaan, Zaandam, Koog aan de Zaan, Zaandijk, Wormerveer, Krommenie, Westzaan, Assendelft, Wormer en Hoofddorp
            </p>
        </b-collapse>
    </div> 
      <div class="column is is-one-third has-text-danger" id="section-3-icon-container">
        <i id="section_3_icon" class="fas fa-address-card"></i>
      </div>
    </div>

  </section>
</template>

<script>
export default {
    name: 'Section3'    
}
</script>

<style scoped>
p {
  text-align: justify;
}
</style>