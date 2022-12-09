<template>
  <v-main>
    <v-container>
      <v-card class="mx-auto my-4" max-width="374">
      <template slot="progress">
        <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
      </template>

      <v-card-title class="justify-center">{{ $store.state.user.username }}
      </v-card-title>

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
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Customer Profile</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      
                      <v-col cols="12">
                        <v-text-field v-model="mobile_number" label="Mobile*" hint="Mobile/Phone number" required></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="email" label="Email*" hint="Email address" required></v-text-field>
                      </v-col>
                      <v-col>
                        <v-textarea auto-grow v-model="introduction" rows="2" label="Introduction" hint="Introduce yourself"></v-textarea>
                      </v-col>
                     
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="submit_profile">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
        </v-col>
      </v-row>


      <v-card-text>
        <div class="text-overline">
          Contact
        </div>
        <div class="mb-5"> <strong>
            {{ get_profile.mobile_number }}
          </strong>
        </div>

        <div class="text-overline">
          Email
        </div>
        <div> <strong>
            {{ get_profile.email }}
          </strong>
        </div>
      </v-card-text>

    </v-card>
    </v-container>
  </v-main>
</template>




<script>
import axios from "axios";

export default {
  name: "Profile",

  data: () => ({

    dialog: false,

    mobile_number: "",
    email: "",
    introduction: "",

    get_profile: {
      mobile_number: "",
      email: "",
      introduction: "",
    },

  }),

  methods: {

    submit_profile() {
      const formData = new FormData();
      formData.append("phone", this.mobile_number);
      formData.append("email", this.email);
      formData.append("intro", this.introduction);
      formData.append("user", this.$store.state.user.id);
      formData.append("slug", this.$store.state.user.username);

      const slug = this.$store.state.user.username;

      axios
        .patch(`/api/v1/customerprofile/${slug}/`, formData)
        // .then((response) => {
        //   console.log(response);
        // })
        // .catch((error) => {
        //   console.log(error);
        // });

      this.dialog = false;

      this.getCustomerProfile();

    },

    getCustomerProfile() {
      const slug = this.$store.state.user.username;
      axios
        .get(`/api/v1/customerprofile/${slug}/`)
        .then((response) => {
          // console.log(response.data);
          this.get_profile.mobile_number = response.data[0].phone;
          this.get_profile.email = response.data[0].email;
          this.get_profile.introduction = response.data[0].intro;

          this.mobile_number = response.data[0].phone;
          this.email = response.data[0].email;
          this.introduction = response.data[0].intro;
        })
        // .catch((error) => {
        //   console.log(error);
        // });
    },

  },

  created() { 
    this.getCustomerProfile();
  
  },

}



</script>

