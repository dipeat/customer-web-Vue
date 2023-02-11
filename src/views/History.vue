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
        <div>
          <v-btn
            color="blue"
            text
            small
            @click="
              setRestaurant(item.restaurant);
              navigateMenu();
            "
            >{{ item.restaurant }}</v-btn
          >
        </div>
        <v-simple-table fixed-header height="auto">
          <template v-slot:default primary>
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
          &nbsp;&nbsp;
          <v-chip outlined color="red" class="mt-1">
            <span> Arrival: {{ item.arrival_time }}</span>
          </v-chip>
          &nbsp;&nbsp;
          <v-chip outlined color="orange" class="mt-1">
            <span>{{ item.order_date.slice(4, 16) }}</span>
          </v-chip>

          &nbsp;&nbsp;
          <v-chip outlined color="purple" class="mt-1">
            <span>Total =<v-icon>mdi-currency-inr</v-icon>{{ item.total }}</span>
          </v-chip>
        </v-container>
        <v-divider color="red"></v-divider>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "History",
  data: () => ({
    foodOrdered: [],
  }),

  methods: {
    async foodOrders() {
      const response = await axios.get("/api/v1/foodorders/");
      const filteredData = response.data.filter(
        (item) => item.user === this.$store.state.user.username
      );
      //   console.log(filteredData);
      this.foodOrdered = filteredData.reverse();
    },

    setRestaurant(item) {
      this.$store.state.restaurant = item;
      // console.log(item);
    },

    navigateMenu() {
      this.$router.push("/menu");
    },
  },

  created() {
    this.foodOrders();
  },
};
</script>
