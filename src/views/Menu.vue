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
            <v-card-title v-text="$store.state.restaurant" class="purple--text">
            </v-card-title>
            <v-btn
              icon
              small
              @click="likeShop($store.state.restaurant)"
              v-if="$store.state.restaurant"
            >
              <v-icon :color="likeColor">mdi-heart</v-icon>
            </v-btn>
          </v-chip>
          <v-chip color="white">
            <v-btn icon small v-if="$store.state.restaurant">
              <v-icon color="blue">mdi-share-variant</v-icon>
            </v-btn>
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
            I'm a thingo. But, like most politicians, he promised more than he
            could deliver. You won't have time for sleeping, soldier, not with
            all the bed making you'll be doing. Then we'll go with that data
            file! Hey, you add a one and two zeros to that or we walk! You're
            going to do his laundry? I've got to find a way to escape.
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>

    <br />

    <v-card class="mx-auto overflow-hidden" max-width="550" height="500">
      <v-sheet
        id="scroll-threshold-example"
        class="overflow-y-auto pb-16"
        max-height="480"
      >
        <v-responsive height="auto">
          <v-container v-for="(cat, index) in menu" :key="index + 0.0001">
            <v-chip
              outlined
              color="blue darken-2"
              >{{ cat }}</v-chip
            >

            <div v-for="(item, index) in menuList" :key="index+0.001">
              <div v-if="cat == item.category">
                <v-container v-if="item.restaurant == $store.state.restaurant">
                  <v-row>
                    <v-col cols="4" sm="5" md="5">
                      <span> {{ item.name }}</span>
                      <v-subheader> {{ item.prepare_time }} mins</v-subheader>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <span
                        class="text-decoration-line-through"
                        v-if="item.original_price > item.final_price"
                      >
                        {{ item.original_price }}
                      </span>
                      &nbsp; <span> {{ item.final_price }}</span>
                    </v-col>
                    <v-col align="center" cols="5" sm="4" md="4">
                      <div v-if="item.availablity == true">
                        <v-chip
                          small
                          dark
                          link
                          color="black"
                          v-if="item.value > 0"
                          @click="minusOne(item)"
                        >
                          <v-icon small dark>mdi-minus</v-icon>
                        </v-chip>
                        <v-chip outlined color="orange darken-3">{{
                          item.value
                        }}</v-chip>
                        <v-chip
                          small
                          dark
                          link
                          color="black"
                          @click="plusOne(item)"
                        >
                          <v-icon small dark>mdi-plus</v-icon>
                        </v-chip>
                      </div>
                      <div v-else>
                        <v-chip outlined color="red">Not Available</v-chip>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </div>
          </v-container>
        </v-responsive>
      </v-sheet>
    </v-card>

    <v-card
      shaped
      class="mx-auto overflow-hidden mt-2"
      max-width="550"
      height="40"
    >
      <v-row>
        <v-col sm="10" cols="9">
          <v-text-field
            v-model="message"
            placeholder="Type message ..."
            filled
            dense
          ></v-text-field>
        </v-col>

        <v-col sm="2" cols="2">
          <v-dialog v-model="dialog" scrollable max-width="350px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="black"
                @click="oK"
                rounded
                dark
                v-bind="attrs"
                v-on="on"
              >
                Ok
              </v-btn>
            </template>
            <v-card>
              <v-card-title>Orders</v-card-title>
              <v-divider></v-divider>
              <v-card-text style="height: auto">
                <div v-for="(order, index) in displayOrder" :key="index">
                  <v-container>
                    <v-row>
                      <v-col>
                        <div>{{ order.name }}</div>
                      </v-col>
                      <v-col>
                        <div>{{ order.final_price * order.value }}</div>
                      </v-col>
                      <v-col>
                        <div>{{ order.value }}</div>
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
                <v-divider color="red"></v-divider>
                <v-container v-if="displayOrder != ''">
                  <v-row>
                    <v-col>
                      <div>Total</div>
                    </v-col>
                    <v-col>
                      <div><v-icon>mdi-currency-inr</v-icon> {{ total }}</div>
                    </v-col>
                  </v-row>
                  <v-divider color="yellow"></v-divider>

                  <v-row>
                    <v-col>
                      <div>Prepare Time</div>
                    </v-col>
                    <v-col>
                      <div>
                        <v-icon>mdi-alarm</v-icon> {{ premare_time }} mins
                      </div>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6" sm="6">
                      <v-dialog
                        ref="dialog"
                        v-model="modal2"
                        :return-value.sync="time"
                        width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="time"
                            label="Arrival time"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="modal2"
                          v-model="time"
                          full-width
                          ampm-in-title
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal2 = false">
                            Cancel
                          </v-btn>
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.dialog.save(time)"
                          >
                            OK
                          </v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-col>
                    <v-col cols="6" sm="6">
                      <v-checkbox
                        v-model="checkbox"
                        label="Take Away"
                        color="primary"
                      >
                      </v-checkbox>
                    </v-col>
                  </v-row>
                </v-container>
                <v-container v-if="displayOrder == ''">
                  <h4>Please select items for order!</h4>
                </v-container>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn color="red" text @click="dialog = false"> Cancel </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  text
                  @click="checkout"
                  v-if="foodOrder != ''"
                >
                  Checkout
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-card>
  </v-main>
</template>

<script>
import axios from "axios";
export default {
  name: "Menu",
  data() {
    return {
      dialog: false,
      show: false,
      radios: null,
      rating: 2.5,
      sheet: false,

      time: null,
      menu2: false,
      modal2: false,
      total: 0,
      premare_time: 0,
      message: "",
      checkbox: false,
      likeColor: "",
      likeBoolShop: true,

      foodName: [],
      menuList: [],
      menu: [],
      foodOrder: [],
      displayOrder: [],
      likedShops: [],
    };
  },

  methods: {
    getMenu() {
      axios.get("/api/v1/menu/").then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (this.$store.state.restaurant == response.data[i].restaurant) {
            this.menuList.push(response.data[i]);

            // separate the category and push to menu
            if (!this.menu.includes(response.data[i].category)) {
              this.menu.push(response.data[i].category);
            }
          }
        }
        // console.log(this.menuList);
        // console.log(this.menu);
      });

      // axios.get("/api/v1/menucategory/")
      //   .then((response) => {
      //     this.menu = response.data;

      //   });
    },

    oK() {
      for (let i = 0; i < this.foodOrder.length; i++) {
        if (this.displayOrder.indexOf(this.foodOrder[i]) == -1) {
          this.displayOrder.push(this.foodOrder[i]);
        }
      }
      // console.log(this.displayOrder);

      // calculate total
      this.total = 0;
      for (let i = 0; i < this.displayOrder.length; i++) {
        this.total +=
          this.displayOrder[i].final_price * this.displayOrder[i].value;
      }

      // calculate prepare time
      this.premare_time = 0;
      for (let i = 0; i < this.displayOrder.length; i++) {
        this.premare_time +=
          this.displayOrder[i].prepare_time * this.displayOrder[i].value;
      }
    },

    plusOne(item) {
      item.value++, this.foodOrder.push(item);
      // console.log(this.foodOrder);
    },

    minusOne(item) {
      item.value--;
      this.foodOrder.splice(this.foodOrder.indexOf(item), 1);
      this.displayOrder.splice(this.displayOrder.indexOf(item), 1);
      // console.log(this.foodOrder);
    },

    checkout() {
      this.dialog = false;
      // add all name of food in one string
      for (let i = 0; i < this.displayOrder.length; i++) {
        this.foodName +=
          this.displayOrder[i].name +
          "@" +
          this.displayOrder[i].value +
          "$$" +
          this.displayOrder[i].final_price +
          "||";
      }

      // convert 24 hour to 12 hour
      let time = this.time;
      let hours = time.substring(0, 2);
      let minutes = time.substring(3, 5);
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? minutes : minutes;
      let strTime = hours + ":" + minutes + " " + ampm;

      // console.log( {
      //     restaurant: this.$store.state.restaurant,
      //     user: this.$store.state.user.username,
      //     takeaway: this.checkbox,
      //     prepare_time: this.premare_time,
      //     food_name: this.foodName,
      //     total: this.total,
      //     message: this.message,
      //     arrival_time: strTime,
      //   });

      axios.post("/api/v1/foodorders/", {
        restaurant: this.$store.state.restaurant,
        user: this.$store.state.user.username,
        takeaway: this.checkbox,
        order_date: new Date().toUTCString().slice(0, 16),
        prepare_time: this.premare_time,
        food_name: this.foodName,
        total: this.total,
        message: this.message,
        arrival_time: strTime,
        slug: this.$store.state.user.username + "a-_a" + Date.now(),   // to remove conflict
      })
        // .then((response) => {
        //   console.log(response);
        // })
        // .catch((error) => {
        //   console.log(error);
        // });

      this.$router.push("/order");
    },

    likeShop(item) {
      const slug_customer =
        this.$store.state.user.username + this.$store.state.restaurant;

      if (this.likeColor === "red") {
        this.likeColor = "";
        this.likeBoolShop = false;

        axios.patch(`/api/v1/editlikedshop/${slug_customer}/`, {
          liked: this.likeBoolShop,
        });

        // console.log("white");
      } else {
        this.likeColor = "red";
        this.likeBoolShop = true;

        axios.patch(`/api/v1/editlikedshop/${slug_customer}/`, {
          customer: this.$store.state.user.username,
          user: this.$store.state.user.id,
          shop: item,
          liked: this.likeBoolShop,
          slug: slug_customer,
        });
        // console.log("red");
      }
      // console.log(item);
    },

    getLikedShop() {
      axios.get("/api/v1/likedshop/").then((response) => {
        // filter on basis of customer
        this.likedShops = response.data.filter(
          (item) => item.customer === this.$store.state.user.username
        );
        // console.log(this.likedShops);
        for (let i = 0; i < this.likedShops.length; i++) {
          if (
            this.likedShops[i].shop === this.$store.state.restaurant &&
            this.likedShops[i].liked === true
          ) {
            this.likeColor = "red";
          }
        }
      });
    },
  },

  created: function () {
    this.getMenu();
    this.getLikedShop();
  },
};
</script>
