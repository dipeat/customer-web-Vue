<template>
  <v-dialog v-model="dialog1" max-width="350">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="button-style"
        dark
        rounded
        color="purple accent-4"
        v-bind="attrs"
        v-on="on"
        >LogIn</v-btn
      >
    </template>
    <v-form @submit.prevent="logIn" ref="form1" v-model="valid1" lazy-validation>
      <v-card class="pa-4">
        <v-card-title class="text-h5"> Log In </v-card-title>
        <div>
          <v-alert
            border="right"
            colored-border
            type="error"
            elevation="3"
            class="mt-3"
            v-if="errorMessages != ''"
          >
            {{ errorMessages }}
          </v-alert>
        </div>
        <v-text-field
          v-model="loginUsername"
          :rules="logInNameRules"
          label="Username"
          counter
          maxlength="9"
        ></v-text-field>
        <v-text-field
          v-model="loginPassword"
          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="logInPasswordRules1"
          :type="show3 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show3 = !show3"
          @keyup.enter="logIn"
          maxlength="30"
        ></v-text-field>
        <v-card-actions>
          <a href="">Forgot Password?</a>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog1 = false"> Cancel </v-btn>
          <v-btn color="primary" text @click="logIn"> LogIn </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
// import axios from "axios";
import api from "@/main";

export default {
  name: "logIn",

  data: () => ({
    dialog1: false,

    show3: false,

    errors: [],

    loginUsername: "",
    loginMobNumber: "",
    loginPassword: "",

    errorMessages: "",

    valid1: true,

    logInNameRules: [
      (v) => !!v || "Username is required",
      (v) => v.length <= 9 || "Username must be less than 10 characters",
      (v) => v.length >= 3 || "Username must be atleast 3 characters",
    ],

    logInPasswordRules1: [
      (v) => !!v || "Password is required",
      (v) => v.length <= 30 || "Password must be less than 30 characters",
      (v) => v.length >= 8 || "Password must be atleast 8 characters",
    ],
  }),

  methods: {
    logIn() {
      if (this.$refs.form1.validate()) {
        api
          .post("/api/v1/login/", {
            username: this.loginUsername.toLowerCase(),
            password: this.loginPassword,
          })
          .then((response) => {
            if (response.data.is_customer == true) {
              const token = response.data.token;
              this.$store.commit("setToken", token);
              api.defaults.headers.common["Authorization"] = "Token " + token;
              localStorage.setItem("token", token);

              this.$store.commit("setUser", {
                username: response.data.username,
                id: response.data.user_id,
              });

              localStorage.setItem("username", response.data.username);
              localStorage.setItem("userid", response.data.user_id);

              // console.log(response);
              // console.log(response.data.token);
              this.dialog1 = false;
              this.$router.push("/");
              this.$eventBus.$emit("callMethodLoginHomeRefresh");
              this.$store.dispatch("getWallet");
              // window.location.reload();
            } else if (response.data.is_customer == false) {
              alert("You are not a customer yet. Please sign-up.");
            }
          })
          .catch((error) => {
            console.log(error);
            this.errorMessages = "Invalid username or password";
            setTimeout(() => {
              this.errorMessages = "";
            }, 5000);
          });
      }
    },
  },

  beforeCreate() {
    this.$store.commit("initializeStore");
    const token = this.$store.state.token;
    if (token) {
      api.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      api.defaults.headers.common["Authorization"] = "";
    }
  },
};
</script>
<style>
.button-style {
  background-image: linear-gradient(135deg, #4d0875 0%, #9123ff 100%);
}
</style>
