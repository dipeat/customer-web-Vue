<template>
  <v-main>
    <v-container>
      <v-card class="mx-auto my-4" max-width="374">
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-card-title class="justify-center"
          >{{ $store.state.user.username }}
        </v-card-title>

        <div class="text-center">
          <div class="text-center">
            <v-chip outlined color="deep-purple" v-if="$store.state.isAuthenticated">
              Balance: <v-icon>mdi-currency-inr</v-icon>
              {{ this.$store.state.walletBalance }}
            </v-chip>
          </div>
          <v-btn
            text
            small
            rounded
            dark
            color="blue"
            class="ma-2"
            @click.stop="dialog1 = true"
            >Add</v-btn
          >
          <v-btn
            text
            small
            rounded
            dark
            color="brown lighten-1"
            class="ma-2"
            v-if="showNow"
            ><v-icon>mdi-history</v-icon></v-btn
          >
        </div>

        <v-dialog v-model="dialog1" max-width="290">
          <v-card>
            <v-card-title class="text-h5 brown--text"> Add Money to Wallet </v-card-title>

            <v-card-text>
              <form>
                <v-text-field label="Amount" v-model="amount"></v-text-field>
              </form>
            </v-card-text>
            <v-subheader>Note: Add rupees 200 or more to wallet.</v-subheader>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="red" text @click="dialog1 = false"> Cancel </v-btn>
              <v-spacer></v-spacer>

              <v-btn
                color="blue"
                outlined
                @click.prevent="pay"
                :disabled="amount == '' || amount < 200 || amount != parseInt(amount)"
              >
                Pay
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-card-text class="text-center">
          <div>{{ get_profile.introduction }}</div>
        </v-card-text>

        <v-divider color="black"></v-divider>

        <v-row>
          <v-col>
            <v-card-title>Info</v-card-title>
          </v-col>

          <v-col>
            <v-card-title class="justify-end">
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn text color="blue" v-bind="attrs" v-on="on">
                    <v-icon> mdi-pencil </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Customer Profile</span>
                  </v-card-title>
                  <v-card-text>
                    <v-form
                      @submit.prevent="submitCategory"
                      ref="form1"
                      v-model="valid1"
                      lazy-validation
                    >
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              v-model="mobile_number"
                              :rules="mobileRules"
                              label="Mobile*"
                              hint="Mobile/Phone number"
                              maxlength="10"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              v-model="email"
                              :rules="emailRules"
                              label="Email*"
                              hint="Email address"
                              maxlength="50"
                              required
                            ></v-text-field>
                          </v-col>
                          <v-col>
                            <v-textarea
                              auto-grow
                              v-model="introduction"
                              :rules="introductionRules"
                              rows="2"
                              maxlength="200"
                              label="Introduction"
                              hint="Introduce yourself"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-form>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Close
                    </v-btn>
                    <v-btn color="blue darken-1" text @click.prevent="submit_profile">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-title>
          </v-col>
        </v-row>

        <v-card-text>
          <div class="text-overline">Contact</div>
          <div class="mb-5">
            <strong>
              {{ get_profile.mobile_number }}
            </strong>
          </div>

          <div class="text-overline">Email</div>
          <div>
            <strong>
              {{ get_profile.email }}
            </strong>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
// import axios from "axios";
import api from "@/main";

export default {
  name: "Profile",

  data: () => ({
    showNow: false,
    dialog: false,
    dialog1: false,

    mobile_number: "",
    email: "",
    introduction: "",

    walletBalance: "",

    amount: "",
    currency: "INR",
    paymentId: "",
    validity: "",

    get_profile: {
      mobile_number: "",
      email: "",
      introduction: "",
    },

    valid1: true,
    mobileRules: [
      (v) => !!v || "Mobile number is required",
      (v) => /^[0-9]+$/.test(v) || "Phone must be numbers only",
    ],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    introductionRules: [
      (v) => !!v || "Introduction is required",
      (v) => v.length <= 200 || "Introduction must be less than 200 characters",
    ],
  }),

  methods: {
    submit_profile() {
      if (this.$refs.form1.validate()) {
        const formData = new FormData();
        formData.append("phone", this.mobile_number);
        formData.append("email", this.email);
        formData.append("intro", this.introduction);
        formData.append("user", this.$store.state.user.id);
        formData.append("slug", this.$store.state.user.username);

        const slug = this.$store.state.user.username;

        api.patch(`/api/v1/customerprofile/${slug}/`, formData);
        // .then((response) => {
        //   console.log(response);
        // })
        // .catch((error) => {
        //   console.log(error);
        // });

        this.dialog = false;

        setTimeout(() => {
          this.getCustomerProfile();
        }, 1000);
      }
    },

    getCustomerProfile() {
      const slug = this.$store.state.user.username;
      api.get(`/api/v1/customerprofile/${slug}/`).then((response) => {
        // console.log(response.data);
        this.get_profile.mobile_number = response.data[0].phone;
        this.get_profile.email = response.data[0].email;
        this.get_profile.introduction = response.data[0].intro;

        this.mobile_number = response.data[0].phone;
        this.email = response.data[0].email;
        this.introduction = response.data[0].intro;
      });
      // .catch((error) => {
      //   console.log(error);
      // });
    },

    // getWallet() {
    //   const slug = this.$store.state.user.username;
    //   api.get(`/api/v1/customerwallet/${slug}/`).then((response) => {
    //     // console.log(response.data);
    //     this.$store.state.walletBalance = response.data[0].total_amount;
    //   });
    // },

    postWallet() {
      if (this.validity == true) {
        const slug = this.$store.state.user.username;
        const data = {
          total_amount: Number(this.$store.state.walletBalance) + Number(this.amount),
          user: this.$store.state.user.id,
          slug: this.$store.state.user.username,
        };
        api.patch(`/api/v1/customerwallet/${slug}/`, data).then((response) => {
          // console.log(response.data);
          this.$store.dispatch("getWallet");
        });
      }
    },

    pay() {
      // Send a request to the backend to create a payment
      if (this.amount != "") {
        api
          .post("/api/v1/create_payment/", {
            amount: this.amount * 100,
            currency: "INR",
          })
          .then((response) => {
            this.paymentId = response.data.payment_id;
            // Open the Razorpay checkout
            const options = {
              key: "rzp_test_BLtsjnAxhyqY38",
              currency: "INR",
              amount: this.amount * 100,
              name: "dipEAT",
              description: "Payment for your wallet",
              order_id: response.data.payment_id,
              handler: (response) => {
                // console.log(response.razorpay_payment_id);
                // console.log(response.razorpay_order_id);
                // console.log(response.razorpay_signature);

                // verify payment

                const data = {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                };
                const res = api
                  .post("/api/v1/verify_payment/", data, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  .then((response) => {
                    // console.log(response.data);
                    // console.log(response.data.res);
                    this.validity = response.data.validity;

                    // console.log(this.amount);
                    // console.log(response.data.validity);
                    // console.log("h2i");
                    this.postWallet();
                  });

                // this.postWallet();
              },

              // prefill: {
              //   name: 'John Doe',
              //   email: 'johndoe@example.com'
              // }
              theme: {
                color: "#A40FFF",
              },
            };
            // console.log(response.data.payment_id);
            // console.log(this.amount);

            const paymentObject = new Razorpay(options);
            paymentObject.open();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Please enter amount");
      }

      this.dialog1 = false;
    },
  },

  created() {
    this.getCustomerProfile();
    // this.getWallet();
    // this.postWallet();
  },
};
</script>
