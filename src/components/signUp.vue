<template>
  <v-dialog v-model="dialog" max-width="350">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="button-style"
        color="purple accent-4"
        rounded
        dark
        v-bind="attrs"
        v-on="on"
        >SignUp</v-btn
      >
    </template>
    <v-form @submit.prevent="signUp" ref="form1" v-model="valid1" lazy-validation>
      <v-card class="pa-4">
        <v-card-title class="text-h5"> Sign Up </v-card-title>
        <div>
          <v-alert
            border="right"
            colored-border
            type="error"
            elevation="3"
            class="mt-3"
            dismissible
            v-if="errorMessages != ''"
          >
            {{ errorMessages }}
          </v-alert>
        </div>
        <v-text-field
          v-model="username"
          :rules="signUpNameRules"
          label="Username"
          counter
          maxlength="9"
        ></v-text-field>
        <v-text-field v-model="email" label="Email" counter maxlength="50"></v-text-field>
        <v-text-field
          v-model="password"
          validate-on-blur
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="signUpPasswordRules1"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
          maxlength="30"
        ></v-text-field>
        <v-text-field
          v-model="password1"
          validate-on-blur
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="signUpPasswordRules2"
          :type="show2 ? 'text' : 'password'"
          name="input-10-1"
          label="Confirm Password"
          hint="At least 8 characters"
          counter
          @click:append="show2 = !show2"
          @keyup.enter="signUp"
          maxlength="30"
        ></v-text-field>
        <div class="caption">
          Note: By clicking "SignUp" you agree to our
          <a href="http://dipeat.com/terms_and_conditions">Terms & Conditions</a>, and
          <a href="http://dipeat.com/privacy_policy">Privacy Policy</a>.
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false"> Cancel </v-btn>
          <v-btn color="primary" text @click="signUp"> SignUp </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
// import axios from "axios";
import api from "@/main";

export default {
  name: "signUp",

  data: () => ({
    dialog: false,
    show1: false,
    show2: false,

    errors: [],
    username: "",
    email: "",
    password: "",
    password1: "",

    errorMessages: [],

    valid1: false,

    signUpNameRules: [
      (v) => !!v || "Username is required",
      (v) => v.length <= 9 || "Username must be less than 10 characters",
      (v) => v.length >= 3 || "Username must be atleast 3 characters",
    ],

    signUpPasswordRules1: [
      (v) => !!v || "Password is required",
      (v) => v.length <= 30 || "Password must be less than 30 characters",
      (v) => v.length >= 8 || "Password must be atleast 8 characters",
    ],

    // done in computed section
    // signUpPasswordRules2: [
    //   (v) => !!v || "Confirm Password is required",
    //   (v) => v.length <= 30 || "Must be less than 30 characters",
    //   (v) => v.length >= 8 || "Must be atleast 8 characters",
    //   (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) || "Must contain a special character",
    // (v) => this.password === v || "Password and Confirm Password must be same",
    // ],
  }),

  methods: {
    signUp() {
      if (this.$refs.form1.validate()) {
        const formData = {
          username: this.username.toLowerCase(),
          email: this.email.toLowerCase(),
          password: this.password,
          password1: this.password1,
        };
        api
          .post("/api/v1/signup/customer/", formData)
          .then((response) => {
            this.dialog = false;

            setTimeout(() => {
              alert("SignUp Successful, Please Login");
            }, 1000);
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(`${property}: ${error.response.data[property]}`);
              }
              console.log(JSON.stringify(error.response.data));
              this.errorMessages = JSON.stringify(error.response.data);
              setTimeout(() => {
                this.errorMessages = "";
              }, 5000);
            } else if (error.message) {
              this.errorMessages.push("Something went wrong, Please try again.");
              console.log(JSON.stringify(error));
              this.errorMessages = JSON.stringify(error);
              setTimeout(() => {
                this.errorMessages = "";
              }, 5000);
              // this.$eventBus.$emit("callMethodDisplayErrorMessages");
            }
          });
      }
    },
  },

  computed: {
    signUpPasswordRules2() {
      return [
        (v) => !!v || "Confirm Password is required",
        (v) => v.length <= 30 || "Must be less than 30 characters",
        (v) => v.length >= 8 || "Must be atleast 8 characters",
        (v) => v === this.password || "Password and Confirm Password must be same",
      ];
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
