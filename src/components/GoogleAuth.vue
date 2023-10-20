<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-chip size="medium" class="ma-2" v-bind="attrs" v-on="on">
            Signup using Google
            <v-avatar right>
                
                    <v-img :src="google"/>
                
            </v-avatar>
        </v-chip>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Google authentication
        </v-card-title>

        <v-card-text>
          Feature Comming Soon...
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  data: () => ({
    dialog: false,
    google: require('@/assets/google.jpg')
  }),
};
</script>
