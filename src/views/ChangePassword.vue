<template>
  <div>
    <v-container fill-height fluid>
      <v-layout align-center justify-center mt-5>
        <v-card dark width="800px">
          <v-card-title>Change Password</v-card-title>
          <v-form
            @submit.prevent="changeNewPassword"
            ref="form"
            v-model="valid"
            lazy-validation
          >
          <v-alert
          border="right"
          colored-border
          type="success"
          elevation="3"
          class="mt-3"
          
          v-if="message != ''"
        >
          {{ message }}
        </v-alert>
        <v-alert
          border="right"
          colored-border
          type="error"
          elevation="3"
          class="mt-3"
          
          v-if="error != ''"
        >
          {{ error }}
        </v-alert>
            <v-card-text>
              <v-text-field
                counter
                color="primary"
                v-model="email"
                disabled
                label="Email"
              />
              <v-text-field
                color="primary"
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
              />
              <v-text-field
                color="primary"
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
              />
            </v-card-text>
            <v-card-actions>
              <v-btn @click="changeNewPassword" color="primary">Submit</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import api from "@/main";
export default {
  name: "ChangePassword",
  data: () => ({
    loc: window.location.href,
    email: "",
    password: "",
    password1: "",
    message:'',
    error:"",
    show1: false,
    show2: false,
    valid: true,
    signUpPasswordRules1: [
      (v) => !!v || "Password is required",
      (v) => v.length <= 30 || "Password must be less than 30 characters",
      (v) => v.length >= 8 || "Password must be atleast 8 characters",
    ],
  }),
  methods: {
    retrieveEmail() {
      api
        .post("/api/v1/RetrieveEmail", {
          user_id: this.hashedCode,
        })
        .then((res) => {
          console.log(res);
          if (res.data !== "Got following Error -> ") {
            this.email = res.data;
          }
          else if(res.data === 'Got following Error -> '){
            this.error = 'The forget password link is invalid'
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    changeNewPassword() {
      if (this.$refs.form.validate()) {
        api
          .post("/api/v1/forget/customer/", {
            email: this.email,
            password: this.password,
            confirmpassword: this.password1,
          })
          .then((res) => {
            console.log(res);
            this.message = res.data;
            setTimeout(()=>{
                this.message = ''
            },10000)
            setTimeout(()=>{
                this.$router.push('/')
            },10000)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  computed: {
    hashedCode() {
      const hashed = this.loc.split("/")[4];
      return hashed;
    },
    signUpPasswordRules2() {
      return [
        (v) => !!v || "Confirm Password is required",
        (v) => v.length <= 30 || "Must be less than 30 characters",
        (v) => v.length >= 8 || "Must be atleast 8 characters",
        (v) =>
          v === this.password || "Password and Confirm Password must be same",
      ];
    },
  },
  created() {
    this.retrieveEmail();
  },
};
</script>

<style></style>
