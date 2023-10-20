<template>
  <v-main>
    <v-container>
      <LikedComponent />
    </v-container>
    <!-- src="https://dipeat-s3-bucket-1.s3.amazonaws.com/french-fries-removebg-preview.png" -->
    <div v-if="!$store.state.isAuthenticated" class="home-height">
      <div class="hero-large-bg">
        <v-row>
          <v-col cols="12" lg="5">
            <v-layout align-center justify-center>
              <img class="bg-large-image" src="https://dipeat-s3-bucket-1.s3.amazonaws.com/french-fries-removebg-preview.png"/>
            </v-layout>
          </v-col>
          <v-col cols="12" lg="7">
            <v-layout align-center justify-start fill-height>
              <div class="pa-6">
              <p class="text-h3 overline title-style ">
                <span class="font-style">{{ text }}</span><span class="font-style" v-if="showCursor==true">&nbsp;{{ showCursor==true? cursor:''  }}</span>
                <!-- Discover flavor, indulge senses, and shop your culinary desires here! -->
              </p>
              <div v-if="showLoginBtn == true" style="margin-top: 50px;">
                <Auth :btnType="typingText" />
              </div>
              
            </div>
            </v-layout>
            
          </v-col>
        </v-row>
      </div>
      <!-- <img :src="food1" class="bg-mobile-image" alt="BG Image" /> -->
      
      <div class="hero-mobile-bg">
        <img class="bg-mobile-image" src="https://dipeat-s3-bucket-1.s3.amazonaws.com/french-fries-removebg-preview.png"/>
        <div class="text-left ml-5 overline" style="min-height: 250px;">
          <span class="font-style">{{ text }}</span><span class="font-style" v-if="showCursor==true">&nbsp;{{ showCursor==true? cursor:''  }}</span>  
          <div v-if="showLoginBtn == true" style="margin-top: 30px;">
            <Auth :btnType="typingText" />
          </div>
          
        </div>
        
      </div>
    </div>

    <v-container v-if="foodOrdered != ''" class="mt-4">
      <v-card class="mx-auto">
        <v-row>
          <v-col cols="12" md="12" sm="12">
            <h3 class="ml-4 text-center brown--text">
              🍔~~ Order Details ~~🍟
            </h3>
            <v-container>
              <v-row justify="center">
                <v-col
                  cols="12"
                  sm="4"
                  v-for="(item, index) in foodOrdered"
                  :key="index + 0.55"
                >
                  <div
                    v-for="(shop, index) in shopProfileImage"
                    :key="index + 0.0129"
                  >
                    <v-card
                      class="mx-auto"
                      v-if="
                        item.delivered === false && shop.slug == item.restaurant
                      "
                      to="/order"
                      align="center"
                      max-width="auto"
                      color="grey lighten-5"
                      elevation="5"
                    >
                      <h4>
                        <u>{{ shop.owner_name }}</u>
                      </h4>

                      <body>
                        <v-row class="mt-1">
                          <v-col cols="4" sm="4">
                            <span>At: {{ item.arrival_time }}</span>
                          </v-col>
                          <v-col cols="4" sm="4">
                            <v-chip
                              outlined
                              color="primary"
                              v-if="item.takeaway == true"
                            >
                              <span>Takeaway</span>
                            </v-chip>
                            <v-chip outlined color="orange darken-4" v-else>
                              <span>Dine-In</span>
                            </v-chip>
                          </v-col>
                          <v-col cols="4" sm="4">
                            <span
                              ><v-icon>mdi-currency-inr</v-icon
                              >{{ item.total }}</span
                            >
                          </v-col>
                        </v-row>
                      </body>
                    </v-card>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <v-container id="top-restaurants">
      <TrendingRestaurants />
    </v-container>

    <div full-width class="mt-16" id="about-us" v-if="!$store.state.isAuthenticated">
      <AboutComponent />
    </div>

    

    <div v-if="!$store.state.isAuthenticated" id="we-offer">
      <WeOfferComponent />
    </div>

    <!-- <v-container v-if="!$store.state.isAuthenticated">
      <TopOrderComp />
    </v-container> -->

    <v-container v-if="commingSoon != ''">
      <ComingSoon />
    </v-container>
    
    <div   v-if="!$store.state.isAuthenticated">
      <Partner />
    </div>
  </v-main>
</template>

<script>
// import axios from "axios";
import api from "@/main";
// import signUp from "../components/signUp";
// import logIn from "../components/logIn";
import Auth from '../components/Auth'
import AboutComponent from "../components/Home/AboutComponent";
import WeOfferComponent from "../components/Home/WeOfferComponent";
import TopOrderComp from "../components/Home/TopOrderComp";
import Partner from "../components/Home/Partner";
import ComingSoon from "../components/Home/ComingSoon";
import TrendingRestaurants from "../components/Home/TrendingRestaurants";
import LikedComponent from "../components/Home/LikedComponent";

export default {
  name: "Home",

  components: {
    // signUp,
    // logIn,
    Auth,
    AboutComponent,
    WeOfferComponent,
    TopOrderComp,
    Partner,
    ComingSoon,
    TrendingRestaurants,
    LikedComponent,
  },

  data: () => ({
    
    colors: [
      "blue lighten-3",
      "warning",
      "pink lighten-2",
      "green accent-2",
      "deep-purple accent-1",
    ],
    // quote animation
    reqText:"Discover flavor, indulge senses, and shop your culinary desires here!",
    text: "",
    cursor: "|",
    showCursor:true,
    //button animation
    typingText: "",
    isTyping : true,
        isLoginChance : true,
        btnText : '',
        loginText : 'login',
        signUpText : 'signUp',
    amount: "",
    likeColor: "",
    menuItem: "",
    status: [],
    commingSoon: [],
    liveRestaurant: [],
    restaurantList: [],
    likedShops: [],
    foodOrdered: [],
    maxDiscount: [],
    shopProfileImage: [],
    shopProfileApproved: [],
  }),

  methods: {
    textAnimate() {
      let currentIndex = 0;
      const interval = setInterval(() => {
        this.text += this.reqText[currentIndex];
        currentIndex++;
        if (currentIndex === this.reqText.length) {
          clearInterval(interval);
        }
      }, 60);
    },
    animateCursor(){
      this.showCursor = !this.showCursor
    },
    typingEffect(){
            if(this.isTyping){
                this.btnText = this.isLoginChance ? this.loginText : this.signUpText;
                this.typingText += this.btnText.charAt(this.typingText.length);
                if(this.btnText.length === this.typingText.length){
                    setTimeout(this.eraseTyping , 800); // Wait for 1 second before erasing
                    this.isTyping = false;
                }
                else{
                    setTimeout(this.typingEffect , 100) //Adjust the typing speed as needed
                }
            }
        },
        eraseTyping(){
            if(!this.isTyping && this.typingText.length > 0){
                this.typingText = this.typingText.slice(0 , -1);
                setTimeout(this.eraseTyping , 100);
            }
            else{
                this.isLoginChance = !this.isLoginChance;
                setTimeout(this.typingEffect , 800);
                this.isTyping = true;
            }
        },


    sliderGroup(value) {
      // console.log(value);
    },

    async googleRegister() {
      // console.log("googleRegister");
      const googleUser = await this.$gAuth.signIn();
      console.log(googleUser);
    },

    phonePeValidation() {
      api.post("/api/v1/phonepe_validation/", {}).then((response) => {
        // console.log(response.data);
        // console.log(response.data.response.data.state);
      });

      this.foodOrders();
    },

    // get menu data from backend
    getMenu() {
      api.get("/api/v1/menu/").then((response) => {
        this.menuItem = response.data;
        // console.log(this.menuItem);

        this.maxDiscount = response.data.reduce((acc, cur) => {
          const found = acc.find((el) => el.restaurant === cur.restaurant);
          if (!found) {
            return acc.concat([cur]);
          } else if (found.discount < cur.discount) {
            found.discount = cur.discount;
          }
          return acc;
        }, []);
        for (let i = 0; i < this.menuItem.length; i++) {
          if (this.restaurantList.indexOf(this.menuItem[i].restaurant) === -1) {
            this.restaurantList.push(this.menuItem[i].restaurant);
          }
        }
      });
    },

    setRestaurant(item) {
      // localStorage.removeItem("username");
      this.$store.state.restaurant = item;
      localStorage.setItem("restaurant", item);
      // console.log(localStorage.getItem("restaurant"));
      this.$router.push(`/menu/${item}`);
    },

    shopStatus() {
      api.get(`/api/v1/shopstatus/`).then((res) => {
        this.status = res.data;
        // console.log(this.status);
        // filter shop coming soon
        this.commingSoon = this.status.filter(
          (item) => item.shop_coming_soon === true
        );
        this.liveRestaurant = this.status.filter(
          (item) => item.shop_coming_soon === false
        );
      });
    },

    favShop(shop) {
      this.$store.state.restaurant = shop;
      localStorage.setItem("restaurant", shop);
      this.$router.push(`/menu/${shop}`);
    },

    getLikedShop() {
      api.get("/api/v1/likedshop/").then((response) => {
        this.likedShops = response.data.filter(
          (item) =>
            item.customer === this.$store.state.user.username &&
            item.liked === true
        );
        // console.log(this.likedShops);
      });
    },

    async foodOrders() {
      const response = await api.get("/api/v1/foodorders/");
      const filteredData = response.data.filter(
        (item) => item.user === this.$store.state.user.username
      );
      // console.log(filteredData);
      this.foodOrdered = filteredData
        .reverse()
        .filter((item) => item.delivered === false);
    },

    getShopProfileImage() {
      api
        .get(`/api/v1/ClientProfile4Image/`)
        .then((res) => {
          this.shopProfileImage = res.data;
          this.shopProfileApproved = res.data;
          // console.log(this.shopProfileImage);
          // filter the data based on if it is approved or not
          this.shopProfileApproved = this.shopProfileApproved.filter(
            (item) => item.approved === true
          );

          // restaurants in this.liveRestaurant === this.shopProfileApproved should be same
          const approvedShopforLive = this.liveRestaurant.filter((item) =>
            this.shopProfileApproved.some((el) => el.slug === item.slug)
          );
          this.liveRestaurant = approvedShopforLive;

          const approvedShopforCommingSoon = this.commingSoon.filter((item) =>
            this.shopProfileApproved.some((el) => el.slug === item.slug)
          );
          this.commingSoon = approvedShopforCommingSoon;
        })
        .catch((err) => {
          // console.log("error is:" + err);
          if (this.$store.state.isAuthenticated && err != "") {
            localStorage.removeItem("token");
            this.$router.push("/");
          }
        });
    },
  },

  // computed: {
  // },

  mounted() {
    //typing Animation
    this.textAnimate();
    this.cursorInterval = setInterval(this.animateCursor , 350);
    this.typingEffect();
    // this.phonePeValidation();
    this.$eventBus.$on("callMethodLoginHomeRefresh", () => {
      this.getMenu();
      //this.shopStatus();
      this.getLikedShop();
      this.foodOrders();
      this.getShopProfileImage();
    });

    this.$eventBus.$on("phonePeValidation", () => {
      this.phonePeValidation();
    });
  },
  beforeDestroy(){
    clearInterval(this.cursorInterval)
  },

  created() {
    this.getMenu();
    this.shopStatus();
    this.getLikedShop();
    this.foodOrders();
    this.getShopProfileImage();
    this.phonePeValidation();
    
  },
  computed:{
    showLoginBtn(){
      return this.text.length===this.reqText.length
    },
  }
};
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Style+Script&display=swap'); */
/*Background Image for Large Devices*/

  @import url('https://fonts.googleapis.com/css2?family=Bonheur+Royale&family=Dancing+Script:wght@700&family=Galada&family=Pacifico&family=Style+Script&family=Tangerine:wght@700&family=Zeyada&display=swap');


  .bg-large-image {
  position: relative;
  height: 450px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  animation : scaleUp 1s infinite alternate;
}
@keyframes scaleUp{
  0%{
    transform: scale(1.02);
  }
  /* 50%{
    transform: scale(1.06);
  } */
  100%{
    transform : scale(1.1);
  }
}

/*Background Image for Mobile Devices*/
.bg-mobile-image {
  position: relative;
  height: auto;
  width: 90%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  animation : scaleUp 1s infinite alternate;
}
.font-style{
  /* font-family: 'Dancing Script', cursive; */
  /* font-family: 'Zeyada', cursive; */
  /* font-family: 'Tangerine', cursive; */
  /* font-family: 'Galada', cursive; */
  font-family: 'Bonheur Royale', cursive;
  font-weight: bold;
  letter-spacing: 1mm;
  word-spacing: 2mm;
  line-height-step: 30px;
  text-transform: none;
  font-size: 60px;
}

/*Responsiveness of Backgorund Image*/
@media only screen and (max-width: 450px) and (min-width: 100px) {
  .hero-large-bg {
    display: none;
  }
  .font-style{
    font-size: 40px;
  }
  .cursor{
    font-size:25px;
  }
}

@media only screen and (min-width: 451px) {
  .hero-mobile-bg {
    display: none;
  }
  
}

/*Hero Text or Heading Large Device*/
.hero-large-bg .hero-text-overlay {
  font-size: 2.8em;
  position: absolute;
  top: 27%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  color: rgb(100, 6, 207);
  font-family: "Great Vibes", cursive;
}

.hero-text-overlay h1 {
  overflow: hidden;
  border-right: 0.1em solid #6a1b9a;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: 0.15em;
  animation: typing 3.8s steps(40, end), blink-caret 0.75s step-end infinite;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #ab47bc;
  }
}

.home-height{
  margin : 10px 0px;
}

.hero-mobile-bg .hero-text-overlay {
  font-size: 0.8em;
  position: absolute;
  top: 6.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  color: rgb(100, 6, 207);
  font-family: "Great Vibes", cursive;
}

@media only screen and (min-width: 1920px) {
  .hero-large-bg .hero-text-overlay {
    font-size: 2em;
  }
}

@media only screen and (min-width: 1400px) and (max-width: 1919px) {
  .hero-large-bg .hero-text-overlay {
    font-size: 2em;
  }
}

@media only screen and (min-width: 1024px) and (max-width: 1399px) {
  .hero-large-bg .hero-text-overlay {
    font-size: 2.5em;
  }
}

/*How it works Section*/
#how-it-works {
  width: 70%;
  margin: 40px auto;
  text-align: center;
  font-size: 1.8rem;
  font-family: "Montserrat", sans-serif;
}

.container-flex {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
}

.box {
  border: 1px solid #b2b2b2;
  padding: 25px 25px;
  margin: 0 15px;
  border-radius: 10px;
  font-size: 18px;
  transition: 0.3s ease;
  cursor: pointer;
}

.box h3 {
  font-size: 1.5rem;
}

.box .mdi-food,
.mdi-seat-recline-normal,
.mdi-run {
  font-size: 2rem;
}

.box ion-icon {
  font-size: 35px;
  color: #fe5722;
  margin: 15px 0;
}

.box.active,
.box:hover {
  color: #032ebd;
  background: #3c3d3d;
  border: 3px solid;
  border-color: #f06292;
  transition: linear 350ms;
  animation-timing-function: 1s;
}

.box.active ion-icon,
.box:hover ion-icon {
  color: #fff;
}

@media only screen and (max-width: 450px) and (min-width: 100px) {
  .container-flex {
    flex-direction: column;
  }

  .box {
    margin: 10px;
  }

  #how-it-works {
    font-size: 1.5rem;
  }
}

/*Food Items Section*/

/* .menu-item {
  width: 260px;
  margin: 20px auto;
  border-radius: 6px;
  overflow: hidden;
}

.menu-item img {
  width: 100%;
  height: auto;
  border-radius: 20%;
} */

.about-justify {
  text-align: justify;
  text-justify: distribute;
}

.order {
  justify-content: space-between;
}

@media only screen and (max-width: 450px) and (min-width: 100px) {
  .restaurant-menu {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
