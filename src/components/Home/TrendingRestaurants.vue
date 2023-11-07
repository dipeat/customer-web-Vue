<template>
  <div class="top-orders">
    <v-row>
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

    <div style="display: flex; align-items: center; flex-direction: row">
      <div v-if="isDesktopScreen">
        <v-btn  small fab @click="scrollLeft">
          <svg-icon type="mdi" :path="left"></svg-icon>
        </v-btn>
      </div>

      <div class="scrollContainer" @wheel="preventHorizontalScroll" ref="container">
        <div
          :style="`transform:translateX(${scrollX}px);`"
          class="menu-card"
          ref="content"
          :class="{ visible: isVisible}"
          v-for="(image, index) in images"
          :key="index"
        >
          <div class="image-card">
            <v-img class="filtered-images" :src="image" />
          </div>
          <h4 class="text-center">{{ index }}</h4>
        </div>
      </div>
      <div v-if="isDesktopScreen">
        <v-btn small fab @click="scrollRight">
          <svg-icon type="mdi" :path="right"></svg-icon>
        </v-btn>
      </div>
    </div>

    <v-row class="mt-3 hotel-container">
      <v-col
        cols="6"
        sm="3"
        class="hotels-animate"
        :class="{ active: hotelVisible }"
        v-for="(item, index) in displayItems"
        :key="index + 0.1101"
      >
        <div>
          <div
            v-for="(image, index) in shopProfileApproved"
            :key="index + 0.0019"
          >
            <v-sheet rounded="lg" v-if="image.slug == item.slug">
              <v-card
                class="mx-auto"
                max-width="400"
                elevation="3"
                @click="setRestaurant(image.shop_identifier);setRestaurantID(image.slug)"
              >
                <v-row dense>
                  <v-col :cols="12">
                    <div class="text-center">
                      <v-img
                        :src="image.shop_image"
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        min-height="150px"
                        max-height="150px"
                        @click="setRestaurant(image.shop_identifier);setRestaurantID(image.slug)"
                      >
                      </v-img>
                    </div>

                    <v-card-actions
                      class="card-description"
                      @click="setRestaurant(image.shop_identifier);setRestaurantID(image.slug)"
                    >
                      <v-chip class="chip" small color="white">
                        <div class="purple--text font-weight-bold">
                          {{ image.owner_name }}
                        </div>
                      </v-chip>

                      <v-spacer></v-spacer>

                      <div
                        v-for="(shopDiscount, index) in maxDiscount"
                        :key="index + 0.0043"
                      >
                        <v-chip
                          small
                          outlined
                          color="purple mt-5"
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
                        <div v-if="!item.open_close" class="mt-5">
                          <strong class="red--text">Closed</strong>
                        </div>
                      </div>
                      <div v-if="item.shop_coming_soon" class="mt-5">
                        <strong class="red--text caption"
                          ><strong>Coming Soon</strong></strong
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

    <!-- Pagination Bar -->
    <v-row full-width align="center" justify="center" class="pagination-btns">
      <v-btn small fab @click="prev()" :disabled="this.currentIndex == 1">
        <svg-icon type="mdi" :path="left"></svg-icon>
      </v-btn>
      <div v-for="(page, index) in pages" :key="index">
        <v-btn
          fab
          small
          :color="page == currentIndex ? 'primary' : ''"
          v-if="
            Math.abs(page - currentIndex) < 2 ||
            page == 1 ||
            page == 2 ||
            page == noOfPages ||
            page == noOfPages - 1
          "
          @click="changeCurrentIndex(page)"
          >{{ page }}
        </v-btn>
        <div v-else style="width: 0px">.</div>
      </div>
      <v-btn
        small
        fab
        @click="next()"
        :disabled="this.currentIndex == this.noOfPages"
      >
        <svg-icon type="mdi" :path="right"></svg-icon>
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import api from "@/main";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronDoubleLeft, mdiChevronDoubleRight } from "@mdi/js";

export default {
  components: {
    SvgIcon,
  },
  data: () => ({
    left: mdiChevronDoubleLeft,
    right: mdiChevronDoubleRight,

    images: {
      Dosa: "https://dipeat-s3-bucket-1.s3.amazonaws.com/masala-dosa-indian-cuisine-sambar-vegetarian-cuisine-onion-572e9d60dd0ce72a8a09bdfa3b344ca6.png",
      Burger:
        "https://dipeat-s3-bucket-1.s3.amazonaws.com/chicken-sandwich-whopper-hamburger-burger-king-specialty-sandwiches-crispy-fried-chicken-burger-king-89618abf5e5f8dcbcb672346d41b78d7.png",
      Chicken:
        "https://dipeat-s3-bucket-1.s3.amazonaws.com/roast-chicken-barbecue-chicken-buffalo-wing-roast-goose-chicken-99c7c5f2b1bde7077b750194fcf7e43c.png",
      "Fried Rice":
        "https://dipeat-s3-bucket-1.s3.amazonaws.com/pilaf-fried-rice-spanish-rice-white-rice-fried-rice-616ce31c33951d3706a87a20af0d5375.png",
      Idli: "https://dipeat-s3-bucket-1.s3.amazonaws.com/qld9mtstd2ts2nhjkcg340ddh8.png",
      Milkshake:
        "https://dipeat-s3-bucket-1.s3.amazonaws.com/milkshake-ice-cream-smoothie-stock-photography-ice-cream-ad2f432517b041edc5e8e7b74c0a4202.png",
      Noodles:
        "https://dipeat-s3-bucket-1.s3.amazonaws.com/chow-mein-lo-mein-chinese-noodles-yakisoba-fried-noodles-chowmein-c59e20a8f2b28ea51bae6eaa2d23053b.png",
      "North Indian":
        "https://dipeat-s3-bucket-1.s3.amazonaws.com/indian-cuisine-dal-vegetarian-cuisine-roti-non-veg-food-8683483aaf18d84db2f2c66f3391eb71+(1).png",
      Roti: "https://dipeat-s3-bucket-1.s3.amazonaws.com/pita-naan-roti-kulcha-indian-cuisine-bread-923f108b824980de2167541df1d9f724.png",
      "South Indian":
        "https://dipeat-s3-bucket-1.s3.amazonaws.com/south-indian-cuisine-south-indian-cuisine-vegetarian-cuisine-rasam-menu-cdcebac8b3f180c12c8845c2345b7c1d.png",
    },
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
    isVisible: false,
    hotelVisible: false,
    isDesktopScreen: true,
    currentIndex: 1,
    itemsPerPage: 8,
    //scrollItems
    scrollX: 0,
    overflowX:0,
    
    step: 500,
  }),
  methods: {
    sliderGroup(value) {
      // console.log(value);
    },
    calculateOverflowX() {
      const container = this.$refs.container;
      if (container) {
        this.overflowX = container.scrollWidth;
      }
    },
    // resetScrollX(){
    //   if(this.isDesktopScreen === false){
    //     this.scrollX = 0;
    //   }
    // },
    preventHorizontalScroll(event) {
      if (event.deltaX !== 0  && this.isDesktopScreen) {
        event.preventDefault();
      }
    },
    handleTrendingScroll() {
      const container = this.$el.querySelector(".scrollContainer");
      const rect = container.getBoundingClientRect();
      const textBottom = rect.top + 50;
      if (textBottom <= window.innerHeight && !this.isVisible) {
        this.isVisible = true;
      }
      
    },
    handleRestaurantsScroll() {
      const container = this.$el.querySelector(".hotel-container");
      const rect = container.getBoundingClientRect();
      const textBottom = rect.top + 60;
      if (textBottom <= window.innerHeight && !this.hotelVisible) {
        this.hotelVisible = true;
      }
    },
    //--Pagiation--
    changeCurrentIndex(index) {
      this.currentIndex = index;
    },
    prev() {
      this.currentIndex--;
    },
    next() {
      this.currentIndex++;
    },
    scrollLeft() {
      if (this.scrollX <0) {
        this.scrollX += this.step;
      }
      // console.log(this.overflowX)
      // console.log(this.scrollX)
    },
    scrollRight() {
      if (this.scrollX > -this.overflowX) {
      this.scrollX -= this.step;
      }
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

    setRestaurantID(item) {
      
      localStorage.setItem("restaurant_id", item);
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
  mounted() {
    this.calculateOverflowX();
    
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
    // this.checkScreen();
    window.addEventListener("scroll", this.handleTrendingScroll);
    window.addEventListener("scroll", this.handleRestaurantsScroll);
    //scrollItems
    const mediaQuery = window.matchMedia('(min-width: 500px)');
    
    // Check the initial state
    this.isDesktopScreen = mediaQuery.matches;

    // Add an event listener to handle changes
    mediaQuery.addListener((event) => {
      this.isDesktopScreen = event.matches;
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
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleAboutScroll);
    window.addEventListener("scroll", this.handleRestaurantsScroll);
  },
  computed: {
    noOfPages() {
      return Math.ceil(this.liveRestaurant.length / this.itemsPerPage);
    },
    pages() {
      let arr = [];
      for (let i = 0; i < this.noOfPages; i++) {
        arr[i] = i + 1;
      }
      return arr;
    },
    displayItems() {
      const start = (this.currentIndex - 1) * this.itemsPerPage;
      const last = start + this.itemsPerPage;
      return this.liveRestaurant.slice(start, last);
    },
  },
};
</script>

<style>
.filtered-images {
  max-height: 90%;
  max-width: 70%;
  padding: 10px;
  margin-bottom: 10px;
  transition: ease-in-out 300ms;
}

.filtered-images:hover {
  transform: scale(1.2);
}
.scrollContainer {
  margin: 50px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap; /* Prevent text from wrapping to the next line */
  max-width: 100%; /* Ensure it doesn't stretch the parent column */
}
@media (min-width: 700px) {
  .hotel-container {
    height: 500px;
  }
}

.menu-card {
  opacity: 0;
  height: 200px;
  width: 200px;
  transform: scale(0);
  transition: opacity 1s ease-in-out, transform 0.7s ease-in-out;
  margin: 0px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /*background-color: rgb(27, 179, 80);*/
}
.image-card{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 180px;
  /*background-color: red;*/
}
.menu-card.visible {
  opacity: 1;
  transform: scale(1);
}
.card-description {
  height: 50px;
  display: flex;
  justify-content: center;
}

.chip {
  position: absolute;
  bottom: 40px;
}

.pagination-btns {
  position: relative;
  top: 20px;
  gap: 10px;
}
.hotels-animate {
  opacity: 0;
  transform: translateY(60%);
  transition: opacity 1s ease-in-out, transform 1.2s ease-in-out;
}
.hotels-animate.active {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 500px) {
  .filtered-images {
    width: 100px;
    max-height: 100px;
  }
  .menu-card {
    height: 120px;
    width:150px;
  }
  .chip {
    position: absolute;
    /* bottom: 40px; */
  }
}
</style>
