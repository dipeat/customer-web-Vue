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
          <div v-if="shop.slug == item.restaurant">
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
            <v-container>
              <v-chip outlined color="primary" class="mt-1">
                <span v-if="item.takeaway == true">Takeaway</span>
                <span v-else>Dine-In</span>
              </v-chip>
              <v-chip outlined color="orange" class="mt-1">
                <span>{{ item.order_date.slice(4, 16) }}</span>
              </v-chip>
              <v-chip outlined color="red" class="mt-1">
                <span> Time: {{ item.arrival_time }}</span>
              </v-chip>
              <v-chip outlined color="green" class="mt-1">
                <span
                  >GST(5%)+dipEAT:<v-icon>mdi-currency-inr</v-icon
                  >{{ ((item.total * 5) / 100).toFixed(2) }}</span
                >
              </v-chip>

              <v-chip outlined color="purple" class="mt-1">
                <span
                  >Cost:<v-icon>mdi-currency-inr</v-icon
                  >{{ Number(item.total).toFixed(2) }}</span
                >
              </v-chip>
              <v-chip outlined color="purple" class="mt-1">
                <span
                  >Total:<v-icon>mdi-currency-inr</v-icon
                  >{{
                    (
                      Number(item.total) + Number(((item.total * 5) / 100).toFixed(2))
                    ).toFixed(2)
                  }}</span
                >
              </v-chip>
            </v-container>
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
