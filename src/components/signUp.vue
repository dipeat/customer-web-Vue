<template>
  <v-dialog v-model="dialog" max-width="350">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="purple accent-4" dark v-bind="attrs" v-on="on">SignUp</v-btn>
      </template>
      <v-card class="pa-4">
        <v-card-title class="text-h5"> Sign Up </v-card-title>
        <form @submit.prevent="signUp">
          <v-text-field
            v-model="username"
            :rules="[rules0.required, rules0.counter]"
            label="Username"
            counter
            maxlength="10"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="Email"
            counter
            maxlength="50"
          ></v-text-field>
          <v-text-field
            v-model="password"
            validate-on-blur
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules2.required, rules2.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
            maxlength="20"
          ></v-text-field>
          <v-text-field
            v-model="password1"
            validate-on-blur
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules3.required, rules3.min]"
            :type="show2 ? 'text' : 'password'"
            name="input-10-1"
            label="Confirm Password"
            hint="At least 8 characters"
            counter
            @click:append="show2 = !show2"
            maxlength="20"
          ></v-text-field>
        </form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false"> Cancel </v-btn>
          <v-btn color="primary" text @click="signUp"> SignUp </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from "axios";

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
    
    rules0: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      counter: (v) => v.length <= 10 || "Max 20 characters",
    },

    // rules1: {
    //   required: (value) => !!value || "Required.",
    //   min: (v) => v.length >= 8 || "Min 8 characters",
    //   counter: (v) => v.length <= 10 || "Max 20 characters",
    // },
    rules2: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      counter: (v) => v.length <= 20 || "Max 20 characters",
    },
    rules3: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      counter: (v) => v.length <= 20 || "Max 20 characters",
    },
    
  }),

  methods: {
    signUp() {
      this.errors = [];

      // convert any upper case letters to lower case

      if (this.username === "") {
        this.errors.push("Username required.");
      }
      if (this.email === "") {
        this.errors.push("Email required.");
      }
      if (this.password === "") {
        this.errors.push("Password required.");
      }
      if (this.password1 === "") {
        this.errors.push("Confirm Password required.");
      }
      if (this.password !== this.password1) {
        this.errors.push("Password and Confirm Password should be same.");
      }
      if (!this.errors.length) {
        const formData = {
          username: this.username.toLowerCase(),
          email: this.email.toLowerCase(),
          password: this.password,
          password1: this.password1,
        };
        axios
          .post("/api/signup/customer/", formData)
          .then((response) => {
            toast({
              message: "Account created successfully",
              type: "is-success",
              dismissible: true,
              pauseOnHover: true,
              position: "top-right",
              duration: 3000,
            });
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }
              console.log(JSON.stringify(error.response.data));
            } else if (error.message) {
              this.errors.push("Something went wrong, Please try again.");
              console.log(JSON.stringify(error));
            }
          });
      }
      this.dialog = false
    },

    
  },

  beforeCreate() {
    this.$store.commit("initializeStore");
    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
};
</script>