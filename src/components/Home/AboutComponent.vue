<template>
    <v-card
        
        class="loggedIn-nav pa-5 w-full"
        elevation="10"
        dark
      >
        <!-- About Us -->
        <v-card-actions>
          <v-row>
            <v-col cols="12" sm="4" v-if="isDesktop == true">
              <v-layout align-center justify-center fill-height>
                <v-img
                  
                  src="https://dipeat-s3-bucket-1.s3.amazonaws.com/simple_logo.png"
                  alt=""
                />
              </v-layout>
            </v-col>
            <v-col cols="12" sm="8">
              <div class="mt-5 pa-2 about-justify">
                <!-- We are a team of fooodiess❗, who loves the taste of food when our
                taste-buds explode🤯. Yes, you guessed us right we are pro chatkara-type
                eater. The taste of food increase many folds when the meal is served like
                a pro, on-time, no-waiting. Here in dipEAT, we are happy to facilitate you
                with dine-in and takeaway checkouts. Book your order according to your
                convenience and time. We all want to receive food as soon as possible when
                we order food in the restaurant. Our goal is simple, book order before
                leaving your place and food is served as you put your foot in the
                restaurant according to your arrival-time.<br />
                Peace✌️ -->
                Calling all food enthusiasts! At dipEAT, we're a squad of flavor fanatics who live for taste 
                explosions. Whether you're into dine-in or takeaway, we've got you covered. Order in advance, 
                and your meal is prepped to perfection, so you can savor every bite the moment you arrive. No 
                more waiting around! Our mission is simple: book before you leave, and your food is served the 
                second you step through our doors. Say goodbye to hunger-induced impatience; say hello to 
                instant foodie gratification at dipEAT! 🍔🌮🍕🕒
              </div>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
</template>

<script>

export default{
  data:()=>({
    isDesktop:true
  }),
  methods:{
    checkScreenSize() {
      this.isDesktop = window.innerWidth >= 760 // Adjust the breakpoint as needed
    },
  },
  mounted() {
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
}

</script>

<style scoped>
.menu-item {
  width: 260px;
  margin: 20px auto;
  border-radius: 6px;
  overflow: hidden;
}

.menu-item img {
  width: 100%;
  height: auto;
  border-radius: 20%;
}
.about-justify{
  font-size: 20px;
  font-style: italic;
  word-spacing: 5px;
}
</style>
