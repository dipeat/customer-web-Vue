<template>
  <v-app id="app">
    <!-- <div class="loading" v-if="!$store.state.isAuthenticated">
      <div class="loader-box">
        <div class="b b1"></div>
        <div class="b b2"></div>
        <div class="b b3"></div>
        <div class="b b4"></div>
	
      </div>
    </div> -->
    <v-app-bar
      absolute
      class="loggedIn-nav"
      color="deep-purple accent-3"
      dark
      elevate-on-scroll
      v-if="$store.state.isAuthenticated"
    >
      <v-menu
        transition="slide-y-transition"
        v-if="$store.state.isAuthenticated"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
        </template>
        <v-list class="mt-10" rounded>
          <v-list-item
            link
            to="/"
            color="purple"
            v-if="$store.state.isAuthenticated"
          >
            <span> <v-icon color="red">mdi-home</v-icon> </span
            >&nbsp;&nbsp;&nbsp;
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/history"
            link
            color="purple"
            v-if="$store.state.isAuthenticated"
          >
            <span> <v-icon color="orange">mdi-history</v-icon> </span
            >&nbsp;&nbsp;&nbsp;
            <v-list-item-title>History</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/profile"
            link
            color="purple"
            v-if="$store.state.isAuthenticated"
          >
            <span> <v-icon color="blue">mdi-account</v-icon> </span
            >&nbsp;&nbsp;&nbsp;
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/feedback" color="purple">
            <span> <v-icon color="green">mdi-leaf</v-icon> </span
            >&nbsp;&nbsp;&nbsp;
            <v-list-item-title>Feedback</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/help" color="purple">
            <span> <v-icon color="pink">mdi-help</v-icon> </span
            >&nbsp;&nbsp;&nbsp;
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            color="purple"
            @click="logout"
            v-if="$store.state.isAuthenticated"
          >
            <span> <v-icon color="black">mdi-logout</v-icon> </span
            >&nbsp;&nbsp;&nbsp;
            <v-list-item-title>Logout</v-list-item-title>
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

      <v-btn
        icon
        color="red"
        v-if="$store.state.isAuthenticated"
        to="/likedshop"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      &nbsp;&nbsp;

      <span link v-if="$store.state.isAuthenticated">
        <h4>{{ $store.state.user.username }}</h4>
      </span>
    </v-app-bar>
    <nav  v-else>
      <div class="logo">
        <a href="/">
          <img
            src="https://dipeat-s3-bucket-1.s3.amazonaws.com/simple_logo.png"
            alt="dipEAT.com"
          />
        </a>
      </div>
      <div class="search" >
          <v-menu v-if="!isDesktop" offset-x left transition="slide-x-transition" >
            <template v-slot:activator="{ on, attrs }">
              <v-btn  fab color="#A33BDF" small v-bind="attrs" v-on="on">
                <svg-icon
                  type="mdi"
                  class="searchButton"
                  href="#"
                  :path="path"
                ></svg-icon>
              </v-btn>
            </template>
            <v-menu rounded="xl" offset-x>
              <template v-slot:activator="{ attrs, on }">
                <div  class="searchBox">
                  <v-text-field dark
                    class="searchInput center-label"
                    solo
                    color
                    v-model="search"
                    v-bind="attrs"
                    v-on="on"
                    flat
                    background-color="white"
                    hide-details
                    placeholder="Search Restaurants"
                    solo-inverted
                    
                    @keyup.enter="searchBar()"
                  ></v-text-field>
                </div>
              </template>
            </v-menu>
          </v-menu>
        </div>
      <div class="hamburger">
        
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>

      <ul class="nav-links">
        <div><a href="http://dipeat.com/">Home</a></div>
        <div><a href="#about-us">About Us</a></div>
        <!-- <div><a href="#top-restaurants">Restaurants</a></div> -->
        <div><a href="http://partner.dipeat.com/">Partner</a></div>
        <div v-if="isDesktop" :class="isDesktop && search">
          <v-menu offset-x transition="slide-x-transition" bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn fab color="#A33BDF" small v-bind="attrs" v-on="on">
                <svg-icon
                  type="mdi"
                  class="searchButton"
                  href="#"
                  :path="path"
                ></svg-icon>
              </v-btn>
            </template>
            <v-menu rounded="xl" >
              <template v-slot:activator="{ attrs, on }">
                <div  class="searchBox">
                  <v-text-field dark
                    class="searchInput center-label"
                    solo
                    v-model="search"
                    v-bind="attrs"
                    v-on="on"
                    flat
                    background-color="white"
                    hide-details
                    placeholder="Search Restaurants"
                    solo-inverted
                    
                    @keyup.enter="searchBar()"
                  ></v-text-field>
                </div>
              </template>
            </v-menu>
          </v-menu>
        </div>
        
          <Auth btnType="Login" />
        
      </ul>
    </nav>

    <v-sheet>
      <v-main class="mt-13">
        <!-- <v-toolbar
          color="deep-purple accent-3"
          class="loggedIn-searchBar"
          dark
          flat
        >
          <v-row justify="center">
            <v-col sm="6" class="mt-1">
              <v-menu rounded="xl" offset-y>
                <template v-slot:activator="{ attrs, on }">
                  
                  <div class="searchBox">
                    <v-text-field 
                      class="searchInput  center-label"
                      solo
                      v-model="search"
                      v-bind="attrs"
                      v-on="on"
                      flat
                      background-color="transparent"
                    hide-details
                    label="Search Restaurants"
                    
                    solo-inverted
                    @keyup.enter="searchBar()"
                    
                    />
                    
                    <svg-icon type="mdi" class="searchButton mt-2" href="#" :path="path"></svg-icon>
                    
                  </div>
                </template>
              </v-menu>
            </v-col>
          </v-row>
        </v-toolbar> -->

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
                <v-icon dark color="yellow">mdi-email-variant</v-icon
                >&nbsp;&nbsp;
                <a href="dipeatdotcom@gmail.com">dipeatdotcom@gmail.com</a>
              </li>
              <li>
                <v-icon color="light-green accent-3">mdi-leaf</v-icon
                >&nbsp;&nbsp;
                <a href="/feedback">Feedback</a>
              </li>
              <li>
                <v-icon color="pink accent-2">mdi-food-apple</v-icon
                >&nbsp;&nbsp;
                <a href="http://partner.dipeat.com/">Partner</a>
              </li>
            </div>
          </div>
          <div class="com" data-aos="fade-up">
            <ul>
              <li><a href="#about-us">About Us</a></li>
              <li><a href="/recognition">Recognition</a></li>
              <li><a href="#we-offer">Pricing</a></li>
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
        <footer class="caption">
          Copyright © 2023 dipEAT. All Rights Reserved.
        </footer>
      </section>
    </v-sheet>
  </v-app>
</template>

<script>
// import axios from "axios";
import api from "@/main";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiMagnify } from "@mdi/js";
import Auth from './components/Auth'
// import signUp from "./components/signUp.vue";
// import logIn from "./components/logIn.vue";
import { set } from "vue";

// window.addEventListener("load", () => {
//   // Page Loader
//   document.querySelector(".loading").classList.add("fade-out");
//   setTimeout(() => {
//     document.querySelector(".loading").style.display = "none";
//   }, 700);
// });

export default {
  name: "App",

  components: {
    // signUp,
    // logIn,
    SvgIcon,
    Auth
  },

  data: () => ({
    isDesktop : true,
    path: mdiMagnify,
    drawer: false,
    group: null,
    closeOnClick: true,

    search: "",
    getSearch: "",
    totalPageVisitCount: 0,
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
    checkScreenSize() {
      this.isDesktop = window.innerWidth >= 760 // Adjust the breakpoint as needed
    },
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
      this.$store.state.searchText = this.search
        .toLowerCase()
        .replace(/\s/g, "");
      // console.log(this.$store.state.searchText);
      localStorage.setItem(
        "searchText",
        this.search.toLowerCase().replace(/\s/g, "")
      );
      localStorage.setItem("searchDisplayText", this.search.toLowerCase());
      this.$eventBus.$emit("callMethodSearchBarRef");

      this.$router.push("/search").catch(() => {});
      // this.$router.go(0);
    },

    setRestaurant(query) {
      this.$store.state.restaurant = query;
      // console.log(this.$store.state.restaurant);
    },
  },

  async created() {
    // get page visit count data from backend
    await api.get("/api/v1/customeranalytics/").then((response) => {
      this.totalPageVisitCount = response.data[0].homePageVisitCount;
      // console.log(this.totalPageVisitCount);

      api
        .patch("/api/v1/customeranalytics/", {
          homePageVisitCount: Number(this.totalPageVisitCount) + 1,
        })
        .then((response) => {
          // console.log(response.data);
        });
    });
    // .catch((error) => {
    //   console.log(error);
    // });
  },

  mounted() {
    // this.$eventBus.$on("callMethodSearchBar", this.searchBar);
    // this.$eventBus.$on("callMethodSetRestaurant", this.setRestaurant);
    if (this.$store.state.isAuthenticated) {
      this.$store.dispatch("getWallet");
    }
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
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
.v-text-field .v-input__control input::placeholder {
  color: #0d0c0c; /* Change to your desired placeholder text color */
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
  background-image: linear-gradient(135deg, #14011b 0%, #5b1e97 100%);
}
.loggedIn-searchBar {
  background-image: linear-gradient(135deg, #14011b 0%, #6520aa 100%);
}
@media (min-width: 480px) {
  .loggedIn-searchBar {
    background-image: linear-gradient(135deg, #14011bc7 0%, #8435d3 100%);
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
  background-image: linear-gradient(135deg, #1e0129fd 45%, #41127088 10%);
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 10;
  font-family: "Montserrat", sans-serif;
}

/*Styling logo*/
.logo {
  padding: 1vh 1vw;
  text-align: center;
  display: flex;
  flex-grow: 1;
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
.nav-links div {
  width: fit-content;
  margin: 0px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-links div a {
  text-decoration: none;
  color: #ffffff;
  font-size: 18px;
  transition: transform ease-in-out 200ms;
}

/* .nav-links li {
  position: relative;
} */
.nav-links div a:hover {
  transform: scale(1.4);
  font-weight: 500;
}
/* .nav-links li a ::before {
  content: "";
  display: block;
  height: 3px;
  width: 0%;
  background-color: #ffffff;
  position: absolute;
  transition: all ease-in-out 250ms;
  margin: 0 0 0 10%;
} */
/* .nav-links li a:hover {
  color: #ffffff;
  font-size: larger;
  padding: 0.6rem 0.8rem;
  transition: ease-in-out 300ms;
  position: relative;
} */

.searchBox {
  margin: 0px;
  background: transparent;
  border: none;
  height: 40px;
  width: 140px;
  border-radius: 60px;
  display: flex;
  align-items: center;
  
}


.searchButton {
  color: white;
  float: right;
  width: 40px;
  height: 40px;
  font-size: 10px;
  border-radius: 50%;
  /* background: #a33bdf; */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  padding: 7px;
}

.searchInput {
  border: none;
  outline: none;
  float: left;
  padding: 0;
  color: white;
  background-color: #f2ebeb;
  border-radius: 40px;
  width: full;
  font-size: 16px;
  transition: 0.4s;
  line-height: 40px;
  width: 0px;
}
 .searchInput input{
  color:black;
}
.searchInput input:focus{
  color: black;
}


@media screen and (max-width: 620px) {
  .searchBox:hover > .searchInput {
    width: 250px;
    padding: 0 6px;
  }
}
.search{
  padding: 1.5vh 1vw;
  display: flex;
  flex-grow: 0.3;
  margin-right: 25px;
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
  background: #ffffff;
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
  .nav-links div{
    margin: 30px 0px;
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

#app {
  background-attachment: fixed;
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
