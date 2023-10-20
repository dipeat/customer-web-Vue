<template>
    <div class="top-orders commingsoonbox mt-5 mb-10" id="top-restaurants">
      <v-row class="mt-5">
        <v-col sm="" cols="2">
          <v-divider color="red" class="mt-10"></v-divider>
        </v-col>
        <v-col sm="3" cols="8">
          <div class="text-center mt-3">
            <h1 class="red--text text-h4 text-center">Comming Soon</h1>
          </div>
        </v-col>
        <v-col sm="" cols="2">
          <v-divider color="red" class="mt-10"></v-divider>
        </v-col>
      </v-row>
        

        <v-row class="mt-3 hotel-container" >
          <v-col
            cols="6"
            sm="3"
            class="hotels-animate"
            :class="{ active: hotelVisible }"
            v-for="(item, index) in displayItems"
            :key="index + 0.1101"
          >
            <div>
              <div v-for="(image, index) in shopProfileApproved" :key="index + 0.0019">
                <v-sheet rounded="lg" v-if="image.slug == item.restaurant">
                  <v-card
                    class="mx-auto"
                    max-width="400"
                    elevation="3"
                    @click="setRestaurant(image.slug)"
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
                            @click="setRestaurant(image.slug)"
                          >
                            
                          </v-img>
                        </div>

                        <v-card-actions class="card-description" @click="setRestaurant(image.slug)">
                          <v-chip class="chip" small color="white">
                            <div  class="purple--text font-weight-bold">
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

export default  {
  components:{
    SvgIcon
  },
  data: () => ({
    colors: [
      "blue lighten-3",
      "warning",
      "pink lighten-2",
      "green accent-2",
      "deep-purple accent-1",
    ],
    left: mdiChevronDoubleLeft,
    right: mdiChevronDoubleRight,

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
    hotelVisible: false,
    currentIndex: 1,
    itemsPerPage: 8,
  }),

  methods: {
    handleRestaurantsScroll() {
      const container = this.$el.querySelector(".hotel-container");
      const rect = container.getBoundingClientRect();
      const textBottom = rect.top ;
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
      if (this.scrollX < 0) {
        this.scrollX += this.step;
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

  computed: {
    noOfPages() {
      return Math.ceil(this.commingSoon.length / this.itemsPerPage);
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
      return this.commingSoon.slice(start, last);
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
    window.addEventListener("scroll", this.handleRestaurantsScroll);
  },

  created() {
    this.getMenu();
    this.shopStatus();
    this.getLikedShop();
    this.foodOrders();
    this.getShopProfileImage();
    this.phonePeValidation();
  },
  beforeDestroy(){
    window.addEventListener("scroll", this.handleRestaurantsScroll);
  }
}

</script>

<style scoped>
.commingsoonbox {
  padding: 25px 25px;
  font-size: 18px;
  margin: 0 0px;
  /*border: 1px solid #b2b2b2;
  border-radius: 10px;
  transition: 0.3s ease;
  cursor: pointer;*/
}
/*.commingsoonbox:hover {
  color: #5729ff;
  background: #fdd3ba;
  border: 3px solid;
  border-color: #f06292;
  transition: linear 350ms;
  animation-timing-function: 1s;
}*/
.card-description {
  height: 50px;
  display: flex;
  justify-content: center;
}
.chip {
  position: absolute;
  bottom: 40px;
}

.hotels-animate {
  opacity: 0;
  transform: scale(0.5);
  transition: opacity 1s ease-in-out, transform 0.8s ease-in-out;
}
.hotels-animate.active {
  opacity: 0.5;
  fill-opacity: black;
  transform: scale(1);
}

@media (min-width: 700px) {
  .hotel-container {
    height: 500px;
  }
}
</style>