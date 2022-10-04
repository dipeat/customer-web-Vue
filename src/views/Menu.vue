<template>
  <v-main>
    <v-card-actions class="justify-center">
      <v-chip color="grey lighten-3">
        <v-avatar> <v-icon>mdi-wallet</v-icon> &nbsp; &nbsp; </v-avatar>
        <span> Balance</span>&nbsp; &nbsp; <span> = Rs 110</span>&nbsp; &nbsp;
        <v-btn small rounded dark color="purple">Add</v-btn>
      </v-chip>
    </v-card-actions>

    <v-card class="mx-auto" max-width="550">
      <v-img
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        class="align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      >
        <v-container>
          <v-chip color="white align-bottom">
            <v-card-title v-text="'Western city'" class="purple--text">
            </v-card-title>
          </v-chip>
        </v-container>
      </v-img>

      <v-card-actions>
        <v-rating
          v-model="rating"
          background-color="purple lighten-3"
          color="purple"
          half-increments
        ></v-rating>

        <v-spacer></v-spacer>
        <v-btn color="orange lighten-2" text> Details </v-btn>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            I'm a thing. But, like most politicians, he promised more than he
            could deliver. You won't have time for sleeping, soldier, not with
            all the bed making you'll be doing. Then we'll go with that data
            file! Hey, you add a one and two zeros to that or we walk! You're
            going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <v-radio-group v-model="radios" mandatory>
      <v-row align="center" justify="center">
        <v-col cols="4" sm="3" md="2">
          <v-radio label="Dine-in" color="purple" value="dineIn"></v-radio>
        </v-col>
        <v-col cols="5" sm="3" md="1">
          <v-radio label="Take-away" color="warning" value="takeAway"></v-radio>
        </v-col>
      </v-row>
    </v-radio-group>

    <v-card class="mx-auto overflow-hidden" max-width="550" height="500">
      <v-bottom-navigation absolute horizontal>
        <v-text-field
          placeholder="Type message ..."
          filled
          rounded
          dense
          class="mt-2"
        ></v-text-field>

        <v-bottom-sheet v-model="sheet">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="black" dark v-bind="attrs" v-on="on">
              <span class="white--text">Ok</span>
            </v-btn>
          </template>
          <v-sheet
            class="mx-auto overflow-hidden"
            height="200px"
            max-width="550"
            align="center"
          >
            <v-row>
              <v-col cols="10" sm="10" md="10">
                <v-subheader>Minimum prepare time = 48 mins</v-subheader>
              </v-col>

              <v-col cols="1" sm="1" md="1">
                <v-btn
                  class="ml-2"
                  text
                  small
                  color="error"
                  @click="sheet = !sheet"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <!-- date picker below -->

            <v-row>
              <v-col cols="6" sm="6" md="6">


            <v-dialog
              ref="dialog"
              v-model="modal2"
              :return-value.sync="time"
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="time"
                  label="Select arrival time"
                  prepend-icon="mdi-clock-time-four-outline"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-time-picker v-if="modal2" v-model="time" full-width ampm-in-title>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal2 = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(time)">
                  OK
                </v-btn>
              </v-time-picker>
            </v-dialog>
            </v-col>

            <v-col cols="6" sm="6" md="6">
              <v-subheader>Total = Rs.430/-</v-subheader>
            </v-col>



            </v-row>

            <v-btn text color="purple" dark>Checkout</v-btn>
          </v-sheet>
        </v-bottom-sheet>
      </v-bottom-navigation>

      <v-sheet
        id="scroll-threshold-example"
        class="overflow-y-auto pb-16"
        max-height="530"
      >
        <v-responsive height="auto">

          


          <div v-for="item,index in menuList" :key="index">
            


            <v-container v-if="item.restaurant == setRestaurant">

              <v-chip color="grey lighten-3">{{ item.category }}</v-chip>
              
              
              <v-row >
                <v-col cols="4" sm="5" md="5">
                  <span> {{ item.name }} </span>
                  <v-subheader > {{ item.prepare_time }} mins </v-subheader>
                </v-col>
                <v-col cols="3" sm="3" md="3">
                  <span class="text-decoration-line-through"> {{item.original_price}} </span> &nbsp;  <span> {{ item.final_price }}/- </span>
                </v-col>
                <v-col align="center" cols="5" sm="4" md="4">
                  <span>
                    <v-chip dark link color="black" @click="minusOne"
                      ><v-icon small dark>mdi-minus</v-icon></v-chip
                    ><v-chip>{{ itemValue }}</v-chip
                    ><v-chip dark link color="black" @click="plusOne"
                      ><v-icon small dark>mdi-plus</v-icon></v-chip
                    >
                  </span>
                </v-col>
              </v-row>
            </v-container>
            


          </div>
        </v-responsive>
      </v-sheet>
    </v-card>
  </v-main>
</template>

<script>
import axios from "axios";
export default {
  name: "Menu",
  data() {
    return {
      show: false,
      radios: null,
      rating: 2.5,
      sheet: false,

      itemValue: 0,
      setRestaurant: "client2",

      time: null,
      menu2: false,
      modal2: false,

      menuList: [],
      menu : [],
    };
  },

  methods: {
    
    getMenu() {
      axios
        .get("/api/v1/menu/")
        .then((response) => {


          for (let i = 0; i < response.data.length; i++) {
            
            if(this.menuList.restaurant != response.data[i].restaurant){
              this.menuList.push(response.data[i]);
            }

            // filter restaurant of client2 and push to menu
            if(response.data[i].restaurant == "client2"){
              this.menu.push(response.data[i]);
            }

            // filter restaurant of
              
            
          }
          

         
          

          // console.log(this.menuList);
          // console.log(this.menu);

          
         
        })
    },

    plusOne() {
      if (this.itemValue < 0) {
        this.itemValue++;
      }
      this.itemValue++;
    
    },

    minusOne() {
      if (this.itemValue > 0) {
        this.itemValue--;
      }
    },

  },

  created() {
    this.getMenu();
  },
};
</script>