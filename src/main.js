import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import axios from "axios";

Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://44.198.193.74:8000";


new Vue({
  router,
  store,
  vuetify,
  axios,
  render: (h) => h(App),
}).$mount("#app");

if(!store.state.isAuthenticated){
  /*Hamburger Menu Click*/
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links li");

  hamburger.addEventListener("click", () => {
    //Animate Links
    navLinks.classList.toggle("open");
    links.forEach((link) => {
      link.classList.toggle("fade");
    });

    //Hamburger Animation
    hamburger.classList.toggle("toggle");
  });

  // navbar animation
  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      links.forEach(link => {
        link.classList.remove("fade");
      });
      hamburger.classList.remove("toggle");
    });
  });
}
