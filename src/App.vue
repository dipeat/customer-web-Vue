<template>
  <v-app id="app">
    
      <v-app-bar absolute color="deep-purple accent-4" dark elevate-on-scroll>

        

        <v-menu transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }">
            
              <v-app-bar-nav-icon
                v-bind="attrs"
                v-on="on"
              ></v-app-bar-nav-icon>
          </template>
          <v-list>
            <v-list-item
              v-for="n in 5"
              :key="n"
              link
            >
              <v-list-item-title v-text="'Item ' + n"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-toolbar-title>Crispicy</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon color="red">
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-history</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-app-bar>

      <v-sheet>
        <v-main class="mt-13">
          <v-toolbar color="deep-purple accent-4" dark flat>
            <v-row  justify="center">
            <v-col sm="6">
              <v-text-field
                class="mx-7 mt-2"
                flat
                hide-details
                label="Search"
                prepend-inner-icon="mdi-magnify"
                solo-inverted
                rounded
              ></v-text-field>
            </v-col>
            </v-row>
          </v-toolbar>
          <v-container>
            <router-view />
          </v-container>
        </v-main>
      </v-sheet>
    
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
