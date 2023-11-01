<template>
  <div>
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
                  <v-avatar
                    class="ma-2"
                    size="125"
                    tile
                    v-if="image.slug == shops.shop"
                  >
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
  </div>
</template>

<script>
import api from "@/main";

export default {
  data: () => ({
    status: [],
    likedShops: [],
  }),
  methods: {
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
    this.$eventBus.$on("callMethodLoginHomeRefresh", () => {
      this.getMenu();
      this.shopStatus();
      this.getLikedShop();
    });

    this.$eventBus.$on("phonePeValidation", () => {
      this.phonePeValidation();
    });
  },

  created() {
    this.getMenu();
    this.shopStatus();
    this.getLikedShop();
    this.getShopProfileImage();
  },
};
</script>
