<template>
    <v-main>
        <v-container>
            <v-row>
                <v-col cols="6" sm="4" v-for="item, index in likedShops" :key="index">
                    <v-sheet rounded="lg" min-height="268">
                        <v-card class="mx-auto" max-width="400">
                            <v-row dense>
                                <v-col :cols="12">
                                    <v-img :src="'https://cdn.vuetifyjs.com/images/cards/house.jpg'"
                                        class="white--text align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" max-height="200px">
                                        <v-card-title> {{ item.shop }}</v-card-title>
                                    </v-img>

                                </v-col>
                            </v-row>
                        </v-card>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>
    </v-main>
</template>

<script>

import axios from 'axios'


export default {

    name: "LikedShop",

    data: () => ({

        likedShops: [],

    }),

    methods: {
        getLikedShops() {
            axios.get('/api/v1/likedshop/')
                .then(response => {
                    this.likedShops = response.data.filter(
                        (item) => item.customer === this.$store.state.user.username
                    );
                    console.log(this.likedShops)
                })
        },
    },

    created() {
        this.getLikedShops()
    }



}
</script>

<style>

</style>