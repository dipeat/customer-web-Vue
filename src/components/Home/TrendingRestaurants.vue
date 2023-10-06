<template>
    <div class="top-orders" >
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
</template>

<script>

import api from "@/main";
export default{
    data : ()=>({
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
    methods:{
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
    mounted() {
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

  created() {
    this.getMenu();
    this.shopStatus();
    this.getLikedShop();
    this.foodOrders();
    this.getShopProfileImage();
    this.phonePeValidation();
  },
}

</script>
