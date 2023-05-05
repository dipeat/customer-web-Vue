<template>
  <div>
    <div class="text-center">
      <v-card class="mx-auto my-16" max-width="800" dark
        ><div class="cart-style">
          <div class="text-h4 pa-3">
            Need help, <br />
            please contact us:
          </div>
          <br />
          <div class="text-h5 pa-3">Email :&nbsp;&nbsp; dipeatdotcom@gmail.com</div>
        </div>
      </v-card>
    </div>

    <body>
      <v-container>
        <div class="pa-7 col-md-6 col-sm-12 mx-auto">
          <h1 class="text-center">FAQs</h1>

          <v-row class="pa-7">
            <v-expansion-panels inset focusable>
              <v-expansion-panel>
                <v-expansion-panel-header
                  color="grey darken-2"
                  class="white--text font-weight-bold"
                  >Why page is not responding or not showing any
                  data?</v-expansion-panel-header
                >
                <v-expansion-panel-content>
                  If you are not able to login/logout or page is not responding, please
                  clear your browser cache/cookies and try again.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </div>
      </v-container>
    </body>
  </div>
</template>

<script>
export default {
  name: "Help",

  data: () => ({}),

  methods: {},

  created() {},
};
</script>
<style>
.cart-style {
  background-image: linear-gradient(135deg, #6d2db6 0%, #0d0146 100%);
}
</style>
