<template>
  <div>
    <v-form @submit.prevent="signUp" ref="form1" v-model="valid1" lazy-validation>
      <v-card class="pa-4 mx-auto" max-width="550">
        <v-card-title class="text-h5"> Feedback </v-card-title>
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name"
          counter
          maxlength="50"
        ></v-text-field>
        <v-text-field v-model="email" label="Email" counter maxlength="70"></v-text-field>
        <v-text-field
          v-model="phoneNumber"
          :rules="phoneNumberRules"
          label="Phone Number"
          placeholder="Must be 10 digits"
          counter
          maxlength="10"
        ></v-text-field>

        <v-textarea
          v-model="message"
          label="Message"
          :rules="messageRules"
          placeholder="Message"
          auto-grow
          rows="5"
          counter
          maxlength="500"
        ></v-textarea>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined @click="submitFeedback"> Submit </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import api from "@/main";

export default {
  name: "Feedback",

  data: () => ({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",

    valid1: true,

    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
    ],

    phoneNumberRules: [
      (v) => !!v || "Phone number is required",
      (v) => (v && v.length == 10) || "Phone number must be 10 digits",
      (v) => (v && !isNaN(v)) || "Phone number must be a number",
    ],

    messageRules: [
      (v) => !!v || "Message is required",
      (v) => (v && v.length <= 500) || "Message must be less than 500 characters",
    ],
  }),

  methods: {
    submitFeedback() {
      if (this.$refs.form1.validate()) {
        api
          .post("/api/v1/customerfeedback/", {
            name: this.name,
            email: this.email,
            phone: this.phoneNumber,
            message: this.message,
          })
          .then((response) => {
            // console.log(response);
            this.$router.push("/");
          });
        // .catch((error) => {
        //   console.log(error);
        // });
      }
    },
  },
};
</script>
