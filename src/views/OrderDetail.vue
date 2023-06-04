<template>
  <v-main>
    <v-card max-width="550" class="mx-auto mt-5" elevation="5">
      <v-container>
        <v-card-title>
          <v-icon color="red">mdi-food</v-icon>&nbsp;&nbsp;&nbsp;
          <span class="title purple--text">Food Orders</span>
        </v-card-title>
        <v-divider></v-divider>
        <body v-if="foodOrdered == ''">
          No orders to show.
        </body>
      </v-container>
      <v-container v-for="(item, index) in foodOrdered" :key="index">
        <div v-for="(shop, index) in shopProfileImage" :key="index + 0.0129">
          <div v-if="item.delivered === false && shop.slug == item.restaurant">
            <div>
              <v-btn @click="setRestaurant(item.restaurant)" color="blue" text small>{{
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
                <span> Arrival: {{ item.arrival_time }}</span>
              </v-chip>
              <v-chip outlined color="green" class="mt-1">
                <span
                  >GST/Convenience-fee:<v-icon>mdi-currency-inr</v-icon
                  >{{ ((item.total * 5) / 100).toFixed(2) }}</span
                >
              </v-chip>

              <v-chip outlined color="purple" class="mt-1">
                <span
                  >Total =<v-icon>mdi-currency-inr</v-icon
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

    <v-container class="text-center mt-2" v-if="showNow">
      <v-dialog v-model="dialog" scrollable max-width="300px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="black" rounded dark v-bind="attrs" v-on="on">
            Cancel Order
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Reason for Cancellation:</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: auto">
            <v-radio-group v-model="dialogm1" column>
              <v-radio
                label="Ordered wrong food"
                :value="1"
                @click="expand = false"
              ></v-radio>
              <v-radio
                label="Ordered from other place"
                :value="2"
                @click="expand = false"
              ></v-radio>
              <v-radio
                label="Cannot reach on time"
                :value="3"
                @click="expand = false"
              ></v-radio>
              <v-radio
                label="Price too high"
                :value="4"
                @click="expand = false"
              ></v-radio>

              <v-radio
                label="Other :"
                :value="5"
                @click="expand = true"
                class="shrink"
              ></v-radio>
              <v-expand-transition>
                <v-textarea
                  label="Type message ..."
                  v-show="expand"
                  solo
                  auto-grow
                  class="mx-auto"
                  rows="1"
                >
                </v-textarea>
              </v-expand-transition>
            </v-radio-group>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="black" text @click="dialog = false"> Close </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="red" text @click="dialog = false"> Done </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <v-row justify="center">
      <v-subheader class="mt-3">
        Note: Cancellation is not allowed in order to avoid food wastage.
      </v-subheader>
    </v-row>
  </v-main>
</template>

<script>
// import axios from "axios";
import api from "@/main";
import { set } from "vue";

export default {
  name: "Order",
  data() {
    return {
      showNow: false,
      show: false,
      //   data: `<iframe
      //     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.794052246003!2d75.81813531554864!3d26.910030466682688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db7e6c95cea9f%3A0xd1891eab8cb0afe0!2sMasala%20Chowk!5e0!3m2!1sen!2sin!4v1658497777698!5m2!1sen!2sin"
      //     width="550"
      //     height="180"
      //     style="border: 2px solid #ccc"
      //     allowfullscreen=""
      //     loading="lazy"
      //     referrerpolicy="no-referrer-when-downgrade"
      //   ></iframe>`,

      dialogm1: "",
      dialog: false,
      expand: false,
      value: 0,
      rating: 2.5,

      foodOrdered: [],
      shopProfileImage: [],
    };
  },

  methods: {
    async foodOrders() {
      const response = await api.get("/api/v1/foodorders/");
      const filteredData = response.data.filter(
        (item) => item.user === this.$store.state.user.username
      );
      // console.log(filteredData);
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
    // this.foodOrders();
  },

  mounted() {
    this.foodOrders();
    this.getShopProfileImage();
    this.$eventBus.$emit("phonePeValidation");
  },
};
</script>

<style></style>
