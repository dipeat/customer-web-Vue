<template>
  <div>
    <v-btn
      class="btnStyle"
      style="width: 100px; height: 50px; margin: 0px; font-size: 16px"
      rounded
      color="primary"
      dark
      @click.stop="dialog = true"
      :key="btnType"
    >
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
            <div style="width: 20px"></div>
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
              v-model="loginEmail"
              color="primary"
              counter
              maxlength="50"
              label="Email"
              :rules="emailRules"
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
          <!-- <div>
            <GoogleAuth />
          </div> -->
          <v-card-actions>
            <a href="/forget-password" class="caption">Forgot Password?</a>
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
          <!-- <div>
            <GoogleAuth />
          </div> -->
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

    <v-dialog v-model="verificationPopup" max-width="380px" dark>
      <v-card class="pa-4" align-center justify-center>
        <v-card-text align-center justify-center>
          {{ signUpResponse }}
        </v-card-text>
        <v-card-actions>
          <v-btn @click="verificationPopup = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "@/main";
import GoogleAuth from "./GoogleAuth";
export default {
  components: {
    GoogleAuth,
  },
  props: {
    btnType: String,
  },
  data() {
    return {
      dialog: false,
      verificationPopup: false,
      isLogin: true,
      show1: false,
      show2: false,
      show3: false,
      valid1: true,
      valid2: true,
      userid: "",
      signUpResponse: "",
      loginEmail: "",
      loginPassword: "",
      username: "",
      email: "",
      password: "",
      password1: "",
      errors: [],
      errorMessages: "",

      // logInNameRules: [
      //   (v) => !!v || "Username is required",
      //   (v) => v.length <= 9 || "Username must be less than 10 characters",
      //   (v) => v.length >= 3 || "Username must be atleast 3 characters",
      // ],

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
          .post("/api/v1/signin/email/customer/", {
            email: this.loginEmail.toLowerCase(),
            password: this.loginPassword,
          })
          .then((response) => {
            //console.log(response);
            if (response.data.message === "You are Successfully logged in") {
              this.userid = response.data.id;
              // console.log(res);
              this.$store.commit("setUser", {
                username: response.data.email
                  .toLowerCase()
                  .split("@gmail.com")[0],
                id: response.data.id,
              });
              localStorage.setItem(
                "username",
                response.data.email.toLowerCase().split("@gmail.com")[0]
              );
              localStorage.setItem("userid", this.userid);
              const token = this.userid;
              this.$store.commit("setToken", token);
              api.defaults.headers.common["Authorization"] = "Token " + token;
              localStorage.setItem("token", token);

              this.dialog1 = false;
              if (
                localStorage.getItem("restaurant") == "" ||
                localStorage.getItem("restaurant") == null ||
                localStorage.getItem("restaurant") == undefined
              ) {
                this.$router.push("/");
              }

              setTimeout(() => {
                window.location.reload();
              }, 1000);
              this.$eventBus.$emit("callMethodLoginHomeRefresh");
            } else if (response.data === "Invalid Username or Password") {
              this.errorMessages = "Invalid username or password";
            } else if (response.data === "Please Verify Your Account") {
              this.errorMessages = "Please Verify Your Account";
            } else if (response.data === "You are Not a Customer") {
              this.errorMessages = "You do not have a account. Please sign-up.";
            }

            setTimeout(() => {
              this.errorMessages = "";
            }, 5000);
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
          // username: this.username.toLowerCase(),
          email: this.email.toLowerCase(),
          password: this.password,
          // password1: this.password1,
        };
        api
          .post("/api/v1/signup/email/customer", formData)
          .then((response) => {
            this.dialog = false;
            this.verificationPopup = true;
            //console.log(response.data.email[0]);
            //console.log(response);
            if (response.data === "Customer Successfully Created") {
              this.signUpResponse =
                "Your account is created,Please check your email for verification !";
            } else if (
              response.data.email[0] === "user with this email already exists."
            ) {
              this.signUpResponse = "Email  Already Exists, Try Logging In.";
              // setTimeout(() => {
              //   alert("Email  Already Exists, Try Logging In.");
              // }, 1000);
            }

            // setTimeout(() => {
            //   alert("Please check your email for verification !");
            // }, 1000);
          })
          .catch((error) => {
            //console.log(error)
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
