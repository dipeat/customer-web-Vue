<template>
  <v-main>
    <h4 v-if="likedShops != ''">Favorite Shops</h4>
    <v-slide-group v-model="sliderGroup" center-active v-if="likedShops != ''">
      <v-slide-item v-for="shops, index in likedShops" :key="index + 0.0011" v-slot="{ active, toggle }">
        <v-card :color="active ? 'transparent' : 'grey lighten-1'" class="ma-1" height="120" width="120"
          @click="toggle(); favShop(shops.shop)" to="/menu">
          <v-row class="fill-height">

            <v-scale-transition>

              <v-avatar class="ma-2" size="125" tile>
                <v-img :src="'https://cdn.vuetifyjs.com/images/cards/house.jpg'">
                  <v-row align="end" justify="center">
                    <v-chip color="black" small size="48" label class="white--text ma-3 ">{{ shops.shop }}
                    </v-chip>
                  </v-row>

                </v-img>

              </v-avatar>
            </v-scale-transition>

          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <v-container>
      <v-carousel cycle height="200" hide-delimiter-background show-arrows-on-hover delimiter-icon="mdi-chevron-right">
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="text-h2">{{ slide }} offer</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-container>

    <v-container v-if="foodOrdered!=''">
      <v-card class="mx-auto">
        <v-row>
          <v-col cols="9" md="10" sm="10">
            <h3 class="ml-4">Order Details</h3>
            <v-container>
              <v-row justify="center">
                <v-col cols="10" sm="6" v-for="item, index in foodOrdered" :key="index + 0.55">
                  <v-card class="mx-auto" v-if="item.delivered===false" to="/order" align="center" max-width="auto" color="grey lighten-5" elevation="5">
                    <h4><u>{{ item.restaurant }}</u></h4>

                    <body>
                      <v-row class="mt-1">

                        <v-col cols="12" sm="4">
                          <span>Arrival: {{ item.arrival_time }}</span>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <v-chip outlined color="primary"  v-if="item.takeaway == true">
                            <span>Takeaway</span>
                          </v-chip>
                          <v-chip outlined color="orange darken-4"  v-else>
                            <span>Dine-In</span>
                          </v-chip>
                        </v-col>
                        <v-col cols="12" sm="4">
                          <span>Total =<v-icon>mdi-currency-inr</v-icon>{{ item.total }}</span>
                        </v-col>
                      </v-row>
                    </body>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col cols="2" md="2" sm="2" align="end">
            <v-btn color="black" dark to="/order"> View </v-btn><br>
            <v-icon class="mdi-48px mt-8" color="red">mdi-rice</v-icon>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <v-container>
      <v-row>
        <v-col cols="6" sm="4" v-for="item, index in status" :key="index">
          <v-sheet rounded="lg" min-height="268">
            <v-card class="mx-auto" max-width="400">
              <v-row dense>
                <v-col :cols="12">
                  <v-img :src="'https://cdn.vuetifyjs.com/images/cards/house.jpg'" class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" max-height="200px">
                    <v-card-title> {{ item.restaurant }}</v-card-title>
                  </v-img>

                  <v-card-actions @click="setRestaurant(item.restaurant)">
                    <div v-if="item.open_close">
                      <v-btn small outlined color="blue" dark to="/menu">Menu </v-btn>
                    </div>
                    <div v-else>
                      <h4 class="red--text">Closed {{ item.restaurant }}</h4>
                    </div>

                    <v-spacer></v-spacer>

                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-sheet>
        </v-col>




      </v-row>
    </v-container>






  </v-main>
</template>

<script>

import axios from 'axios'

export default {
  name: "Home",
  data: () => ({

    colors: [
      "indigo",
      "warning",
      "pink darken-2",
      "red lighten-1",
      "deep-purple accent-4",
    ],

    slides: ["First", "Second", "Third", "Fourth", "Fifth"],

    likeColor: "",
    menuItem: "",
    status: "",

    restaurantList: [],
    likedShops: [],
    foodOrdered: [],

  }),


  methods: {
    sliderGroup(value) {
      // console.log(value);
    },


    // get menu data from backend
    getMenu() {
      axios
        .get("/api/v1/menu/")
        .then((response) => {

          this.menuItem = response.data;

          // for (let i = 0; i < response.data.length; i++) {
          //   console.log(response.data[i]);
          // }
          for (let i = 0; i < this.menuItem.length; i++) {

            if (this.restaurantList.indexOf(this.menuItem[i].restaurant) === -1) {
              this.restaurantList.push(this.menuItem[i].restaurant);
            }
          }
        })
    },

    setRestaurant(item) {
      this.$store.state.restaurant = item;
      // console.log(item);

    },

    shopStatus() {

      axios.get(`/api/v1/shopstatus/`)
        .then(res => {
          this.status = res.data


        })

    },

    favShop(shop) {
      this.$store.state.restaurant = shop;
    },



    getLikedShop() {
      axios
        .get("/api/v1/likedshop/")
        .then((response) => {
          this.likedShops = response.data.filter(
            (item) => item.customer === this.$store.state.user.username && item.liked === true


          );
          // console.log(this.likedShops);
        });
    },

    async foodOrders() {
      const response = await axios.get('/api/v1/foodorders/');
      const filteredData = response.data.filter((item) => item.user === this.$store.state.user.username);
      // console.log(filteredData);
      this.foodOrdered = filteredData.reverse().filter((item) => item.delivered === false);

    },

  },


  created() {
    this.getMenu();
    this.shopStatus();
    this.getLikedShop();
    this.foodOrders();

  },
};
</script>


