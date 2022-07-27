<template>
  <v-main>
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

    <v-container class="mt-4">
      <v-row justify="center">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.794052246003!2d75.81813531554864!3d26.910030466682688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db7e6c95cea9f%3A0xd1891eab8cb0afe0!2sMasala%20Chowk!5e0!3m2!1sen!2sin!4v1658497777698!5m2!1sen!2sin"
          width="550"
          height="180"
          style="border: 2px solid #000000"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
        {{ data }}
      </v-row>
    </v-container>
    <v-container class="text-center">
      <v-chip
        outlined
        color="primary"
      >
        <span>Dine-In</span>
      </v-chip>
      &nbsp;&nbsp;
      <v-chip outlined color="red">
        <span>4:30 pm - 5:30 pm</span>
      </v-chip>
      &nbsp;&nbsp;
      <v-chip outlined color="purple">
        <span>Rs.500</span>
      </v-chip>
    </v-container>

    <v-card max-width="550" class="mx-auto" elevation="5">
      <v-container>
        <v-card-title>
          <v-icon color="red">mdi-food</v-icon>&nbsp;&nbsp;&nbsp;
          <span class="title purple--text">Food Orders</span>
        </v-card-title>
        <v-divider></v-divider>
      </v-container>
      <v-container>
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
              <tr>
                <td>Mango Juice</td>
                <td>2</td>
                <td>200</td>
              </tr>
              <tr>
                <td>Mango Juice</td>
                <td>2</td>
                <td>200</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-container>
    </v-card>

    
    <v-container class="text-center mt-2">
      <v-btn 
        color="black"
        rounded
        dark
      >
      Cancel Order
    </v-btn>
    <v-subheader class="mt-3">
      Note: Cancellation will be charged 35% of the total amount. 
    </v-subheader>
    </v-container>
    
  </v-main>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
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

      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          value: "name",
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
        },
      ],
    };
  },
};
</script>

<style>
</style>