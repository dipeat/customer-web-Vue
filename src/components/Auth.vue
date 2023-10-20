<template>
  <div>
    <v-btn
      class="btnStyle"
      style="width: 100px;height: 50px; margin: 0px; font-size: 16px;"
      rounded
      color="primary"
      dark
      @click.stop="dialog = true"
    :key="btnType">
      {{ btnType }}
    </v-btn>

    <v-dialog dark v-model="dialog" max-width="380px">
      <v-card class="pa-4">
        <v-card-title justify-center align-center>
          <v-row justify="center" align="center">
            <v-btn
              rounded
              x-large
              :text="!isLogin"
              :color="isLogin == true ? 'primary' : ''"
              @click="isLogin = true"
              >Login</v-btn
            >
            <div style="width: 20px;"></div>
            <v-btn
              rounded
              x-large
              :text="isLogin"
              :color="isLogin == false ? 'primary' : ''"
              @click="isLogin = false"
              >SignUp</v-btn
            >
          </v-row>
        </v-card-title>

        <v-form
          v-if="isLogin == true"
          @submit.prevent="logIn"
          ref="form1"
          v-model="valid1"
          lazy-validation
        >
          <v-card-text>
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
              v-model="loginUsername"
              color="primary"
              counter
              maxlength="9"
              label="Username"
              :rules="logInNameRules"
            />
            <v-text-field
              v-model="loginPassword"
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              color="primary"
              counter
              name="input-10-1"
              @keyup.enter="logIn"
              maxlength="30"
              label="Password"
              :rules="logInPasswordRules1"
              @click:append="show3 = !show3"
              :type="show3 ? 'text' : 'password'"
              hint="At least 8 characters"
            />
          </v-card-text>
          <div>
            <GoogleAuth/>
          </div>
          <v-card-actions>
            <a href="" class="caption">Forgot Password?</a>
            <v-spacer></v-spacer>

            <v-btn color="red" text @click="dialog = false"> Cancel </v-btn>

            <v-btn dark color="primary" text @click="logIn"> Login </v-btn>
          </v-card-actions>
        </v-form>
        <v-form
          v-else
          @submit.prevent="signUp"
          ref="form2"
          v-model="valid2"
          lazy-validation
        >
          <v-card-text>
            <v-text-field
              color="primary"
              v-model="username"
              :rules="signUpNameRules"
              label="Username"
              counter
              maxlength="9"
            />
            <v-text-field
              color="primary"
              v-model="email"
              label="Email"
              counter
              maxlength="50"
              :rules="emailRules"
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
          <div>
            <GoogleAuth/>
          </div>
          <div class="caption">
            Note: By clicking "Register" you agree to our
            <a href="http://dipeat.com/terms_and_conditions"
              >Terms & Conditions</a
            >, and
            <a href="http://dipeat.com/privacy_policy">Privacy Policy</a>.
          </div>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="red" text @click="dialog = false"> Cancel </v-btn>

            <v-btn color="primary" text @click="signUp"> Register </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "@/main";
import GoogleAuth from './GoogleAuth'
export default {
  components:{
    GoogleAuth  
  },
  props: {
    btnType: String,
  },
  data() {
    return {
      dialog: false,
      isLogin: true,
      show1: false,
      show2: false,
      show3: false,
      valid1: true,
      valid2: true,
      loginUsername: "",
      loginPassword: "",
      username: "",
      email: "",
      password: "",
      password1: "",
      errors: [],
      errorMessages: "",


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
      signUpNameRules: [
        (v) => !!v || "Username is required",
        (v) => v.length <= 9 || "Username must be less than 10 characters",
        (v) => v.length >= 3 || "Username must be atleast 3 characters",
      ],
      emailRules: [
        (v) => !!v || "Email is required", // Required validation
        (v) => /.+@.+\..+/.test(v) || "Enter a valid email address", // Email format validation
      ],

      signUpPasswordRules1: [
        (v) => !!v || "Password is required",
        (v) => v.length <= 30 || "Password must be less than 30 characters",
        (v) => v.length >= 8 || "Password must be atleast 8 characters",
      ],
    };
  },
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
              if (
                localStorage.getItem("restaurant") == "" ||
                localStorage.getItem("restaurant") == null ||
                localStorage.getItem("restaurant") == undefined
              ) {
                this.$router.push("/");
              }
              this.$eventBus.$emit("callMethodLoginHomeRefresh");
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
    signUp() {
      if (this.$refs.form2.validate()) {
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
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }
              console.log(JSON.stringify(error.response.data));
              this.errorMessages = JSON.stringify(error.response.data);
              setTimeout(() => {
                this.errorMessages = "";
              }, 5000);
            } else if (error.message) {
              this.errorMessages.push(
                "Something went wrong, Please try again."
              );
              console.log(JSON.stringify(error));
              this.errorMessages = JSON.stringify(error);
              setTimeout(() => {
                this.errorMessages = "";
              }, 5000);
            }
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

  computed: {
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
};
</script>

<style scoped>
.btnStyle {
  transition: opacity 2 s ease-in-out;
  text-align: left;
}
</style>
