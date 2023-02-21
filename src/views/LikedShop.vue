<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="6" sm="4" v-for="(item, index) in likedShops" :key="index">
          <v-sheet rounded="lg" min-height="268">
            <v-card
              class="mx-auto"
              max-width="400"
              @click="
                setRestaurant(item.shop);
                navigateMenu();
              "
            >
              <v-row dense>
                <v-col :cols="12">
                  <div v-for="(image, index) in shopProfileImage" :key="index + 0.0019">
                    <v-img
                      :src="image.shop_image"
                      v-if="image.slug == item.shop"
                      class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                      max-height="200px"
                      @click="setRestaurant(item.shop)"
                    >
                      <v-card-title> {{ item.shop }}</v-card-title>
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
    },

    getShopProfileImage() {
      api.get(`/api/v1/ClientProfile4Image/`).then((res) => {
        this.shopProfileImage = res.data;
        // console.log(this.shopProfileImage);
      });
    },
    navigateMenu() {
      this.$router.push("/menu");
    },
  },

  created() {
    this.getLikedShops();
    this.getShopProfileImage();
  },
};
</script>

<style></style>
