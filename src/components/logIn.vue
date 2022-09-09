<template>
  <v-dialog v-model="dialog1" max-width="350">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="purple accent-4" dark v-bind="attrs" v-on="on">LogIn</v-btn>
      </template>
      <v-card class="pa-4">
        <v-card-title class="text-h5"> Log In </v-card-title>
        <form @submit.prevent="logIn">
          <v-text-field
            v-model="loginUsername"
            :rules="[rules4.required, rules4.counter]"
            label="Username"
            counter
            maxlength="10"
          ></v-text-field>
          <v-text-field
            v-model="loginPassword"
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules5.required, rules5.min]"
            :type="show3 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 8 characters"
            counter
            @click:append="show3 = !show3"
            maxlength="20"
          ></v-text-field>
        </form>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog1 = false"> Cancel </v-btn>
          <v-btn color="primary" text @click="logIn"> LogIn </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import axios from "axios";


export default {
  name: "logIn",


  data: () => ({
    dialog1: false,
    
    show3: false,

    errors: [],
    
    loginUsername: "",
    loginMobNumber: "",
    loginPassword: "",
    
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
     
    logIn() {
      axios
        .post("/api/login/", {
          username: this.loginUsername,
          password: this.loginPassword,
        })
        .then((response) => {

          if (response.data.is_customer == true) {
            

              const token = response.data.token;
              this.$store.commit("setToken", token);
              axios.defaults.headers.common["Authorization"] = "Token " + token;
              localStorage.setItem("token", token);

              this.$store.commit("setUser", {
                'username': response.data.username,
                'id': response.data.user_id,
              });

              localStorage.setItem("username", response.data.username);
              localStorage.setItem("userid", response.data.user_id);


              // console.log(response);
              // console.log(response.data.token);
              this.dialog1 = false;
              this.$router.push("/home");



          } else if (response.data.is_customer == false) {
            alert("You are not a customer");
          }

        })
        .catch((error) => {
          console.log(error);
          this.errors.push(error);
        });
    },
    

  //   async logIn() {
  //     axios.defaults.headers.common["Authorization"] = "";

  //     localStorage.removeItem("token");

  //     const formData1 = {
  //       username: this.loginUsername.toLowerCase(),
  //       password: this.loginPassword,
  //     };

  //     await axios
  //       .post("/api/login/", formData1)
  //       .then((response) => {
          // const token = response.data.token;
          // this.$store.commit("setToken", token);
          // axios.defaults.headers.common["Authorization"] = "Token " + token;
          // localStorage.setItem("token", token);
  //       })
  //       .catch((error) => {
  //         if (error.response) {
  //           for (const property in error.response.data) {
  //             this.errors.push(`${property}: ${error.response.data[property]}`);
  //           }
  //           console.log(JSON.stringify(error.response.data));
  //         } else if (error.message) {
  //           this.errors.push("Something went wrong, Please try again.");
  //           console.log(JSON.stringify(error.message));
  //         } else {
  //           console.log(JSON.stringify(error));
  //         }
  //       });

  //     axios
  //       .get("/api/v1/users/me/")
  //       .then((response) => {
  //         this.$store.commit("setUser", {
  //           'username': response.data.username,
  //           'id': response.data.id,
  //         });
  //         // console.log(response.data);

          // localStorage.setItem("username", response.data.username);
          // localStorage.setItem("userid", response.data.id);

  //         this.$router.push("/home");
  //         this.dialog1 = false
  //       })
  //       .catch((error) => {
  //         console.log(JSON.stringify(error));
  //       });
  //   },
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