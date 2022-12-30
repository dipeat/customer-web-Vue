<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="6" sm="4" v-for="(item, index) in getSearch" :key="index">
          <v-sheet rounded="lg" min-height="268">
            <v-card
              class="mx-auto"
              max-width="400"
              @click="setRestaurant(item.slug)"
            >
              <v-row dense>
                <v-col :cols="12">
                  <v-img
                    :src="'https://cdn.vuetifyjs.com/images/cards/house.jpg'"
                    class="white--text align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    max-height="200px"
                  >
                    <v-card-title> {{ item.slug }}</v-card-title>
                  </v-img>
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
import axios from "axios";
import router from "../router";

export default {
  name: "SearchPage",

  data: () => ({
    getSearch: "",
  }),

  methods: {
    setRestaurant(item) {
      this.$store.state.restaurant = item;
      // console.log(this.$store.state.restaurant);
      router.push("/menu");
    },

    searchBarRef() {
      this.getSearch == "";

      // remove space from this.search
      let search = this.$store.state.searchText.replace(/^[ ]+/g, "");

      if (search != "") {
        // console.log(search);
        axios.get(`/api/v1/clientprofilesearch/${search}`).then((response) => {
          this.getSearch = response.data;
        //   console.log(this.getSearch);
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