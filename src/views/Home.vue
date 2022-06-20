<template>
  

<v-main>

     
    <v-slide-group
      v-model="model"
      center-active
      show-arrows
    >
      <v-slide-item
        v-for="n in 20"
        :key="n"
        v-slot="{ active, toggle }"
      >
        <v-card
          :color="active ? 'transparent' : 'grey lighten-1'"
          class="ma-1"
          height="120"
          width="120"
          @click="toggle"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-scale-transition>
              <v-btn
                v-if="active"
                color="black"
                size="20"
                v-text="'open'"
                dark
              ></v-btn>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>


  <v-container>
    <v-carousel
    cycle
    height="200"
    hide-delimiter-background
    show-arrows-on-hover
    delimiter-icon="mdi-chevron-right"
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="text-h2">
            {{ slide }} offer
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
  </v-container>

<v-card
    class="mx-auto"
    max-width="500"
  >
  <v-container fluid>
      <v-row dense>
        <v-col
          
          :cols="12"
        >
          <v-card>
            <v-img
              :src="'https://cdn.vuetifyjs.com/images/cards/house.jpg'"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="'Pre-fab homes'"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-btn color="blue" dark to="/menu">
                Menu
              </v-btn>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  
</v-main>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
    }
  },
  methods: {
    
  }

}
</script>


