<template>
  <v-container>
    <v-card max-width="550" class="mx-auto mt-5" elevation="5">
      <v-container>
        <v-card-title>
          <v-icon color="red">mdi-food</v-icon>&nbsp;&nbsp;&nbsp;
          <span class="title purple--text">Order History</span>
        </v-card-title>
        <v-divider></v-divider>
        <body v-if="foodOrdered == ''">
          No orders to show.
        </body>
      </v-container>
      <v-container v-for="(item, index) in foodOrdered" :key="index">
        <div v-for="(shop, index) in shopProfileImage" :key="index + 0.0329">
          <div v-if="shop.shop_identifier == item.restaurant">
            <div>
              <v-btn color="blue" text small @click="setRestaurant(item.restaurant)">{{
                shop.owner_name
              }}</v-btn>
            </div>
            <v-simple-table fixed-header height="auto">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Item</th>
                    <th class="text-left">Quantity</th>
                    <th class="text-left">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(i, index) in item.food_name
                      .split('||')
                      .filter((item) => item !== '')"
                    :key="index + 0.01"
                  >
                    <td>{{ i.split("@")[0] }}</td>
                    <td>{{ i.split("@")[1].split("$$")[0] }}</td>
                    <td>
                      {{ (i.split("$$")[1] * i.split("@")[1].split("$$")[0]).toFixed(2) }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <v-divider></v-divider>

            <div class="mt-2">
              <v-container>
                <v-row class="grey--text text-left" dense>
                  <v-col>
                    <div class="caption blue--text">Status</div>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="5" sm="5">
                    <div class="caption blue--text text-center">
                      <span v-if="item.takeaway == true">Takeaway</span>
                      <span v-else>Dine-In</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row class="grey--text text-left" dense>
                  <v-col>
                    <div class="caption blue--text">Arrival</div>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="5" sm="5">
                    <div class="caption blue--text text-center">
                      <span>{{ item.arrival_time }}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row class="grey--text text-left" dense>
                  <v-col>
                    <div class="caption blue--text">Order Date</div>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="5" sm="5">
                    <div class="caption blue--text text-center">
                      <span>{{ item.order_date.slice(4, 16) }}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row class="grey--text text-left" dense>
                  <v-col>
                    <div class="caption purple--text">Cost</div>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="5" sm="5">
                    <div class="caption purple--text text-center">
                      <v-icon>mdi-currency-inr</v-icon>
                      <span>{{ Number(item.total).toFixed(2) }}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row class="grey--text text-left" dense>
                  <v-col>
                    <div class="caption purple--text">GST(5%)+dipEAT(0%)</div>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="5" sm="5">
                    <div class="caption purple--text text-center">
                      <v-icon>mdi-currency-inr</v-icon>
                      <span>{{ ((item.total * 5) / 100).toFixed(2) }}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row class="grey--text text-left" dense>
                  <v-col>
                    <div class="caption purple--text">Sub-Total</div>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="5" sm="5">
                    <div class="caption purple--text text-center">
                      <v-icon>mdi-currency-inr</v-icon>
                      <span>{{
                        (
                          Number(item.total) + Number(((item.total * 5) / 100).toFixed(2))
                        ).toFixed(2)
                      }}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row class="grey--text text-left" dense>
                  <v-col>
                    <div class="caption purple--text">Discount</div>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="5" sm="5">
                    <div class="caption purple--text text-center">
                      ➖<v-icon>mdi-currency-inr</v-icon>
                      <span>{{ ((item.total * 5) / 100).toFixed(2) }}</span>
                    </div>
                  </v-col>
                </v-row>
                <v-row class="grey--text text-left" dense>
                  <v-col>
                    <div class="caption purple--text">Total</div>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="5" sm="5">
                    <div class="caption purple--text text-center">
                      <v-icon>mdi-currency-inr</v-icon>
                      <span>{{ Number(item.total).toFixed(2) }}</span>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            <v-divider color="red"></v-divider>
          </div>
        </div>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
// import axios from "axios";
import api from "@/main";

export default {
  name: "History",
  data: () => ({
    foodOrdered: [],
    shopProfileImage: [],
  }),

  methods: {
    async foodOrders() {
      const response = await api.get("/api/v1/foodorders/");
      const filteredData = response.data.filter(
        (item) => item.user === this.$store.state.user.username
      );
      //   console.log(filteredData);
      this.foodOrdered = filteredData.reverse();
      // sort by id in descending order
      this.foodOrdered.sort((a, b) => b.id - a.id);
      // console.log(this.foodOrdered);
    },

    setRestaurant(item) {
      this.$store.state.restaurant = item;
      // console.log(item);
      localStorage.setItem("restaurant", item);
      this.$router.push(`/menu/${item}`);
    },
    getShopProfileImage() {
      api.get(`/api/v1/ClientProfile4Image/`).then((res) => {
        this.shopProfileImage = res.data;
        // console.log(this.shopProfileImage);
      });
    },
  },

  created() {
    this.foodOrders();
    this.getShopProfileImage();
  },

  mounted() {
    this.$eventBus.$emit("phonePeValidation");
  },
};
</script>
