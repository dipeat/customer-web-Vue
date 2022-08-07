<template>
  <v-main>
    <v-container>
    

    <v-chip color="red" v-if="errors.length">
      <p v-for="error in errors" v-bind:key="error">{{ error }}</p>
    </v-chip>

    

    <div v-if="$store.state.isAuthenticated">
      <h3>Logged In</h3>
      <h2>{{ $store.state.user.username }}</h2>
    </div>
    <div v-else>
      <h3>Logged Out</h3>
    </div>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

import signUp from "../components/signUp.vue";
import logIn from "../components/logIn.vue";

export default {
  name: "welcome",

  components: {
    signUp,
    logIn
  },

  data: () => ({
    dialog: false,
    dialog1: false,
    show1: false,
    show2: false,
    show3: false,

    errors: [],
    username: "",
    mobNumber: "",
    password: "",
    password1: "",
    loginUsername: "",
    loginMobNumber: "",
    loginPassword: "",
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
    rules4: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      counter: (v) => v.length <= 10 || "Max 20 characters",
    },
    rules5: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      counter: (v) => v.length <= 20 || "Max 20 characters",
    },
  }),

  methods: {
    signUp() {
      this.errors = [];

      if (this.username === "") {
        this.errors.push("Username required.");
      }
      // if (this.mobNumber === "") {
      //   this.errors.push("Mobile Number required.");
      // }
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
          username: this.username,
          password: this.password,
        };
        axios
          .post("/api/v1/users/", formData)
          .then((response) => {
            console.log(response);
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
      //  console.log(this.errors);
    },

    async logIn() {
      axios.defaults.headers.common["Authorization"] = "";

      localStorage.removeItem("token");

      const formData1 = {
        username: this.loginUsername,
        password: this.loginPassword,
      };

      await axios
        .post("/api/v1/token/login/", formData1)
        .then((response) => {
          const token = response.data.auth_token;
          this.$store.commit("setToken", token);
          axios.defaults.headers.common["Authorization"] = "Token " + token;
          localStorage.setItem("token", token);
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
            console.log(JSON.stringify(error.response.data));
          } else if (error.message) {
            this.errors.push("Something went wrong, Please try again.");
            console.log(JSON.stringify(error.message));
          } else {
            console.log(JSON.stringify(error));
          }
        });

      axios
        .get("/api/v1/users/me/")
        .then((response) => {
          this.$store.commit("setUser", {
            'username': response.data.username,
            'id': response.data.id,
          });
          // console.log(response.data);

          localStorage.setItem("username", response.data.username);
          localStorage.setItem("userid", response.data.id);

          this.$router.push("/");
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
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
