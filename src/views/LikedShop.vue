<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col
          cols="6"
          sm="4"
          v-for="(image, index) in shopProfileImage"
          :key="index + 0.0019"
        >
          <v-sheet rounded="lg" v-if="image.approved == true">
            <v-card class="mx-auto" max-width="400" @click="setRestaurant(item.shop)">
              <v-row dense>
                <v-col :cols="12">
                  <div v-for="(item, index) in likedShops" :key="index">
                    <v-img
                      :src="image.shop_image"
                      v-if="image.slug == item.shop"
                      class="white--text align-end text-center"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      max-height="100px"
                      @click="setRestaurant(item.shop)"
                    >
                      <v-chip class="ma-1" color="white align-bottom" small>
                        <div class="purple--text font-weight-bold">
                          {{ image.owner_name }}
                        </div>
                      </v-chip>
                    </v-img>
                  </div>
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
// import axios from "axios";
import api from "@/main";

export default {
  name: "LikedShop",

  data: () => ({
    likedShops: [],
    shopProfileImage: [],
  }),

  methods: {
    getLikedShops() {
      api.get("/api/v1/likedshop/").then((response) => {
        this.likedShops = response.data.filter(
          (item) =>
            item.customer === this.$store.state.user.username && item.liked === true
        );
        // console.log(this.likedShops)
      });
    },

    setRestaurant(item) {
      this.$store.state.restaurant = item;
      // console.log(this.$store.state.restaurant);
      localStorage.setItem("restaurant", item);
      this.$router.push(`/menu/${item}`);
    },

    getShopProfileImage() {
      api.get(`/api/v1/ClientProfile4Image/`).then((res) => {
        this.shopProfileImage = res.data;
        // console.log(this.shopProfileImage);
        // filter the shop profile image if approved is true
        this.shopProfileImage = this.shopProfileImage.filter(
          (item) => item.approved === true
        );
      });
    },
  },

  created() {
    this.getLikedShops();
    this.getShopProfileImage();
  },
};
</script>

<style></style>
