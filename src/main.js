import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import axios from "axios";

Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

api.interceptors.response.use(undefined, (error) => {
  // Suppress the error message and throw a new error with a custom message
  throw new Error('An error occurred while processing the request.');
});

export default api;


new Vue({
  router,
  store,
  vuetify,
  axios,
  api,
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
