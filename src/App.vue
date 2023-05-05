<template>
  <v-app id="app">
    <div class="loading" v-if="!$store.state.isAuthenticated">
      <div class="loader-box">
        <div class="b b1"></div>
        <div class="b b2"></div>
        <div class="b b3"></div>
        <div class="b b4"></div>
      </div>
    </div>
    <v-app-bar
      absolute
      class="loggedIn-nav"
      color="deep-purple accent-3"
      dark
      elevate-on-scroll
      v-if="$store.state.isAuthenticated"
    >
      <v-menu transition="slide-y-transition" v-if="$store.state.isAuthenticated">
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
        </template>
        <v-list class="mt-10" rounded>
          <v-list-item link to="/" color="purple" v-if="$store.state.isAuthenticated">
            <span> <v-icon color="red">mdi-home</v-icon> </span>&nbsp;&nbsp;&nbsp;
            <v-list-item-title v-text="'Home'"></v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/history"
            link
            color="purple"
            v-if="$store.state.isAuthenticated"
          >
            <span> <v-icon color="orange">mdi-history</v-icon> </span>&nbsp;&nbsp;&nbsp;
            <v-list-item-title v-text="'History'"></v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/profile"
            link
            color="purple"
            v-if="$store.state.isAuthenticated"
          >
            <span> <v-icon color="blue">mdi-account</v-icon> </span>&nbsp;&nbsp;&nbsp;
            <v-list-item-title v-text="'Profile'"></v-list-item-title>
          </v-list-item>
          <v-list-item link to="/help" color="purple">
            <span> <v-icon color="green">mdi-help</v-icon> </span>&nbsp;&nbsp;&nbsp;
            <v-list-item-title v-text="'Help'"></v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            color="purple"
            @click="logout"
            v-if="$store.state.isAuthenticated"
          >
            <span> <v-icon color="black">mdi-logout</v-icon> </span>&nbsp;&nbsp;&nbsp;
            <v-list-item-title v-text="'Logout'"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <div class="nav-logo" v-if="$store.state.isAuthenticated">
        <a href="/">
          <img
            src="https://dipeat-s3-bucket-1.s3.amazonaws.com/simple_logo.png"
            alt="dipEAT.com"
          />
        </a>
      </div>

      <v-spacer></v-spacer>

      <!-- sign & login below -->

      <span v-if="!$store.state.isAuthenticated">
        <signUp />
      </span>
      &nbsp;&nbsp;&nbsp;
      <span v-if="!$store.state.isAuthenticated">
        <logIn />
      </span>

      <!--  -->

      <v-btn icon color="red" v-if="$store.state.isAuthenticated" to="/likedshop">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      &nbsp;&nbsp;

      <span link v-if="$store.state.isAuthenticated">
        <h4>{{ $store.state.user.username }}</h4>
      </span>
    </v-app-bar>
    <nav v-else>
      <div class="logo">
        <a href="/">
          <img
            src="https://dipeat-s3-bucket-1.s3.amazonaws.com/simple_logo.png"
            alt="dipEAT.com"
          />
        </a>
      </div>
      <div class="hamburger">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
      <ul class="nav-links">
        <li><a href="#">Intro</a></li>
        <li><a href="partner.dipeat.com">Partner</a></li>
        <li><a href="#about-us">About Us</a></li>
        <li><a href="#top-restaurants">Restaurants</a></li>
        <li>
          <a><logIn /></a>
        </li>
        <li>
          <a><signUp /></a>
        </li>
      </ul>
    </nav>

    <v-sheet>
      <v-main class="mt-13">
        <v-toolbar
          color="deep-purple accent-3"
          class="loggedIn-searchBar"
          dark
          flat
          v-if="$store.state.isAuthenticated"
        >
          <v-row justify="center">
            <v-col sm="6">
              <v-menu rounded="xl" offset-y>
                <template v-slot:activator="{ attrs, on }">
                  <v-text-field
                    v-model="search"
                    v-bind="attrs"
                    v-on="on"
                    class="mx-7 mt-2"
                    flat
                    hide-details
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    solo-inverted
                    @keyup.enter="searchBar()"
                    rounded
                    maxlength="30"
                  >
                  </v-text-field>
                </template>
              </v-menu>
            </v-col>
          </v-row>
        </v-toolbar>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
      <section id="footer" v-if="!$store.state.isAuthenticated">
        <div class="main-footer">
          <div class="logoinfo" data-aos="fade-up">
            <div class="logo">
              <a href="/">
                <img
                  src="https://dipeat-s3-bucket-1.s3.amazonaws.com/simple_logo.png"
                  alt="dipEAT.com"
                />
              </a>
            </div>

            <div class="contact-details">
              <h1>Contact Us</h1>
              <li>
                <v-icon dark>mdi-email-variant</v-icon>&nbsp;&nbsp;
                <a href="mailto:yourmail@gmail.com">dipeatdotcom@gmail.com</a>
              </li>
            </div>
          </div>
          <div class="com" data-aos="fade-up">
            <ul>
              <li><a href="#about-us">About Us</a></li>
              <li><a href="#how-it-works">Pricing</a></li>
              <li><a href="http://partner.dipeat.com/">Partner With Us !</a></li>
              <li><a href="/privacy_policy">Privacy Policy</a></li>
              <li><a href="/terms_and_conditions">Terms & Conditions</a></li>
              <li><a href="/refund_policy">Cancellation/Refund Policy</a></li>
            </ul>
          </div>
          <div class="social-info" data-aos="fade-up">
            <h1>Social Media</h1>
            <div class="sociallogos">
              <div class="logobox">
                <a href="https://www.instagram.com/dipeat_com/"
                  ><span class="mdi mdi-instagram"></span
                ></a>
                <a href="https://www.linkedin.com/company/dipeat-com/"
                  ><span class="mdi mdi-linkedin"></span
                ></a>
                <a href="https://twitter.com/dipEAT_com"
                  ><span class="mdi mdi-twitter"></span
                ></a>
              </div>
            </div>
          </div>
        </div>
        <footer>Copyright © 2023 dipEAT. All Rights Reserved.</footer>
      </section>
    </v-sheet>
  </v-app>
</template>

<script>
import axios from "axios";
import api from "@/main";

import signUp from "./components/signUp.vue";
import logIn from "./components/logIn.vue";
import router from "./router";

window.addEventListener("load", () => {
  // Page Loader
  document.querySelector(".loading").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".loading").style.display = "none";
  }, 700);
});

export default {
  name: "App",

  components: {
    signUp,
    logIn,
  },

  data: () => ({
    //
    drawer: false,
    group: null,
    closeOnClick: true,

    search: "",
    getSearch: "",
  }),

  beforeCreate() {
    this.$store.commit("initializeStore");

    const token = this.$store.state.token;

    if (token) {
      api.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      api.defaults.headers.common["Authorization"] = null;
    }
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },

  methods: {
    logout() {
      api
        .post("/api/v1/logout/")
        .then((response) => {
          api.defaults.headers.common["Authorization"] = null;

          localStorage.removeItem("username");
          localStorage.removeItem("userid");
          localStorage.removeItem("token");

          this.$store.commit("removeToken");
          this.$router.push("/").catch(() => {});
          window.location.reload();
        })
        .catch((error) => {
          if (error.response) {
            console.log(JSON.stringify(error.response.data));
          } else if (error.request) {
            console.log(JSON.stringify(error.request));
          } else {
            console.log(JSON.stringify(error.message));
          }
        });
    },

    searchBar() {
      this.$store.state.searchText = this.search;
      // console.log(this.$store.state.searchText);
      localStorage.setItem("searchText", this.search);

      this.$eventBus.$emit("callMethodSearchBarRef");

      this.$router.push("/search").catch(() => {});
      // this.$router.go(0);
    },

    setRestaurant(query) {
      this.$store.state.restaurant = query;
      // console.log(this.$store.state.restaurant);
    },
  },

  mounted() {
    // this.$eventBus.$on("callMethodSearchBar", this.searchBar);
    // this.$eventBus.$on("callMethodSetRestaurant", this.setRestaurant);
    if (this.$store.state.isAuthenticated) {
      this.$store.dispatch("getWallet");
    }
  },
};
</script>

<style>
/*Remove Scroll Bar */
::-webkit-scrollbar {
  display: none;
}

* {
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
}

/* loading screen */

.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  transition: opacity 500ms ease-in-out;
}
.loading .fade-out {
  opacity: 0;
}
.loader-box {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
.loader-box .b {
  border-radius: 50%;
  border-left: 4px solid;
  border-right: 4px solid;
  border-top: 4px solid transparent !important;
  border-bottom: 4px solid transparent !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ro 2s infinite;
}
.loader-box .b1 {
  border-color: #e38b29;
  width: 120px;
  height: 120px;
}
.loader-box .b2 {
  border-color: #fdeedc;
  width: 100px;
  height: 100px;
  animation-delay: 0.1s;
}
.loader-box .b3 {
  border-color: #f1a661;
  width: 80px;
  height: 80px;
  animation-delay: 0.2s;
}
.loader-box .b4 {
  border-color: #ffd8a9;
  width: 60px;
  height: 60px;
  animation-delay: 0.4s;
}
@keyframes ro {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  50% {
    transform: translate(-50%, -50%) rotate(-180deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
}

/*Navigation Bar and Hamburger */

.loggedIn-nav {
  background-image: linear-gradient(135deg, #14011b 0%, #8235cf 100%);
}
.loggedIn-searchBar {
  background-image: linear-gradient(135deg, #14011bde 0%, #8b42d3 100%);
}
@media (min-width: 480px) {
  .loggedIn-searchBar {
    background-image: linear-gradient(135deg, #14011b 0%, #8435d3 100%);
  }
}

nav {
  height: 4.5rem;
  width: 100vw;
  background: rgba(92, 9, 170, 0.644);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11px);
  -webkit-backdrop-filter: blur(11px);
  border: 1px solid rgb(30, 2, 58);
  background-image: linear-gradient(135deg, #1e0129 0%, #ac5cfc3a 100%);
  display: flex;
  position: fixed;
  z-index: 10;
  font-family: "Montserrat", sans-serif;
}

/*Styling logo*/
.logo {
  padding: 1vh 1vw;
  text-align: center;
}
.logo img {
  height: 3.4rem;
  width: 8.5rem;
  margin-left: 15px;
}

.nav-logo {
  padding: 1vh 1vw;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.nav-logo img {
  height: 3.4rem;
  width: 8.5rem;
}

/*Styling Links*/
.nav-links {
  display: flex;
  list-style: none;
  width: 88vw;
  padding: 0 0.7vw;
  justify-content: right;
  align-items: center;
  text-transform: uppercase;
  font-weight: 400;
}
.nav-links li a {
  text-decoration: none;
  margin: 0 1.3vw;
  color: #ffffff;
  font-size: medium;
}

.nav-links li {
  position: relative;
}
.nav-links li a ::before {
  content: "";
  display: block;
  height: 3px;
  width: 0%;
  background-color: #ffffff;
  position: absolute;
  transition: all ease-in-out 250ms;
  margin: 0 0 0 10%;
}
.nav-links li a:hover {
  color: #ffffff;
  font-size: larger;
  padding: 0.6rem 0.8rem;
  transition: ease-in-out 300ms;
  position: relative;
}

/*Styling Buttons*/
.login-button {
  background-color: transparent;
  border: 1.5px solid #ffffff;
  border-radius: 2em;
  padding: 0.6rem 0.8rem;
  margin-left: 2vw;
  font-size: 1rem;
  cursor: pointer;
}
.login-button:hover {
  background: rgba(97, 35, 160, 0.7);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  border: 1px solid rgba(118, 75, 162, 1);
  border: 1.5px solid #f2f5f7;
  transition: all ease-in-out 150ms;
}
.joinus-button {
  color: #ffffff;
  border: 1.5px solid #ffffff;
  border-radius: 2em;
  padding: 0.6rem 0.8rem;
  font-size: 1rem;
  cursor: pointer;
}
.joinus-button:hover {
  background: rgba(97, 35, 160, 0.7);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  border: 1px solid rgba(118, 75, 162, 1);
  border: 1.5px solid #f2f5f7;
  transition: all ease-in-out 150ms;
}

/*Styling Hamburger Icon*/
.hamburger div {
  width: 30px;
  height: 2.6px;
  background: #000000;
  margin: 5px;
  transition: all 0.3s ease;
}
.hamburger {
  display: none;
}

/*Stying for small screens*/
@media screen and (max-width: 800px) {
  .logo img {
    height: 3rem;
    width: 8rem;
  }

  .nav-logo img {
    height: 3rem;
    width: 8rem;
  }

  nav {
    position: fixed;
    z-index: 3;
    height: 4rem;
  }
  .hamburger {
    display: block;
    position: absolute;
    cursor: pointer;
    right: 5%;
    top: 50%;
    transform: translate(-5%, -50%);
    z-index: 2;
    transition: all 0.5s ease;
  }
  .nav-links {
    position: fixed;
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    height: 80vh;
    width: 100%;
    flex-direction: column;
    clip-path: circle(50px at 90% -20%);
    -webkit-clip-path: circle(50px at 90% -10%);
    transition: all 1s ease-out;
    pointer-events: none;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 30px;
  }
  .nav-links.open {
    clip-path: circle(1000px at 90% -10%);
    -webkit-clip-path: circle(1000px at 90% -10%);
    pointer-events: all;
  }
  .nav-links li {
    opacity: 0;
    margin-top: 35px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .nav-links li:nth-child(1) {
    transition: all 0.5s ease 0.2s;
  }
  .nav-links li:nth-child(2) {
    transition: all 0.5s ease 0.4s;
  }
  .nav-links li:nth-child(3) {
    transition: all 0.5s ease 0.6s;
  }
  .nav-links li:nth-child(4) {
    transition: all 0.5s ease 0.8s;
  }
  .nav-links li:nth-child(5) {
    transition: all 0.5s ease 1s;
  }
  .nav-links li:nth-child(6) {
    transition: all 0.5s ease 1.2s;
  }

  li.fade {
    opacity: 1;
  }
}
/*Animating Hamburger Icon on Click*/
.toggle .line1 {
  transform: rotate(-45deg) translate(-5px, 6px);
}
.toggle .line2 {
  transition: all 0.7s ease;
  width: 0;
}
.toggle .line3 {
  transform: rotate(45deg) translate(-5px, -6px);
}

/* Footer */
.main-footer {
  margin-top: 40px;
  padding: 70px 0;
  display: flex;
  justify-content: space-evenly;
  background-image: linear-gradient(135deg, #6274c9 0%, #764ba2 100%);
  font-family: "Montserrat", sans-serif;
}

.main-footer ul {
  list-style: none;
}

.main-footer h1 {
  font-size: 25px;
  line-height: 117%;
  color: #ffffff;
  margin-bottom: 10px;
  font-weight: 500;
}

.main-footer h2 {
  color: #ffffff;
  font-weight: 500;
}

.main-footer ul li a {
  color: #ffffff;
  text-decoration: none;
}

footer {
  background-image: linear-gradient(135deg, #7a90f5 0%, #a175ce 100%);
  border-top: 2px solid #ffffff;
  font-size: 20px;
  padding: 15px 5px;
  color: #ffffff;
  text-align: center;
}

footer a {
  text-decoration: none;
  color: #ffffff;
}

.logoinfo p {
  color: #ffffff;
  font-size: 20px;
  margin-top: 5px;
}

.contact-details {
  margin-top: 22px;
}

.contact-details li {
  list-style: none;
  margin: 10px 0;
}

.contact-details li a {
  text-decoration: none;
  color: #ffffff;
}

.contact-details .fa {
  color: #ffffff;
  margin-right: 10px;
}

.sociallogos {
  padding: 20px 0;
}

.sociallogos .logobox a {
  padding: 0 10px;
  text-decoration: none;
  color: #ffffff;
  font-size: 30px;
}

.mdi-instagram:hover {
  color: #e1306c;
}

.mdi-linkedin:hover {
  color: #0a3bc2;
}

.mdi-facebook:hover {
  color: #283dff;
}
.mdi-twitter:hover {
  color: #1da1f2;
}

.com ul li {
  padding: 5px 0;
  font-size: 20px;
}

@media only screen and (max-width: 749px) {
  .main-footer {
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .social-info {
    padding: 20px 0;
  }
}

@media (max-width: 480px) {
  .main-footer {
    grid-template-columns: 1fr;
  }
  .sociallogos {
    padding: 10px 0;
  }
  .com {
    padding: 10px 0;
  }
}
</style>
