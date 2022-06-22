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

        <v-bottom-sheet v-model="sheet" inset>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="black" dark v-bind="attrs" v-on="on">
              <span class="white--text">Ok</span>
            </v-btn>
          </template>
          <v-sheet class="text-center" height="200px">
            <v-btn class="mt-2" text color="error" @click="sheet = !sheet">
              close
            </v-btn>
            <v-time-picker
              width="50%"
            ></v-time-picker>
          </v-sheet>
        </v-bottom-sheet>
      </v-bottom-navigation>

      <v-sheet
        id="scroll-threshold-example"
        class="overflow-y-auto pb-16"
        max-height="530"
      >
        <v-responsive height="auto">
          <v-container>
            <v-chip color="grey lighten-3">Starter</v-chip>
            <v-container v-for="i in 5" :key="i">
              <v-row>
                <v-col cols="4" sm="5" md="5">
                  <span> Manchurian </span>
                  <v-subheader :inset="inset"> 20 mins </v-subheader>
                </v-col>
                <v-col cols="3" sm="3" md="3">
                  <span> 100/- </span>
                </v-col>
                <v-col align="center" cols="5" sm="4" md="4">
                  <span>
                    <v-chip dark link color="black"
                      ><v-icon small dark>mdi-minus</v-icon></v-chip
                    ><v-chip>{{ i + 1 }}</v-chip
                    ><v-chip dark link color="black"
                      ><v-icon small dark>mdi-plus</v-icon></v-chip
                    >
                  </span>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row>
                <v-col cols="4" sm="5" md="5">
                  <span> Chai </span>
                  <v-subheader :inset="inset"> 5 mins </v-subheader>
                </v-col>
                <v-col cols="3" sm="2" md="3">
                  <span> 30/- </span>
                </v-col>
                <v-col align="center" cols="5" sm="4" md="4">
                  <span>
                    <v-chip dark link color="black"
                      ><v-icon small dark>mdi-minus</v-icon></v-chip
                    ><v-chip>2</v-chip
                    ><v-chip dark link color="black"
                      ><v-icon small dark>mdi-plus</v-icon></v-chip
                    >
                  </span>
                </v-col>
              </v-row>
            </v-container>
            <v-container>
              <v-row>
                <v-col cols="4" sm="5" md="5">
                  <span> Chai </span>
                  <v-subheader :inset="inset"> 5 mins </v-subheader>
                </v-col>
                <v-col cols="3" sm="3" md="3">
                  <span> 30/- </span>
                </v-col>
                <v-col align="center" cols="5" sm="4" md="4">
                  <span>
                    <v-chip dark link color="black"
                      ><v-icon small dark>mdi-minus</v-icon></v-chip
                    ><v-chip>2</v-chip
                    ><v-chip dark link color="black"
                      ><v-icon small dark>mdi-plus</v-icon></v-chip
                    >
                  </span>
                </v-col>
              </v-row>
            </v-container>
          </v-container>
        </v-responsive>
      </v-sheet>
    </v-card>
  </v-main>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      show: false,
      radios: null,
      rating: "2.5",
      sheet: false,
    };
  },
};
</script>