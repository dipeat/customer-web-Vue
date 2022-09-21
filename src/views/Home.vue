<template>
  <v-main>
    <v-slide-group v-model="sliderGroup" center-active show-arrows>
      <v-slide-item v-for="n in 20" :key="n" v-slot="{ active, toggle }">
        <v-card :color="active ? 'transparent' : 'grey lighten-1'" class="ma-1" height="120" width="120"
          @click="toggle">
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-btn v-if="active" color="black" size="20" v-text="'open'" dark></v-btn>
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

    <v-container>
      <v-card class="mx-auto">
        <v-row>
          <v-col cols="9" md="10" sm="10">
            <h3 class="ml-4">Order Details</h3>
            <v-container>
              <v-row justify="center">
                <v-col></v-col>
                <v-col cols="10" sm="10">
                  <v-card class="mx-auto" align="center" color="purple darken-2" dark>
                    <h4 class="yellow--text">Western City</h4>
                    <div align="center" justify="center">
                      <v-subheader class=" justify-center">
                        10:00 AM - 11:00 AM</v-subheader>
                      <v-row>
                        <v-col>
                          <h5>Dine-In</h5>
                        </v-col>
                        <v-col>
                          <h5>Total = 348</h5>
                        </v-col>
                      </v-row>
                    </div>
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



    <v-container v-for="item,index in restaurantList" :key="index">
      
          <v-card class="mx-auto" max-width="400">
              
                    <v-img :src="'https://cdn.vuetifyjs.com/images/cards/house.jpg'" class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                      <v-card-title> {{ item }}</v-card-title>
                    </v-img>

                    <v-card-actions>
                      <v-btn color="blue" dark to="/menu"> Menu </v-btn>
                      <v-spacer></v-spacer>



                      <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>

                      <v-btn icon>
                        <v-icon>mdi-bookmark</v-icon>
                      </v-btn>

                      <v-btn icon>
                        <v-icon>mdi-share-variant</v-icon>
                      </v-btn>
                    </v-card-actions>
                
          </v-card>
        
    </v-container>

    <v-container v-for="item,index in restaurantList" :key="index">
        <v-row>
          <v-col
            cols="12"
            sm="6"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
            <v-card class="mx-auto" max-width="400">
              <v-row dense>
                <v-col :cols="12">
                    <v-img :src="'https://cdn.vuetifyjs.com/images/cards/house.jpg'" class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                      <v-card-title> {{ item }}</v-card-title>
                    </v-img>

                    <v-card-actions>
                      <v-btn color="blue" dark to="/menu"> Menu </v-btn>
                      <v-spacer></v-spacer>



                      <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>

                      <v-btn icon>
                        <v-icon>mdi-bookmark</v-icon>
                      </v-btn>

                      <v-btn icon>
                        <v-icon>mdi-share-variant</v-icon>
                      </v-btn>
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

    menuItem: "",
    restaurantList: [],

  }),
  methods: {
    sliderGroup(value) {
      console.log(value);
    },


    // get menu data from backend
    getMenu() {
      axios
        .get("/api/v1/getmenuitem/")
        .then((response) => {

          this.menuItem = response.data;

          // for (let i = 0; i < response.data.length; i++) {
          //   console.log(response.data[i]);
          // }
          for (let i = 0; i < this.menuItem.length; i++) {
            // make different array for each restaurant
            if (this.restaurantList.indexOf(this.menuItem[i].restaurant) === -1) {
              this.restaurantList.push(this.menuItem[i].restaurant);
            }


          }

        })
    },

    // restaurantName() {
    //   for (let i = 0; i < this.menuItem.length; i++) {
    //     // make different array for each restaurant
    //     if (this.restaurantList.indexOf(this.menuItem[i].restaurant) === -1) {
    //       this.restaurantList.push(this.menuItem[i].restaurant);
    //     }


    //   }
    //   console.log(this.restaurantList);
    // },


  },

  calculated: {


  },

  created() {
    this.getMenu();
    // this.restaurantName();




  },
};
</script>


