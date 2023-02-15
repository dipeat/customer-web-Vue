<template>
  <v-main>
    <h4 v-if="likedShops != ''">Favorite Shops</h4>
    <v-slide-group v-model="sliderGroup" center-active v-if="likedShops != ''">
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
          to="/menu"
        >
          <v-row class="fill-height">
            <div v-for="(image, index) in shopProfileImage" :key="index + 0.0019">
              <v-scale-transition>
                <v-avatar class="ma-2" size="125" tile v-if="image.slug == shops.shop">
                  <v-img :src="image.shop_image" @click="favShop(shops.shop)">
                    <v-row align="end" justify="center">
                      <v-chip color="black" small size="58" label class="white--text ma-3"
                        >{{ shops.shop }}
                      </v-chip>
                    </v-row>
                  </v-img>
                </v-avatar>
              </v-scale-transition>
            </div>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <div v-if="!$store.state.isAuthenticated" class="mt-3">
      <div class="hero-large-bg">
        <img
          src="https://crisp-restaurant-picture.s3.ap-south-1.amazonaws.com/homePage-static-image/pizza-ingredients.jpg"
          class="bg-large-image"
          alt="BG Image"
        />
        <div class="hero-text-overlay">
          <h1>
            It's not just food, <br />
            It's an Experience
          </h1>
        </div>
      </div>

      <div class="hero-mobile-bg">
        <img
          src="https://crisp-restaurant-picture.s3.ap-south-1.amazonaws.com/homePage-static-image/pizza-ingredients.jpg"
          class="bg-mobile-image"
          alt="BG Image"
        />
        <div class="hero-text-overlay">
          <h1>
            It's not just food, <br />
            It's an Experience
          </h1>
        </div>
      </div>
    </div>

    <div id="how-it-works" v-if="!$store.state.isAuthenticated">
      <h2>How It Works</h2>

      <div class="container-flex">
        <div class="box">
          <h3>Zero Waiting</h3>
          <v-icon color="red">mdi-food</v-icon>
          <p>Login/SignUp and give order online before leaving your place.</p>
        </div>
        <div class="box">
          <h3>DineIn/ TakeAway</h3>
          <v-icon color="brown">mdi-seat-recline-normal</v-icon
          ><v-icon color="black">mdi-run</v-icon>
          <p>
            Choose your preference of DineIn or TakeAway, and get food at your selected
            time.
          </p>
        </div>

        <div class="box">
          <h3>Pricing</h3>
          <v-icon color="orange darken-1">mdi-wallet</v-icon>
          <p>Select the cuisine as of your choice at price as low as shop menu.</p>
        </div>
      </div>
    </div>

    <v-carousel
      cycle
      height="200"
      hide-delimiter-background
      show-arrows-on-hover
      delimiter-icon="mdi-chevron-right"
      v-if="!$store.state.isAuthenticated"
    >
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h3 pa-3 text-center">{{ slide }}</div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>

    <div class="top-orders" v-if="!$store.state.isAuthenticated">
      <h1><u>Your choices, Our Service</u></h1>
      <div class="restaurant-menu">
        <div class="menu-item">
          <img
            src="https://crisp-restaurant-picture.s3.ap-south-1.amazonaws.com/homePage-static-image/piiiza.jpg"
            alt=""
          />

          <div class="title">Pizza</div>
        </div>

        <div class="menu-item">
          <img
            src="https://crisp-restaurant-picture.s3.ap-south-1.amazonaws.com/homePage-static-image/healthyDrinks.jpeg"
            alt=""
          />

          <div class="title">Healthy Drinks</div>
        </div>

        <div class="menu-item">
          <img
            src="https://crisp-restaurant-picture.s3.ap-south-1.amazonaws.com/homePage-static-image/dosa.jpeg"
            alt=""
          />

          <div class="title">Masala Dosa</div>
        </div>
      </div>
    </div>

    <v-container v-if="foodOrdered != ''" class="mt-4">
      <v-card class="mx-auto">
        <v-row>
          <v-col cols="12" md="12" sm="12">
            <h3 class="ml-4 text-center brown--text">🍔🍕~~ Order Details ~~🥗🍟</h3>
            <v-container>
              <v-row justify="center">
                <v-col
                  cols="12"
                  sm="4"
                  v-for="(item, index) in foodOrdered"
                  :key="index + 0.55"
                >
                  <v-card
                    class="mx-auto"
                    v-if="item.delivered === false"
                    to="/order"
                    align="center"
                    max-width="auto"
                    color="grey lighten-5"
                    elevation="5"
                  >
                    <h4>
                      <u>{{ item.restaurant }}</u>
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
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <v-container id="about-us" v-if="!$store.state.isAuthenticated">
      <v-card
        max-width="1570"
        class="loggedIn-nav mx-auto border border-danger"
        elevation="2"
        dark
      >
        <!-- About Us -->
        <v-card-title class="text-start text-h5"><strong>About Us</strong></v-card-title>
        <v-card-actions>
          <v-row>
            <v-col cols="12" sm="4">
              <div class="menu-item text-center">
                <v-img
                  src="https://crisp-restaurant-picture.s3.ap-south-1.amazonaws.com/homePage-static-image/pexels-skitterphoto-877220.jpg"
                  alt=""
                />
              </div>
            </v-col>
            <v-col cols="12" sm="8">
              <div>
                We are a team of fooodiess❗, who loves the taste of food when our
                taste-bud explodes🤯. Yes, you guessed us right we are pro chatkara-type
                eater. The taste of food increase many folds when the meal is served like
                a pro, on-time, no-waiting. Waiting for food is the only thing which we do
                not like. Here in dipEAT, we are happy to facilitate you with dine-in and
                takeaway checkouts. Book your order according to your convenience and
                time. We all want to receive food as soon as possible when we order food
                in the restaurant. Our goal is simple, book order before leaving your
                place and food is served as you put your foot in the restaurant.<br />
                Peace✌️
              </div>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-container>

    <v-container>
      <div class="top-orders" id="top-restaurants">
        <h1><u>Trending</u></h1>

        <v-row>
          <v-col cols="6" sm="4" v-for="(item, index) in status" :key="index">
            <v-sheet rounded="lg" min-height="268">
              <v-card
                class="mx-auto"
                max-width="400"
                @click="setRestaurant(item.restaurant)"
                to="/menu"
              >
                <v-row dense>
                  <v-col :cols="12">
                    <div v-for="(image, index) in shopProfileImage" :key="index + 0.009">
                      <v-img
                        :src="image.shop_image"
                        v-if="image.slug == item.restaurant"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        max-height="200px"
                        @click="setRestaurant(item.restaurant)"
                      >
                      </v-img>
                    </div>

                    <v-card-actions @click="setRestaurant(item.restaurant)">
                      <div>
                        <strong>{{ item.restaurant }}</strong>
                      </div>
                      <v-spacer></v-spacer>

                      <div
                        v-for="(shopDiscount, index) in maxDiscount"
                        :key="index + 0.003"
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
                          >{{ shopDiscount.discount }}% off</v-chip
                        >
                      </div>
                      <div v-if="!item.open_close">
                        <strong class="red--text">Closed</strong>
                      </div>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

// import image from "../assets/burger.png";
// import bglargeimage from "../assets/bg-large.gif";
// import bgmobileimage from "../assets/bg-mobile.gif";

export default {
  name: "Home",
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

    // image: image,
    // bglargeimage: bglargeimage,
    // bgmobileimage: bgmobileimage,

    likeColor: "",
    menuItem: "",
    status: "",

    restaurantList: [],
    likedShops: [],
    foodOrdered: [],
    maxDiscount: [],
    shopProfileImage: [],
  }),

  methods: {
    sliderGroup(value) {
      // console.log(value);
    },

    // get menu data from backend
    getMenu() {
      axios.get("/api/v1/menu/").then((response) => {
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
      this.$store.state.restaurant = item;
    },

    shopStatus() {
      axios.get(`/api/v1/shopstatus/`).then((res) => {
        this.status = res.data;
      });
    },

    favShop(shop) {
      this.$store.state.restaurant = shop;
    },

    getLikedShop() {
      axios.get("/api/v1/likedshop/").then((response) => {
        this.likedShops = response.data.filter(
          (item) =>
            item.customer === this.$store.state.user.username && item.liked === true
        );
        // console.log(this.likedShops);
      });
    },

    async foodOrders() {
      const response = await axios.get("/api/v1/foodorders/");
      const filteredData = response.data.filter(
        (item) => item.user === this.$store.state.user.username
      );
      // console.log(filteredData);
      this.foodOrdered = filteredData
        .reverse()
        .filter((item) => item.delivered === false);
    },

    getShopProfileImage() {
      axios.get(`/api/v1/ClientProfile4Image/`).then((res) => {
        this.shopProfileImage = res.data;
        // console.log(this.shopProfileImage);
      });
    },
  },

  mounted() {
    this.$eventBus.$on("callMethodLoginHomeRefresh", () => {
      this.getMenu();
      this.shopStatus();
      this.getLikedShop();
      this.foodOrders();
      this.getShopProfileImage();
    });
  },

  created() {
    this.getMenu();
    this.shopStatus();
    this.getLikedShop();
    this.foodOrders();
    this.getShopProfileImage();
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
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  color: white;
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
  top: 2.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  color: white;
  font-family: "Great Vibes", cursive;
}

@media only screen and (min-width: 1920px) {
  .hero-large-bg .hero-text-overlay {
    font-size: 3em;
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
  margin: 0 10px;
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
  color: #fff;
  background: #6a1b9a;
  border: 2px solid;
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
