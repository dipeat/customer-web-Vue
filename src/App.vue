<template>
  <v-app id="app">
    <v-app-bar absolute color="deep-purple accent-4" dark elevate-on-scroll>
      <v-menu transition="slide-y-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
        </template>
        <v-list class="mt-10" rounded>
          <v-list-item
            link
            to="/home"
            color="purple"
            v-if="$store.state.isAuthenticated"
          >
            <span><v-icon>mdi-home</v-icon></span
            >&nbsp;&nbsp;&nbsp;
            <v-list-item-title v-text="'Home'"></v-list-item-title>
          </v-list-item>
          <v-list-item link color="purple" v-if="$store.state.isAuthenticated">
            <span><v-icon>mdi-wallet</v-icon></span
            >&nbsp;&nbsp;&nbsp;
            <v-list-item-title v-text="'Wallet'"></v-list-item-title>
          </v-list-item>
          <v-list-item link color="purple">
            <span><v-icon>mdi-help</v-icon></span
            >&nbsp;&nbsp;&nbsp;
            <v-list-item-title v-text="'Help'"></v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            color="purple"
            @click="logout"
            v-if="$store.state.isAuthenticated"
          >
            <span><v-icon>mdi-logout</v-icon></span
            >&nbsp;&nbsp;&nbsp;
            <v-list-item-title v-text="'Logout'"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-toolbar-title>Crispicy</v-toolbar-title>

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

      <v-btn icon color="pink" v-if="$store.state.isAuthenticated">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon v-if="$store.state.isAuthenticated">
        <v-icon>mdi-history</v-icon>
      </v-btn>
      &nbsp;&nbsp;&nbsp;

      <span link v-if="$store.state.isAuthenticated">
        <h4>{{ $store.state.user.username }}</h4>
      </span>
    </v-app-bar>

    <v-sheet>
      <v-main class="mt-13">
        <v-toolbar
          color="deep-purple accent-4"
          dark
          flat
          v-if="$store.state.isAuthenticated"
        >
          <v-row justify="center">
            <v-col sm="6">
              <v-text-field
                class="mx-7 mt-2"
                flat
                hide-details
                label="Search"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
                rounded
              ></v-text-field>
            </v-col>
          </v-row>
        </v-toolbar>
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-sheet>
  </v-app>
</template>

<script>
import axios from "axios";

import signUp from "./components/signUp.vue";
import logIn from "./components/logIn.vue";

export default {
  name: "App",

  components: {
    signUp,
    logIn,
  },

  beforeCreate() {
    this.$store.commit("initializeStore");

    const token = this.$store.state.token;

    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = null;
    }
  },

  data: () => ({
    //
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },

  methods: {
    logout() {
      axios
        .post("/api/v1/token/logout/")
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = null;

          localStorage.removeItem("username");
          localStorage.removeItem("userid");
          localStorage.removeItem("token");

          this.$store.commit("removeToken");
          this.$router.push("/");
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
  },
};
</script>
