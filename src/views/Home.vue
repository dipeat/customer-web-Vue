<template>
  <v-main>
    <h4 v-if="likedShops != '' && shopProfileApproved != ''">Favorite Shops</h4>

    <v-slide-group v-model="sliderGroup" center-active v-if="likedShops != ''">
      <span v-for="(image, index) in shopProfileApproved" :key="index + 0.0159">
        <v-slide-item
          v-for="(shops, index) in likedShops"
          :key="index + 0.0011"
          v-slot="{ active, toggle }"
        >
          <v-card
            :color="active ? 'transparent' : 'grey lighten-1'"
            class="ma-1"
            height="120"
            width="120"
            @click="
              toggle();
              favShop(shops.shop);
            "
            v-if="image.approved == '1' && image.slug == shops.shop"
          >
            <v-row class="fill-height">
              <div>
                <v-scale-transition>
                  <v-avatar class="ma-2" size="125" tile v-if="image.slug == shops.shop">
                    <v-img :src="image.shop_image" @click="favShop(shops.shop)">
                      <v-row align="end" justify="center">
                        <v-chip
                          color="black"
                          small
                          size="58"
                          label
                          class="white--text mb-5"
                          >{{ image.owner_name }}
                        </v-chip>
                      </v-row>
                    </v-img>
                  </v-avatar>
                </v-scale-transition>
              </div>
            </v-row>
          </v-card>
        </v-slide-item>
      </span>
    </v-slide-group>

    <div v-if="!$store.state.isAuthenticated" class="mt-3">
      <div class="hero-large-bg">
        <img
          src="https://dipeat-s3-bucket-1.s3.amazonaws.com/french-fries.jpg"
          class="bg-large-image"
          alt="BG Image"
        />
        <!-- <div class="hero-text-overlay">
          <h1>It's not about food, It's about Experience.</h1>
        </div> -->
        <div
          class="text-center text-h3 overline"
          v-text="`It's all about taste & Experience.`"
        ></div>
      </div>

      <div class="hero-mobile-bg">
        <!-- <div class="hero-text-overlay">
          <h1>
            It's not about food, <br />
            It's about Experience.
          </h1>
        </div> -->
        <img
          src="https://dipeat-s3-bucket-1.s3.amazonaws.com/french-fries.jpg"
          class="bg-mobile-image"
          alt="BG Image"
        />
        <div
          class="text-center overline"
          v-text="`It's all about taste & Experience.`"
        ></div>
      </div>
    </div>

    <div class="mt-10" v-if="!$store.state.isAuthenticated">
      <div class="mx-auto text-center">
        <a><logIn /></a>&nbsp;&nbsp;&nbsp;
        <a><signUp /></a>
      </div>
    </div>

    <!-- <v-btn @click="googleRegister()">G</v-btn> -->

    <v-container v-if="foodOrdered != ''" class="mt-4">
      <v-card class="mx-auto">
        <v-row>
          <v-col cols="12" md="12" sm="12">
            <h3 class="ml-4 text-center brown--text">🍔~~ Order Details ~~🍟</h3>
            <v-container>
              <v-row justify="center">
                <v-col
                  cols="12"
                  sm="4"
                  v-for="(item, index) in foodOrdered"
                  :key="index + 0.55"
                >
                  <div v-for="(shop, index) in shopProfileImage" :key="index + 0.0129">
                    <v-card
                      class="mx-auto"
                      v-if="item.delivered === false && shop.slug == item.restaurant"
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
                            <v-chip outlined color="primary" v-if="item.takeaway == true">
                              <span>Takeaway</span>
                            </v-chip>
                            <v-chip outlined color="orange darken-4" v-else>
                              <span>Dine-In</span>
                            </v-chip>
                          </v-col>
                          <v-col cols="4" sm="4">
                            <span><v-icon>mdi-currency-inr</v-icon>{{ item.total }}</span>
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

    <v-container>
      <div class="top-orders" id="top-restaurants">
        <v-row class="mt-5">
          <v-col sm="" cols="2">
            <v-divider color="red" class="mt-10"></v-divider>
          </v-col>
          <v-col sm="3" cols="8">
            <div class="text-center mt-3">
              <h2 class="purple--text text-h3">
                <strong>Trending</strong>
              </h2>
              <div class="red--text caption"><u># 5% off on every order</u></div>
            </div>
          </v-col>
          <v-col sm="" cols="2">
            <v-divider color="red" class="mt-10"></v-divider>
          </v-col>
        </v-row>

        <v-row class="mt-3">
          <v-col
            cols="6"
            sm="4"
            v-for="(item, index) in liveRestaurant"
            :key="index + 0.1101"
          >
            <div>
              <div v-for="(image, index) in shopProfileApproved" :key="index + 0.0019">
                <v-sheet rounded="lg" v-if="image.slug == item.restaurant">
                  <v-card
                    class="mx-auto"
                    max-width="400"
                    @click="setRestaurant(image.slug)"
                  >
                    <v-row dense>
                      <v-col :cols="12">
                        <div class="text-center">
                          <v-img
                            :src="image.shop_image"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            min-height="100px"
                            max-height="100px"
                            @click="setRestaurant(image.slug)"
                          >
                            <v-chip class="mb-1" color="white align-bottom" small>
                              <div class="purple--text font-weight-bold">
                                {{ image.owner_name }}
                              </div>
                            </v-chip>
                          </v-img>
                        </div>

                        <v-card-actions @click="setRestaurant(image.slug)">
                          <v-spacer></v-spacer>

                          <div
                            v-for="(shopDiscount, index) in maxDiscount"
                            :key="index + 0.0043"
                          >
                            <v-chip
                              small
                              outlined
                              color="purple"
                              dark
                              v-if="
                                item.restaurant == shopDiscount.restaurant &&
                                shopDiscount.discount > 0 &&
                                item.open_close
                              "
                              ><div>
                                <strong class="red--text caption"
                                  ><strong
                                    >{{ shopDiscount.discount }}% off</strong
                                  ></strong
                                >
                              </div>
                            </v-chip>
                          </div>
                          <div v-if="!item.shop_coming_soon">
                            <div v-if="!item.open_close">
                              <strong class="red--text">Closed</strong>
                            </div>
                          </div>
                          <div v-if="item.shop_coming_soon">
                            <strong class="red--text caption"
                              ><strong>Comming Soon</strong></strong
                            >
                          </div>
                        </v-card-actions>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-sheet>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>

    <v-container id="about-us" v-if="!$store.state.isAuthenticated">
      <v-card
        max-width="1570"
        class="loggedIn-nav mx-auto border border-danger"
        elevation="2"
        dark
      >
        <!-- About Us -->
        <v-card-actions>
          <v-row>
            <v-col cols="12" sm="4">
              <div class="text-start text-h5 ml-2"><strong>About</strong></div>
              <div class="menu-item text-center">
                <v-img
                  src="https://dipeat-s3-bucket-1.s3.amazonaws.com/simple_logo.png"
                  alt=""
                />
              </div>
            </v-col>
            <v-col cols="12" sm="8">
              <div class="mt-5 about-justify">
                We are a team of fooodiess❗, who loves the taste of food when our
                taste-bud explodes🤯. Yes, you guessed us right we are pro chatkara-type
                eater. The taste of food increase many folds when the meal is served like
                a pro, on-time, no-waiting. Here in dipEAT, we are happy to facilitate you
                with dine-in and takeaway checkouts. Book your order according to your
                convenience and time. We all want to receive food as soon as possible when
                we order food in the restaurant. Our goal is simple, book order before
                leaving your place and food is served as you put your foot in the
                restaurant according to your arrival-time.<br />
                Peace✌️
              </div>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-container>

    <!-- <div id="how-it-works" v-if="!$store.state.isAuthenticated">
      <div class="container-flex">
        <div class="box">
          <h3>Zero Waiting Time</h3>
          <h2 class="red--text text-h1"><strong>0</strong></h2>
          (apx.)
          <p>Login/SignUp and give order online before leaving your place.</p>
        </div>
        <div class="box">
          <h3>DineIn/ TakeAway</h3>
          <v-icon x-large color="blue-grey">mdi-silverware-variant</v-icon>
          <p>
            Choose your preference of Dine-In or TakeAway, and get food at your selected
            time.
          </p>
        </div>

        <div class="box">
          <h3>Pricing</h3>
          <v-icon x-large color="orange darken-1">mdi-wallet</v-icon>
          <p>Select the cuisine as of your choice at price as low as shop menu.</p>
        </div>
      </div>
    </div> -->
    <div class="text-center box mt-7 mb-7">
      <h2 class="pink--text text-h3 mb-5"><strong>We Offer</strong></h2>
      <v-row class="text-center">
        <v-col>
          <v-card color="grey lighten-4" class="box" height="350" width="290">
            <h3>Zero Waiting Time</h3>
            <v-row class="text-end ml-15 mt-2">
              <v-col>
                <h2 class="red--text text-h1"><strong>0</strong></h2>
              </v-col>
              <v-col class="text-start mt-14">(apx.)</v-col>
            </v-row>

            <p class="mt-5">
              Login/SignUp and give order online before leaving your home or office.
            </p>
          </v-card>
        </v-col>
        <v-col>
          <v-card color="grey lighten-4" class="box" height="350" width="290">
            <h3>DineIn & TakeAway</h3>
            <v-icon class="mt-12" x-large color="pink">mdi-food</v-icon>
            <p class="mt-12">
              Choose your preference of Dine-In or TakeAway, and get food at your selected
              time.
            </p>
          </v-card>
        </v-col>
        <v-col>
          <v-card color="grey lighten-4" class="box" height="350" width="290">
            <h3>Same Prices</h3>
            <v-icon class="mt-12" x-large color="teal">mdi-currency-inr</v-icon>
            <p class="mt-12">
              Select the cuisine as of your choice at price as low as shop menu.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- <v-carousel
      class="mt-3"
      cycle
      height="200"
      hide-delimiter-background
      show-arrows-on-hover
      delimiter-icon="mdi-chevron-right"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h3 pa-3 text-center">{{ slide }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel> -->

    <div class="top-orders" v-if="!$store.state.isAuthenticated">
      <h1><u>Smart platform, Smart service.</u></h1>
      <div class="restaurant-menu">
        <div class="menu-item">
          <img src="https://dipeat-s3-bucket-1.s3.amazonaws.com/pizza.jpg" alt="" />

          <div class="title grey--text">Pizza</div>
        </div>

        <div class="menu-item">
          <img
            src="https://dipeat-s3-bucket-1.s3.amazonaws.com/fresh-cold-orange-juice.jpg"
            alt=""
          />

          <div class="title grey--text">Healthy Drinks</div>
        </div>

        <div class="menu-item">
          <img
            src="https://dipeat-s3-bucket-1.s3.amazonaws.com/dosa-compressed.jpg"
            alt=""
          />

          <div class="title grey--text">Masala Dosa</div>
        </div>
      </div>
    </div>

    <v-container v-if="commingSoon != ''">
      <div class="top-orders commingsoonbox mt-5 mb-5" id="top-restaurants">
        <h1 class="red--text text-h4"><u>Comming Soon</u></h1>

        <v-row class="mt-3">
          <v-col
            cols="6"
            sm="4"
            v-for="(item, index) in commingSoon"
            :key="index + 0.1101"
          >
            <div>
              <div v-for="(image, index) in shopProfileApproved" :key="index + 0.0019">
                <v-sheet rounded="lg" v-if="image.slug == item.restaurant">
                  <v-card
                    class="mx-auto"
                    max-width="400"
                    @click="setRestaurant(image.slug)"
                  >
                    <v-row dense>
                      <v-col :cols="12">
                        <div class="text-center">
                          <v-img
                            :src="image.shop_image"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            min-height="100px"
                            max-height="100px"
                            @click="setRestaurant(image.slug)"
                          >
                            <v-chip class="mb-1" color="white align-bottom" small>
                              <div class="purple--text font-weight-bold">
                                {{ image.owner_name }}
                              </div>
                            </v-chip>
                          </v-img>
                        </div>

                        <v-card-actions @click="setRestaurant(image.slug)">
                          <v-spacer></v-spacer>

                          <div
                            v-for="(shopDiscount, index) in maxDiscount"
                            :key="index + 0.0043"
                          >
                            <v-chip
                              small
                              outlined
                              color="purple"
                              dark
                              v-if="
                                item.restaurant == shopDiscount.restaurant &&
                                shopDiscount.discount > 0 &&
                                item.open_close
                              "
                              ><div>
                                <strong class="red--text caption"
                                  ><strong
                                    >{{ shopDiscount.discount }}% off</strong
                                  ></strong
                                >
                              </div>
                            </v-chip>
                          </div>
                          <div v-if="!item.shop_coming_soon">
                            <div v-if="!item.open_close">
                              <strong class="red--text">Closed</strong>
                            </div>
                          </div>
                          <div v-if="item.shop_coming_soon">
                            <strong class="red--text caption"
                              ><strong>Comming Soon</strong></strong
                            >
                          </div>
                        </v-card-actions>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-sheet>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-container>

    <div v-if="!$store.state.isAuthenticated" class="text-h3 pa-3 mt-3 text-center">
      <strong>Our Partners</strong>
    </div>
    <v-carousel hide-delimiters cycle show-arrows-on-hover height="400">
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
  </v-main>
</template>

<script>
// import axios from "axios";
import api from "@/main";

// import image from "../assets/burger.png";
// import bglargeimage from "../assets/bg-large.gif";
// import bgmobileimage from "../assets/bg-mobile.gif";
import signUp from "../components/signUp.vue";
import logIn from "../components/logIn.vue";

export default {
  name: "Home",

  components: {
    signUp,
    logIn,
  },

  data: () => ({
    colors: [
      "blue lighten-3",
      "warning",
      "pink lighten-2",
      "green accent-2",
      "deep-purple accent-1",
    ],

    slides: [
      "Open Menu",
      "Select Cuisine",
      "Set Arrival Time",
      "Done Payment",
      "Hurry Up! Food is waiting for you!",
    ],
    items: [
      {
        src: "https://dipeat-s3-bucket-1.s3.amazonaws.com/hoy+punjab+logo.jpg",
      },
      {
        src: "https://dipeat-s3-bucket-1.s3.amazonaws.com/punjXpres+logo.jpg",
      },
      {
        src: "https://dipeat-s3-bucket-1.s3.amazonaws.com/creamplanet+image.jpg",
      },
      {
        src:
          "https://dukaan-core-file-service.s3.ap-southeast-1.amazonaws.com/upload_file_service/9f6c9dca-881e-45f7-947c-6bcdff6a4473/simm-kitchen-logo-1.jpg",
      },
    ],

    amount: "",

    // image: image,
    // bglargeimage: bglargeimage,
    // bgmobileimage: bgmobileimage,

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

    // checkout() {
    //   // console.log("checkout");

    //   api.post("/api/v1/foodorders/", {
    //     restaurant: localStorage.getItem("restaurant"),
    //     user: localStorage.getItem("orderUser"),
    //     takeaway: localStorage.getItem("takeaway"),
    //     order_date: localStorage.getItem("order_date"),
    //     prepare_time: localStorage.getItem("prepare_time"),
    //     food_name: localStorage.getItem("food_name"),
    //     total: localStorage.getItem("total"),
    //     message: localStorage.getItem("message"),
    //     arrival_time: localStorage.getItem("arrival_time"),
    //     slug: localStorage.getItem("slug"),
    //   });
    // },

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

        // for (let i = 0; i < response.data.length; i++) {
        //   console.log(response.data[i]);
        // }
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
        this.commingSoon = this.status.filter((item) => item.shop_coming_soon === true);
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
            item.customer === this.$store.state.user.username && item.liked === true
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
  //   shopCommingSoon() {
  //     const commingSoon = this.status.filter((item) => item.shop_coming_soon === false);

  //     return commingSoon;
  //   },
  // },

  mounted() {
    // this.phonePeValidation();
    this.$eventBus.$on("callMethodLoginHomeRefresh", () => {
      this.getMenu();
      this.shopStatus();
      this.getLikedShop();
      this.foodOrders();
      this.getShopProfileImage();
    });

    this.$eventBus.$on("phonePeValidation", () => {
      this.phonePeValidation();
    });
  },

  created() {
    this.getMenu();
    this.shopStatus();
    this.getLikedShop();
    this.foodOrders();
    this.getShopProfileImage();
    this.phonePeValidation();
  },
};
</script>

<style scoped>
.loggedIn-nav {
  background-image: linear-gradient(135deg, #0e0414 0%, #5905a7 100%);
}
/*Background Image for Large Devices*/
.bg-large-image {
  position: relative;
  height: 700px;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}

/*Background Image for Mobile Devices*/
.bg-mobile-image {
  position: relative;
  height: auto;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}

/*Responsiveness of Backgorund Image*/
@media only screen and (max-width: 450px) and (min-width: 100px) {
  .hero-large-bg {
    display: none;
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

.commingsoonbox {
  border: 1px solid #b2b2b2;
  padding: 25px 25px;
  margin: 0 0px;
  border-radius: 10px;
  font-size: 18px;
  transition: 0.3s ease;
  cursor: pointer;
}
.commingsoonbox:hover {
  color: #5729ff;
  background: #fdd3ba;
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
.top-orders {
  font-family: "Montserrat", sans-serif;
}

.top-orders h1 {
  margin: 30px auto;
  text-align: center;
  font-size: 2rem;
}

.restaurant-menu {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.menu-item {
  width: 260px;
  margin: 20px auto;
  border-radius: 6px;
  overflow: hidden;
}

.menu-item img {
  width: 100%;
  height: auto;
  border-radius: 20%;
}

.about-justify {
  text-align: justify;
  text-justify: distribute;
}

.order {
  justify-content: space-between;
}

.title {
  font-size: 22px;
  font-weight: 600;
  margin: 8px 0;
  text-align: center;
}

@media only screen and (max-width: 450px) and (min-width: 100px) {
  .restaurant-menu {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
