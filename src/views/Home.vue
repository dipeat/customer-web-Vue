<template>
  <v-main>
    <h4 v-if="likedShops != ''">Favorite Shops</h4>
    <v-slide-group v-model="sliderGroup" center-active v-if="likedShops != ''">
      <v-slide-item v-for="shops, index in likedShops" :key="index + 0.0011" v-slot="{ active, toggle }">
        <v-card :color="active ? 'transparent' : 'grey lighten-1'" class="ma-1" height="120" width="120"
          @click="toggle(); favShop(shops.shop)" to="/menu">
          <v-row class="fill-height">
            <div v-for="image, index in shopProfileImage" :key="index+0.0019">
            <v-scale-transition>

              <v-avatar class="ma-2" size="125" tile  v-if="image.slug==shops.shop">
                
                <v-img :src=image.shop_image>
                  <v-row align="end" justify="center">
                    <v-chip color="black" small size="58" label class="white--text ma-3 ">{{ shops.shop }}
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
          <v-col cols="12" md="12" sm="12">
            <h3 class="ml-4">Order Details</h3>
            <v-container>
              <v-row justify="center">
                <v-col cols="12" sm="4" v-for="item, index in foodOrdered" :key="index + 0.55">
                  <v-card class="mx-auto" v-if="item.delivered===false" to="/order" align="center" max-width="auto" color="grey lighten-5" elevation="5">
                    <h4><u>{{ item.restaurant }}</u></h4>

                    <body>
                      <v-row class="mt-1">

                        <v-col cols="4" sm="4">
                          <span>At: {{ item.arrival_time }}</span>
                        </v-col>
                        <v-col cols="4" sm="4">
                          <v-chip outlined color="primary"  v-if="item.takeaway == true">
                            <span>Takeaway</span>
                          </v-chip>
                          <v-chip outlined color="orange darken-4"  v-else>
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

    <v-container>
      <v-row>
        <v-col cols="6" sm="4" v-for="item, index in status" :key="index">
          <v-sheet rounded="lg" min-height="268">
            <v-card class="mx-auto" max-width="400">
              <v-row dense>
                <v-col :cols="12">
                  <div v-for="image, index in shopProfileImage" :key="index+0.009">
                  <v-img :src=image.shop_image v-if="image.slug==item.restaurant" class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" max-height="200px">
                    <v-card-title> {{ item.restaurant }}</v-card-title>
                  </v-img>
                </div>

                  <v-card-actions @click="setRestaurant(item.restaurant)">
                    <div>
                      <v-btn small outlined color="blue" dark to="/menu">Menu </v-btn>
                    </div>
                    
                    <v-spacer></v-spacer>
                    
                    <div v-for="shopDiscount,index in maxDiscount" :key="index+0.003">
                      <v-chip small outlined color="purple" dark v-if="item.restaurant==shopDiscount.restaurant && shopDiscount.discount>0 && item.open_close">{{ shopDiscount.discount }}% off</v-chip>
                    </div>
                    <div  v-if="!item.open_close">
                      <strong class="red--text">Closed</strong>
                    </div>
                    
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
    maxDiscount: [],
    shopProfileImage:[],
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
        })
    },

    setRestaurant(item) {
      this.$store.state.restaurant = item;

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

    getShopProfileImage(){
      axios.get(`/api/v1/ClientProfile4Image/`)
      .then(res => {
        this.shopProfileImage = res.data
        // console.log(this.shopProfileImage);
      })
    },

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


