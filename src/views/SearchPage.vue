<template>
  <v-main>
    <div>
      <h3><u>Searched:</u>&nbsp;&nbsp;{{ searchedItem }}</h3>
    </div>
    <v-container>
      <v-row>
        <v-col cols="6" sm="4" v-for="(item, index) in getSearch" :key="index">
          <v-sheet rounded="lg" min-height="268" v-if="item.approved == true">
            <v-card class="mx-auto" max-width="400" @click="setRestaurant(item.slug)">
              <v-row dense>
                <v-col :cols="12">
                  <v-img
                    :src="item.shop_image"
                    class="white--text align-end text-center"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    max-height="200px"
                  >
                    <v-chip class="ma-1" color="white align-bottom" small>
                      <div class="purple--text font-weight-bold">
                        {{ item.owner_name }}
                      </div>
                    </v-chip>
                  </v-img>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    &nbsp;
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
                          item.slug == shopDiscount.restaurant &&
                          shopDiscount.discount > 0
                        "
                        >{{ shopDiscount.discount }}% off</v-chip
                      >
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
// import axios from "axios";
import api from "@/main";
import router from "../router";

export default {
  name: "SearchPage",

  data: () => ({
    getSearch: "",
    maxDiscount: [],
    searchedItem: "",
  }),

  methods: {
    setRestaurant(item) {
      this.$store.state.restaurant = item;
      // console.log(this.$store.state.restaurant);
      localStorage.setItem("restaurant", item);
      this.$router.push(`/menu/${item}`);
    },

    searchBarRef() {
      this.getSearch == "";

      // remove space from this.search
      let search = localStorage.getItem("searchText").replace(/^[ ]+/g, "");

      if (search != "") {
        this.searchedItem = search;
        // console.log(search);
        api.get(`/api/v1/clientprofilesearch/${search}`).then((response) => {
          this.getSearch = response.data;
          // console.log(this.getSearch);
          // filter out the restaurants that are approved
          this.getSearch = this.getSearch.filter((item) => item.approved == true);
        });
        // .catch((error) => {
        //   if (error.response) {
        //     alert('No more restuarants, type something else');
        //   } else if (error.request) {
        //     alert(JSON.stringify(error.request));
        //   } else {
        //     alert(JSON.stringify(error.message));
        //   }
        // });

        api.get("/api/v1/menu/").then((response) => {
          this.maxDiscount = response.data.reduce((acc, cur) => {
            const found = acc.find((el) => el.restaurant === cur.restaurant);
            if (!found) {
              return acc.concat([cur]);
            } else if (found.discount < cur.discount) {
              found.discount = cur.discount;
            }
            return acc;
          }, []);
        });
      }
    },
  },

  created() {
    // this.searchBarRef();
  },

  mounted() {
    // event method to call searchBarRef() from home.vue
    this.$eventBus.$on("callMethodSearchBarRef", () => {
      this.searchBarRef();
    });

    this.searchBarRef();
  },
};
</script>
