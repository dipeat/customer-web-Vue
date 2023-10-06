<template>
    <v-card
        width="100%"
        class="loggedIn-nav mx-auto border border-danger"
        elevation="2"
        dark
      >
        <!-- About Us -->
        <v-card-actions>
          <v-row>
            <v-col cols="12" sm="4">
              <div class="menu-item text-center">
                <v-img
                  class="mt-7"
                  src="https://dipeat-s3-bucket-1.s3.amazonaws.com/simple_logo.png"
                  alt=""
                />
              </div>
            </v-col>
            <v-col cols="12" sm="8">
              <div class="mt-5 about-justify">
                We are a team of fooodiess❗, who loves the taste of food when our
                taste-buds explode🤯. Yes, you guessed us right we are pro chatkara-type
                eater. The taste of food increase many folds when the meal is served like
                a pro, on-time, no-waiting. Here in dipEAT, we are happy to facilitate you
                with dine-in and takeaway checkouts. Book your order according to your
                convenience and time. We all want to receive food as soon as possible when
                we order food in the restaurant. Our goal is simple, book order before
                leaving your place and food is served as you put your foot in the
                restaurant according to your arrival-time.<br />
                Peace✌️
              </div>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
</template>

<script>

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
</style>
