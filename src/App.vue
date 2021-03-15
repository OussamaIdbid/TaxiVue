<template>
  <div id="app">
    <div id="loader" class="pageloader is-danger"><span class="title"></span></div>
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

export default {
  name: "App",
  components: {
    Navbar,

    Footer,

    //Demo
  },
};
</script>

<style>
* {
  font-family: "Roboto", sans-serif;
}
html {
  scroll-behavior: smooth;
  background-color: #fafafa !important;
}
body {
  background-color: #f5f5f5;
  overflow-x: hidden;
}
.Site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}
.step-items {
    width:100% !important;
}
.steps .step-item .step-marker {
    position:initial;
}
.steps .step-item .step-details {
    margin-top:0 !important;

}
.Site-content {
  flex: 1;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Catamaran", sans-serif;
}

.modal-card-head {
  border-bottom: none;
}
.modal-card-body {
  background-color: #f5f5f5 !important;
}
.modal-card-foot {
  border-top: none;
}

.navbar-brand > .navbar-item {
  background-color: unset !important;
}
.navbar-menu > .navbar-start > .navbar-item:hover {
  background-color: unset !important;
  color: rgb(25, 83, 219) !important;
}
.navbar-menu {
  background-color: #f5f5f5;
}
.holder {
  height: 50px;
}

#start-input,
#end-input {
}
#brand-img {
  font-size: 30px;
}
#section_1 {
  background-image: url("./assets/img/KPN_Rijksmuseum_loop.jpg");
  background-repeat: no-repeat;
  margin-bottom: 2rem !important;
  height: 100vh;
}
#section-results {
}
#section_1_heading {
  text-align: center;
}
input,
input:focus,
select:focus,
textarea:focus,
button:focus {
  box-shadow: 0 15px 30px -10px transparent !important;
  border-color: #ededed !important;
}

#section_2 > .columns > .is-one-third,
#section_3 > .columns > .is-one-third {
  text-align: center;
  transition: ease-in-out;
}

#section-3-text {
  text-overflow: clip;
  overflow-y: hidden;
}

#section_2_icon,
#section_3_icon {
  font-size: 150px;
}
#section-2-text,
#section-3-text {
  text-align: justify;
  transition: ease-in-out;
}
#section-2-icon-container,
#section-3-icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
#readmore-icon-3 {
  cursor: pointer;
}

.fa-angle-down,
.fa-angle-up {
  width: 20px !important;
  height: 50px;
}
#column-container {
  flex-direction: row;
}

#km-text,
#min-text {
  font-size: small;
  margin-bottom: 0;
  align-self: center;
}
#start-address,
#end-address {
  font-size: small;
}
#start-address-text,
#end-address-text {
  font-size: small;
  margin-bottom: 0;
  color: grey;
}

#min-amount,
#km-amount,
#fare-amount {
  width: 100%;
  text-align: end;
  font-weight: bold;
}
#details-wrapper > div,
#fare-container {
  display: flex;
}
#details-wrapper,
#route-wrapper {
  margin-bottom: 1rem;
}
#details-wrapper {
  margin-bottom: 0.3rem;
  border-bottom-style: groove;
  border-bottom-width: 1px;
}
.footer {
}

#map {
  width: 500px;
  height: 500px;
}
/*Mobile breakpoints*/
@media only screen and (max-width: 768px) {
  #section_1 > .container {
    margin-top: 3rem;
  }
  #section_1 {
    height: unset;
  }
  #section_3_columns {
    display: flex;
    flex-direction: column-reverse;
  }
  .control {
    flex-direction: column;
  }
  .navbar-item > .field > .control {
    display: flex;
  }

  #almere-tel {
    margin-top: 0.75rem;
  }
  #column-container {
    flex-direction: column;
  }
  #reserve-column {
    visibility: visible;
  }
}
@media only screen and (min-width: 768px) {
  #reserve-column {
    visibility: hidden;
  }
}
#reserve-column {
  display: flex;
  flex-direction: column;
  /* justify-content: center !important; */
  align-items: center;
}
#fare-warning-label {
  visibility: hidden;
}

.control.has-icons-left .icon,
.control.has-icons-right .icon {
  pointer-events: auto !important;
}
.mdi-24px.mdi-set,
.mdi-24px.mdi:before {
  color: #f14668 !important;
}
.svg-inline--fa.fa-w-20 {
  color: #f14668;
}
.help {
  color: #f14668 !important;
}

.navbar,
.navbar-menu {
  background-color: #f5f5f5 !important ;
}
.modal-close {
  background-color: #f14668 !important;
}
</style>
