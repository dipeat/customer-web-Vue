<template>
  <v-main>
    <!-- <v-card-actions class="justify-center" v-if="showNow == true">
      <v-chip color="grey lighten-3" v-if="$store.state.isAuthenticated">
        <v-avatar>
          <v-icon color="orange darken-4">mdi-wallet</v-icon> &nbsp; &nbsp;
        </v-avatar>
        <span
          >Balance: <v-icon>mdi-currency-inr</v-icon>
          {{ $store.state.walletBalance }}</span
        >&nbsp;&nbsp;|
        <v-btn small text rounded dark color="purple" @click.stop="dialog1 = true"
          >Add</v-btn
        >
      </v-chip>
    </v-card-actions>
    <v-dialog v-model="dialog1" max-width="290" v-if="showNow == true">
      <v-card>
        <v-card-title class="text-h5 brown--text"> Add Money to Wallet </v-card-title>

        <v-card-text>
          <form>
            <v-text-field label="Amount" v-model="amount"></v-text-field>
          </form>
        </v-card-text>
        <v-subheader>Note: Add rupees 200 or more to wallet.</v-subheader>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="red" text @click="dialog1 = false"> Cancel </v-btn>
          <v-spacer></v-spacer>

          <v-btn
            color="blue"
            outlined
            @click.prevent="pay"
            :disabled="amount == '' || amount < 200 || amount != parseInt(amount)"
          >
            Pay
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->

    <!-- <v-card class="mx-auto" max-width="550">
      <div v-for="(image, index) in shopProfileImage" :key="index + 0.0019">
        <v-img
          :src="image.shop_image"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="200px"
        >
          <v-container>
            <v-chip color="white align-bottom">
              <v-card-title v-text="image.owner_name" class="purple--text">
              </v-card-title>
              <v-btn
                icon
                small
                @click="likeShop($store.state.restaurant)"
                v-if="$store.state.restaurant && $store.state.isAuthenticated"
              >
                <v-icon :color="likeColor">mdi-heart</v-icon>
              </v-btn>
            </v-chip>
            <v-chip color="white" v-if="$store.state.isAuthenticated && showNow">
              <v-btn icon small v-if="$store.state.restaurant">
                <v-icon color="blue">mdi-share-variant</v-icon>
              </v-btn>
            </v-chip>
          </v-container>
        </v-img>
      </div>

      <div v-for="(profile, index) in shopProfileImage" :key="index + 0.0029">
        <v-card-actions>
          <v-rating
            v-if="showNow"
            v-model="rating"
            background-color="purple lighten-3"
            color="purple"
            half-increments
          ></v-rating>
          <div v-if="filterCategoryList != ''">Category:</div>
          <v-badge
            :content="filterCategoryList.length"
            value="2"
            color="blue"
            overlap
            left
            inline
            v-if="filterCategoryList != ''"
          >
          </v-badge>

          <v-spacer></v-spacer>
          <v-btn color="orange lighten-1" text> Details </v-btn>

          <v-btn icon @click="show = !show">
            <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <div v-show="show">
            <v-divider></v-divider>

            <v-card-text>
              <div><strong>Restaurant Name:</strong> {{ profile.owner_name }}</div>
              <div><strong>Contact:</strong> {{ profile.phone }}</div>
              <div><strong>Tags:</strong> {{ profile.shop_type }}</div>
              <div><strong>Address:</strong> {{ profile.address }}</div>
            </v-card-text>
          </div>
        </v-expand-transition>
      </div>
    </v-card>

    <br /> -->

    <template>
      <v-row class="mt-1">
        <v-col cols="12" sm="12" md="6" offset-md="3">
          <v-card class="mx-auto">
            <v-toolbar
              extended
              v-for="(image, index) in shopProfileImage"
              :key="index + 0.0019"
            >
              <v-list-item-avatar tile size="99" color="grey">
                <v-img :src="image.shop_image" height="99px"> </v-img>
              </v-list-item-avatar>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title class="text-h6 mt-3">{{
                    image.owner_name
                  }}</v-list-item-title>
                  <v-list-item-subtitle class="mt-2"
                    ><v-icon>mdi-phone</v-icon>: {{ image.phone }}</v-list-item-subtitle
                  >
                </v-list-item-content>
              </v-list-item>
              <template v-slot:extension>
                <v-fab-transition>
                  <v-menu
                    transition="slide-y-transition"
                    bottom
                    offset-y
                    auto
                    rounded="b-xl"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="purple"
                        fab
                        dark
                        small
                        absolute
                        bottom
                        left
                        v-bind="attrs"
                        v-on="on"
                      >
                        <v-icon> mdi-format-list-bulleted-square</v-icon>
                      </v-btn>
                      <v-btn
                        color="blue-grey lighten-3"
                        fab
                        dark
                        small
                        absolute
                        bottom
                        outlined
                        right
                        @click="likeShop($store.state.restaurant)"
                        v-if="$store.state.restaurant && $store.state.isAuthenticated"
                      >
                        <v-icon :color="likeColor">mdi-heart</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-for="(category, index) in menu"
                        :key="index + 0.0321"
                        @click="filterCategory(category)"
                      >
                        <v-list-item-title
                          ><v-checkbox
                            color="info"
                            :value="true ? category : false"
                            hide-details
                            dense
                            :label="category"
                          ></v-checkbox
                        ></v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-fab-transition>
              </template>
            </v-toolbar>
            <v-card-text style="height: 610px" class="grey lighten-5">
              <div>
                <v-sheet
                  id="scroll-threshold-example"
                  class="overflow-y-auto pb-16"
                  max-height="610"
                  v-if="filterCategoryList != ''"
                >
                  <v-responsive height="auto">
                    <div v-for="(cat, index) in filterCategoryList" :key="index + 0.0001">
                      <v-chip outlined color="red darken-2 mt-2"
                        ><strong>{{ cat }}</strong></v-chip
                      >

                      <div v-for="(item, index) in menuList" :key="index + 0.001">
                        <div v-if="cat == item.category">
                          <v-container v-if="item.restaurant == restaurant_name">
                            <v-row>
                              <v-col cols="4" sm="5" md="5">
                                <span> {{ item.name }}</span>
                                <v-subheader> {{ item.prepare_time }} mins</v-subheader>
                              </v-col>
                              <v-col cols="3" sm="3" md="3">
                                <span
                                  class="text-decoration-line-through"
                                  v-if="item.original_price > item.final_price"
                                >
                                  {{ item.original_price }}
                                </span>
                                &nbsp; <span> {{ item.final_price }}</span>
                              </v-col>
                              <v-col align="center" cols="5" sm="4" md="4">
                                <div v-if="item.availablity == true">
                                  <v-chip outlined color="pink darken-2">{{
                                    item.value
                                  }}</v-chip>
                                  <v-chip small dark link color="purple darken-4">
                                    <v-chip
                                      small
                                      dark
                                      link
                                      color="purple darken-4"
                                      v-if="item.value > 0"
                                      @click="minusOne(item)"
                                    >
                                      <v-icon small dark>mdi-minus</v-icon>
                                    </v-chip>
                                    <v-chip
                                      small
                                      dark
                                      link
                                      color="purple darken-4"
                                      @click="plusOne(item)"
                                    >
                                      <v-icon small dark>mdi-plus</v-icon>
                                    </v-chip>
                                  </v-chip>
                                </div>
                                <div v-else>
                                  <v-chip outlined color="red">Not Available</v-chip>
                                </div>
                              </v-col>
                            </v-row>
                            <v-row
                              justify="center"
                              v-if="
                                item.description != '' &&
                                item.description != null &&
                                item.description != 'null'
                              "
                            >
                              <v-expansion-panels inset>
                                <v-expansion-panel>
                                  <v-expansion-panel-header color="grey lighten-4"
                                    >{{ item.description.slice(0, 29) }}
                                    .....
                                    <v-spacer></v-spacer>
                                    Details
                                  </v-expansion-panel-header>
                                  <v-expansion-panel-content>
                                    {{ item.description }}
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </v-expansion-panels>
                            </v-row>
                          </v-container>
                          <v-divider color="#E0E0E0" class="mt-2"></v-divider>
                        </div>
                      </div>
                    </div>
                  </v-responsive>
                </v-sheet>

                <v-sheet
                  id="scroll-threshold-example"
                  class="overflow-y-auto pb-16"
                  max-height="610"
                  v-else
                >
                  <v-responsive height="auto">
                    <div v-for="(cat, index) in menu" :key="index + 0.0001">
                      <v-chip outlined color="red darken-2 mt-2"
                        ><strong>{{ cat }}</strong></v-chip
                      >

                      <div v-for="(item, index) in menuList" :key="index + 0.001">
                        <div v-if="cat == item.category">
                          <v-container v-if="item.restaurant == restaurant_name">
                            <v-row>
                              <v-col cols="4" sm="5" md="5">
                                <span> {{ item.name }}</span>
                                <v-subheader> {{ item.prepare_time }} mins</v-subheader>
                              </v-col>
                              <v-col cols="3" sm="3" md="3">
                                <span
                                  class="text-decoration-line-through"
                                  v-if="item.original_price > item.final_price"
                                >
                                  {{ item.original_price }}
                                </span>
                                &nbsp; <span> {{ item.final_price }}</span>
                              </v-col>
                              <v-col align="center" cols="5" sm="4" md="4">
                                <div v-if="item.availablity == true">
                                  <v-chip outlined color="pink darken-2">{{
                                    item.value
                                  }}</v-chip>
                                  <v-chip small dark link color="purple darken-4">
                                    <v-chip
                                      small
                                      dark
                                      link
                                      color="purple darken-4"
                                      v-if="item.value > 0"
                                      @click="minusOne(item)"
                                    >
                                      <v-icon small dark>mdi-minus</v-icon>
                                    </v-chip>
                                    <v-chip
                                      small
                                      dark
                                      link
                                      color="purple darken-4"
                                      @click="plusOne(item)"
                                    >
                                      <v-icon small dark>mdi-plus</v-icon>
                                    </v-chip>
                                  </v-chip>
                                </div>
                                <div v-else>
                                  <v-chip outlined color="red">Not Available</v-chip>
                                </div>
                              </v-col>
                            </v-row>
                            <v-row
                              justify="center"
                              v-if="
                                item.description != '' &&
                                item.description != null &&
                                item.description != 'null'
                              "
                            >
                              <v-expansion-panels inset>
                                <v-expansion-panel>
                                  <v-expansion-panel-header color="grey lighten-4"
                                    >{{ item.description.slice(0, 29) }}
                                    .....
                                    <v-spacer></v-spacer>
                                    Details
                                  </v-expansion-panel-header>
                                  <v-expansion-panel-content>
                                    {{ item.description }}
                                  </v-expansion-panel-content>
                                </v-expansion-panel>
                              </v-expansion-panels>
                            </v-row>
                          </v-container>
                          <v-divider color="#E0E0E0" class="mt-2"></v-divider>
                        </div>
                      </div>
                    </div>
                  </v-responsive>
                </v-sheet>
              </div>
            </v-card-text>
            <v-card-text style="height: 30px; position: relative">
              <v-fab-transition>
                <div v-for="(stat, index) in status" :key="index + 0.007">
                  <div
                    v-if="
                      restaurant_name == stat.restaurant &&
                      $store.state.isAuthenticated != false
                    "
                    class="text-center"
                  >
                    <v-row v-if="stat.open_close">
                      <v-col>
                        <v-dialog v-model="dialog" scrollable max-width="350px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              color="pink"
                              dark
                              absolute
                              top
                              right
                              fab
                              @click="
                                oK();
                                refreshClock();
                                setDefaultTime();
                              "
                              v-bind="attrs"
                              v-on="on"
                              :disabled="
                                $store.state.isAuthenticated == false ? true : false
                              "
                            >
                              Next
                            </v-btn>
                          </template>
                          <v-card>
                            <v-card-title>Orders</v-card-title>
                            <v-divider color="purple"></v-divider>
                            <v-card-text style="height: auto">
                              <div v-for="(order, index) in displayOrder" :key="index">
                                <v-container v-if="displayOrder != ''">
                                  <v-row>
                                    <v-col>
                                      <div>{{ order.name }}</div>
                                    </v-col>
                                    <v-col>
                                      <div>
                                        {{ (order.final_price * order.value).toFixed(2) }}
                                      </div>
                                    </v-col>
                                    <v-col>
                                      <div>{{ order.value }}</div>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </div>
                              <v-divider color="orange"></v-divider>
                              <div class="text-center">
                                <v-container v-if="displayOrder != ''">
                                  <v-chip outlined color="pink">
                                    <div>
                                      Sub Total:&nbsp;
                                      <span
                                        ><v-icon>mdi-currency-inr</v-icon
                                        >{{ total.toFixed(2) }}</span
                                      >
                                    </div>
                                  </v-chip>
                                  <v-chip outlined color="green" class="mt-1">
                                    <div>
                                      GST (5%):&nbsp;
                                      <span
                                        ><v-icon>mdi-currency-inr</v-icon
                                        >{{ (total.toFixed(2) * 5) / 100 }}</span
                                      >
                                    </div>
                                  </v-chip>
                                  <br />
                                  <v-chip outlined color="purple" class="mt-1">
                                    <div>
                                      <strong>
                                        Total:&nbsp;
                                        <span
                                          ><v-icon>mdi-currency-inr</v-icon
                                          >{{ finalTotal }}</span
                                        >
                                      </strong>
                                    </div>
                                  </v-chip>
                                  <v-chip outlined color="blue" class="mt-1">
                                    <div>
                                      Prepare Time:&nbsp;
                                      <span
                                        ><v-icon>mdi-alarm</v-icon
                                        >{{ premare_time }} mins</span
                                      >
                                    </div>
                                  </v-chip>
                                  <v-chip
                                    outlined
                                    color="purple"
                                    v-if="packagingCharges != 0 && checkbox"
                                    class="mt-1"
                                  >
                                    <div>
                                      Packaging charge:&nbsp;
                                      <span
                                        ><v-icon>mdi-currency-inr</v-icon
                                        >{{ packagingCharges }}</span
                                      >
                                    </div>
                                  </v-chip>

                                  <v-row>
                                    <v-col cols="6" sm="6">
                                      <v-dialog
                                        ref="dialoge"
                                        v-model="modal2"
                                        :return-value.sync="time"
                                        width="290px"
                                      >
                                        <template v-slot:activator="{ on, attrs }">
                                          <v-text-field
                                            v-model="time"
                                            label="Arrival time"
                                            prepend-icon="mdi-clock-time-four-outline"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            @click="refreshClock"
                                          ></v-text-field>
                                        </template>

                                        <v-time-picker
                                          v-if="modal2"
                                          v-model="time"
                                          full-width
                                          ampm-in-title
                                          scrollable
                                          :min="minClock"
                                          @change="refreshClock"
                                        >
                                          <v-spacer></v-spacer>
                                          <v-btn
                                            text
                                            color="primary"
                                            @click="modal2 = false"
                                          >
                                            Cancel
                                          </v-btn>
                                          <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.dialoge[0].save(time)"
                                          >
                                            OK
                                          </v-btn>
                                        </v-time-picker>
                                      </v-dialog>
                                    </v-col>
                                    <v-col cols="3" sm="3">
                                      <v-checkbox
                                        v-model="dineCheckbox"
                                        label="Dine In"
                                        color="primary"
                                        @click="checkBoxClick"
                                      >
                                      </v-checkbox>
                                    </v-col>
                                    <v-col cols="3" sm="3">
                                      <v-checkbox
                                        v-model="checkbox"
                                        label="Take Away"
                                        color="primary"
                                        @click="
                                          checkBoxClick();
                                          oK();
                                          refreshClock();
                                          setDefaultTime();
                                        "
                                      >
                                      </v-checkbox>
                                    </v-col>
                                  </v-row>
                                  <v-text-field
                                    v-model="message"
                                    placeholder="Type message ..."
                                    filled
                                    :readable="enableMessage"
                                    @mouseup="changeEnableMessage"
                                    dense
                                    maxlength="200"
                                    counter
                                  ></v-text-field>
                                </v-container>
                                <div>
                                  <v-alert
                                    border="right"
                                    colored-border
                                    type="error"
                                    elevation="3"
                                    class="mt-3"
                                    v-if="errorMessages != ''"
                                  >
                                    {{ errorMessages }}
                                  </v-alert>
                                </div>
                                <v-container v-if="displayOrder == ''">
                                  <h4>Please select items for order!</h4>
                                </v-container>
                                <!-- <v-container
                      v-if="displayOrder != '' && $store.state.walletBalance < total"
                    >
                      <h4>You do not have enough money in wallet, please recharge!</h4>
                    </v-container> -->
                              </div>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions class="cart-style">
                              <v-btn color="white" text @click="dialog = false">
                                Cancel
                              </v-btn>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="white"
                                text
                                dark
                                @click="checkout"
                                v-if="foodOrder != ''"
                              >
                                Checkout
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-col>
                    </v-row>
                    <v-container class="text-center white--text" v-else
                      ><h4>Shop closed</h4></v-container
                    >
                  </div>
                  <div class="text-center red--text" v-else>
                    <v-chip color="white" class="red--text">
                      <strong>Please Log-In to order</strong>
                    </v-chip>
                  </div>
                </div>
              </v-fab-transition>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
    <!-- <br /> -->
    <!-- <v-card class="mx-auto overflow-hidden" max-width="550" height="830">
      <v-row justify="space-around">
        <v-col cols="12" sm="10" md="8">
          <v-sheet elevation="5" class="py-2 px-1">
            <v-chip-group multiple active-class="primary--text">
              <v-chip
                filter
                outlined
                color="grey darken-2"
                v-for="(category, index) in menu"
                :key="index + 0.0321"
                @click="filterCategory(category)"
              >
                {{ category }}
              </v-chip>
            </v-chip-group>
          </v-sheet>
        </v-col>
      </v-row> -->

    <!-- <v-sheet
        id="scroll-threshold-example"
        class="overflow-y-auto pb-16"
        max-height="830"
        v-if="filterCategoryList != ''"
      >
        <v-responsive height="auto">
          <v-container v-for="(cat, index) in filterCategoryList" :key="index + 0.0001">
            <v-chip outlined color="red darken-2"
              ><strong>{{ cat }}</strong></v-chip
            >

            <div v-for="(item, index) in menuList" :key="index + 0.001">
              <div v-if="cat == item.category">
                <v-container v-if="item.restaurant == restaurant_name">
                  <v-row>
                    <v-col cols="4" sm="5" md="5">
                      <span> {{ item.name }}</span>
                      <v-subheader> {{ item.prepare_time }} mins</v-subheader>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <span
                        class="text-decoration-line-through"
                        v-if="item.original_price > item.final_price"
                      >
                        {{ item.original_price }}
                      </span>
                      &nbsp; <span> {{ item.final_price }}</span>
                    </v-col>
                    <v-col align="center" cols="5" sm="4" md="4">
                      <div v-if="item.availablity == true">
                        <v-chip outlined color="pink darken-2">{{ item.value }}</v-chip>
                        <v-chip small dark link color="purple darken-4">
                          <v-chip
                            small
                            dark
                            link
                            color="purple darken-4"
                            v-if="item.value > 0"
                            @click="minusOne(item)"
                          >
                            <v-icon small dark>mdi-minus</v-icon>
                          </v-chip>
                          <v-chip
                            small
                            dark
                            link
                            color="purple darken-4"
                            @click="plusOne(item)"
                          >
                            <v-icon small dark>mdi-plus</v-icon>
                          </v-chip>
                        </v-chip>
                      </div>
                      <div v-else>
                        <v-chip outlined color="red">Not Available</v-chip>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row
                    justify="center"
                    v-if="
                      item.description != '' &&
                      item.description != null &&
                      item.description != 'null'
                    "
                  >
                    <v-expansion-panels inset>
                      <v-expansion-panel>
                        <v-expansion-panel-header color="grey lighten-4"
                          >{{ item.description.slice(0, 29) }}
                          .....
                          <v-spacer></v-spacer>
                          Details
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          {{ item.description }}
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-row>
                </v-container>
                <v-divider color="#E0E0E0" class="mt-2"></v-divider>
              </div>
            </div>
          </v-container>
        </v-responsive>
      </v-sheet>

      <v-sheet
        id="scroll-threshold-example"
        class="overflow-y-auto pb-16"
        max-height="830"
        v-else
      >
        <v-responsive height="auto">
          <v-container v-for="(cat, index) in menu" :key="index + 0.0001">
            <v-chip outlined color="red darken-2"
              ><strong>{{ cat }}</strong></v-chip
            >

            <div v-for="(item, index) in menuList" :key="index + 0.001">
              <div v-if="cat == item.category">
                <v-container v-if="item.restaurant == restaurant_name">
                  <v-row>
                    <v-col cols="4" sm="5" md="5">
                      <span> {{ item.name }}</span>
                      <v-subheader> {{ item.prepare_time }} mins</v-subheader>
                    </v-col>
                    <v-col cols="3" sm="3" md="3">
                      <span
                        class="text-decoration-line-through"
                        v-if="item.original_price > item.final_price"
                      >
                        {{ item.original_price }}
                      </span>
                      &nbsp; <span> {{ item.final_price }}</span>
                    </v-col>
                    <v-col align="center" cols="5" sm="4" md="4">
                      <div v-if="item.availablity == true">
                        <v-chip outlined color="pink darken-2">{{ item.value }}</v-chip>
                        <v-chip small dark link color="purple darken-4">
                          <v-chip
                            small
                            dark
                            link
                            color="purple darken-4"
                            v-if="item.value > 0"
                            @click="minusOne(item)"
                          >
                            <v-icon small dark>mdi-minus</v-icon>
                          </v-chip>
                          <v-chip
                            small
                            dark
                            link
                            color="purple darken-4"
                            @click="plusOne(item)"
                          >
                            <v-icon small dark>mdi-plus</v-icon>
                          </v-chip>
                        </v-chip>
                      </div>
                      <div v-else>
                        <v-chip outlined color="red">Not Available</v-chip>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row
                    justify="center"
                    v-if="
                      item.description != '' &&
                      item.description != null &&
                      item.description != 'null'
                    "
                  >
                    <v-expansion-panels inset>
                      <v-expansion-panel>
                        <v-expansion-panel-header color="grey lighten-4"
                          >{{ item.description.slice(0, 29) }}
                          .....
                          <v-spacer></v-spacer>
                          Details
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          {{ item.description }}
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-row>
                </v-container>
                <v-divider color="#E0E0E0" class="mt-2"></v-divider>
              </div>
            </div>
          </v-container>
        </v-responsive>
      </v-sheet>
    </v-card> -->

    <!-- <v-card
      color="deep-purple lighten-1"
      shaped
      class="mx-auto overflow-hidden mt-2"
      max-width="550"
      height="40"
      v-for="(stat, index) in status"
      :key="index + 0.007"
    >
      <div
        v-if="restaurant_name == stat.restaurant && $store.state.isAuthenticated != false"
        class="text-center"
      >
        <v-row v-if="stat.open_close">
          <v-col>
            <v-dialog v-model="dialog" scrollable max-width="350px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="cart-style"
                  @click="
                    oK();
                    refreshClock();
                    setDefaultTime();
                  "
                  large
                  elevation="9"
                  rounded
                  text
                  dark
                  v-bind="attrs"
                  v-on="on"
                  :disabled="$store.state.isAuthenticated == false ? true : false"
                >
                  Next
                </v-btn>
              </template>
              <v-card>
                <v-card-title>Orders</v-card-title>
                <v-divider color="purple"></v-divider>
                <v-card-text style="height: auto">
                  <div v-for="(order, index) in displayOrder" :key="index">
                    <v-container v-if="displayOrder != ''">
                      <v-row>
                        <v-col>
                          <div>{{ order.name }}</div>
                        </v-col>
                        <v-col>
                          <div>
                            {{ (order.final_price * order.value).toFixed(2) }}
                          </div>
                        </v-col>
                        <v-col>
                          <div>{{ order.value }}</div>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>
                  <v-divider color="orange"></v-divider>
                  <div class="text-center">
                    <v-container v-if="displayOrder != ''">
                      <v-chip outlined color="pink">
                        <div>
                          Total:&nbsp;
                          <span
                            ><v-icon>mdi-currency-inr</v-icon>{{ total.toFixed(2) }}</span
                          >
                        </div>
                      </v-chip>
                      <v-chip outlined color="blue" class="mt-1">
                        <div>
                          Prepare Time:&nbsp;
                          <span><v-icon>mdi-alarm</v-icon>{{ premare_time }} mins</span>
                        </div>
                      </v-chip>
                      <v-chip
                        outlined
                        color="purple"
                        v-if="packagingCharges != 0 && checkbox"
                        class="mt-1"
                      >
                        <div>
                          Packaging charge:&nbsp;
                          <span
                            ><v-icon>mdi-currency-inr</v-icon>{{ packagingCharges }}</span
                          >
                        </div>
                      </v-chip>

                      <v-row>
                        <v-col cols="6" sm="6">
                          <v-dialog
                            ref="dialoge"
                            v-model="modal2"
                            :return-value.sync="time"
                            width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="time"
                                label="Arrival time"
                                prepend-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                                @click="refreshClock"
                              ></v-text-field>
                            </template>

                            <v-time-picker
                              v-if="modal2"
                              v-model="time"
                              full-width
                              ampm-in-title
                              scrollable
                              :min="minClock"
                              @change="refreshClock"
                            >
                              <v-spacer></v-spacer>
                              <v-btn text color="primary" @click="modal2 = false">
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.dialoge[0].save(time)"
                              >
                                OK
                              </v-btn>
                            </v-time-picker>
                          </v-dialog>
                        </v-col>
                        <v-col cols="3" sm="3">
                          <v-checkbox
                            v-model="dineCheckbox"
                            label="Dine In"
                            color="primary"
                            @click="checkBoxClick"
                          >
                          </v-checkbox>
                        </v-col>
                        <v-col cols="3" sm="3">
                          <v-checkbox
                            v-model="checkbox"
                            label="Take Away"
                            color="primary"
                            @click="
                              checkBoxClick();
                              oK();
                              refreshClock();
                              setDefaultTime();
                            "
                          >
                          </v-checkbox>
                        </v-col>
                      </v-row>
                      <v-text-field
                        v-model="message"
                        placeholder="Type message ..."
                        filled
                        :readable="enableMessage"
                        @mouseup="changeEnableMessage"
                        dense
                        maxlength="200"
                        counter
                      ></v-text-field>
                    </v-container>
                    <div>
                      <v-alert
                        border="right"
                        colored-border
                        type="error"
                        elevation="3"
                        class="mt-3"
                        v-if="errorMessages != ''"
                      >
                        {{ errorMessages }}
                      </v-alert>
                    </div>
                    <v-container v-if="displayOrder == ''">
                      <h4>Please select items for order!</h4>
                    </v-container>
                  </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="cart-style">
                  <v-btn color="white" text @click="dialog = false"> Cancel </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn color="white" text dark @click="checkout" v-if="foodOrder != ''">
                    Checkout
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
        <v-container class="text-center white--text" v-else
          ><h4>Shop closed</h4></v-container
        >
      </div>
      <div class="text-center white--text mt-2" v-else>
        <strong>Please Log-In to order</strong>
      </div>
    </v-card> -->
  </v-main>
</template>

<script>
// import axios from "axios";
import api from "@/main";

export default {
  name: "Menu",
  data() {
    return {
      dialog: false,
      dialog1: false,
      dialog2: false,
      hidden: false,
      show: false,
      radios: null,
      rating: 4.0,
      sheet: false,
      enableMessage: true,
      dineCheckbox: true,
      filterCategoryList: [],

      showNow: false,

      errorMessages: "",
      minClock: "",

      time: null,
      menu2: false,
      modal2: false,
      total: 0,
      premare_time: 0,
      message: "",
      checkbox: false,
      likeColor: "",
      likeBoolShop: true,
      status: "",
      packagingCharges: 0,
      restaurant_name: localStorage.getItem("restaurant"),
      chargesGST: 0,
      finalTotal: 0,

      shopProfileImage: [],
      foodName: [],
      menuList: [],
      menu: [],
      foodOrder: [],
      displayOrder: [],
      likedShops: [],

      amount: "",
      currency: "INR",
      paymentId: "",
      validity: "",
    };
  },

  methods: {
    phonePe() {
      console.log(Number(this.total).toFixed(2));

      api
        .post("/api/v1/phonepe_payment/", {
          transactionId: Date.now(),
          customerName: this.$store.state.user.username,
          amount: Number(this.finalTotal) * 100,
        })
        .then((response) => {
          // console.log(response.data);
          // console.log(response.data.response.success);

          localStorage.setItem(
            "transactionId",
            response.data.response.data.merchantTransactionId.slice(11, 30)
          );

          // redirect to phonepe payment page
          if (response.data.response.success == true) {
            window.location.href =
              response.data.response.data.instrumentResponse.redirectInfo.url;
          }
        });
    },

    phonePeValidation() {
      api
        .post("/api/v1/phonepe_validation/", {
          transactionId: localStorage.getItem("transactionId"),
        })
        .then((response) => {
          console.log(response.data);
          console.log(response.data.response.success);

          // redirect to phonepe payment page
          // if (response.data.response.success == true) {
          //   window.location.href =
          //     response.data.response.data.instrumentResponse.redirectInfo.url;
          // }
        });
    },

    pay() {
      // Send a request to the backend to create a payment
      if (this.amount != "") {
        api
          .post("/api/v1/create_payment/", {
            amount: this.amount * 100,
            currency: "INR",
          })
          .then((response) => {
            this.paymentId = response.data.payment_id;
            // Open the Razorpay checkout
            const options = {
              key: "rzp_test_BLtsjnAxhyqY38",
              currency: "INR",
              amount: this.amount * 100,
              name: "dipEAT",
              description: "Payment for your wallet",
              order_id: response.data.payment_id,
              handler: (response) => {
                // console.log(response.razorpay_payment_id);
                // console.log(response.razorpay_order_id);
                // console.log(response.razorpay_signature);

                // verify payment

                const data = {
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                };
                const res = api
                  .post("/api/v1/verify_payment/", data, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                  .then((response) => {
                    // console.log(response.data);
                    // console.log(response.data.res);
                    this.validity = response.data.validity;

                    // console.log(this.amount);
                    // console.log(response.data.validity);
                    // console.log("h2i");
                    this.postWallet();
                  });

                // this.postWallet();
              },

              // prefill: {
              //   name: 'John Doe',
              //   email: 'johndoe@example.com'
              // }
              theme: {
                color: "#A40FFF",
              },
            };
            // console.log(response.data.payment_id);
            // console.log(this.amount);

            const paymentObject = new Razorpay(options);
            paymentObject.open();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Please enter amount");
      }

      this.dialog1 = false;
    },

    postWallet() {
      if (this.validity == true) {
        const slug = this.$store.state.user.username;
        const data = {
          total_amount: Number(this.$store.state.walletBalance) + Number(this.amount),
          user: this.$store.state.user.id,
          slug: this.$store.state.user.username,
        };
        api.patch(`/api/v1/customerwallet/${slug}/`, data).then((response) => {
          // console.log(response.data);
          this.$store.dispatch("getWallet");
        });
      }
    },

    getMenu() {
      api.get("/api/v1/menu/").then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (localStorage.getItem("restaurant") == response.data[i].restaurant) {
            this.menuList.push(response.data[i]);

            // separate the category and push to menu
            if (!this.menu.includes(response.data[i].category)) {
              this.menu.push(response.data[i].category);
            }
          }
        }
        // console.log(this.menuList);
        // console.log(this.menu);
      });

      // api.get("/api/v1/menucategory/")
      //   .then((response) => {
      //     this.menu = response.data;

      //   });
    },

    oK() {
      for (let i = 0; i < this.foodOrder.length; i++) {
        if (this.displayOrder.indexOf(this.foodOrder[i]) == -1) {
          this.displayOrder.push(this.foodOrder[i]);
        }
      }
      // console.log(this.displayOrder);

      // calculate total
      this.total = 0;
      for (let i = 0; i < this.displayOrder.length; i++) {
        this.total += this.displayOrder[i].final_price * this.displayOrder[i].value;
      }

      this.finalTotal = this.total + (this.total.toFixed(2) * 5) / 100;
      // console.log(this.finalTotal);

      if (this.checkbox == true) {
        this.total += this.packagingCharges;
      }

      // calculate prepare time
      this.premare_time = 0;
      for (let i = 0; i < this.displayOrder.length; i++) {
        this.premare_time +=
          this.displayOrder[i].prepare_time * this.displayOrder[i].value;
      }
    },

    checkBoxClick() {
      if (this.checkbox == true) {
        this.dineCheckbox = false;
      } else if (this.checkbox == false) {
        this.dineCheckbox = true;
      }
    },

    setDefaultTime() {
      // calculate prepare time
      this.premare_time = 0;
      for (let i = 0; i < this.displayOrder.length; i++) {
        this.premare_time +=
          this.displayOrder[i].prepare_time * this.displayOrder[i].value;
      }

      this.minClock = new Date(new Date().getTime() + this.premare_time * 60000)
        .toString()
        .slice(16, 21);
      // console.log(this.minClock);

      this.time = this.minClock;
    },

    refreshClock() {
      this.premare_time = 0;
      for (let i = 0; i < this.displayOrder.length; i++) {
        this.premare_time +=
          this.displayOrder[i].prepare_time * this.displayOrder[i].value;
      }

      this.minClock = new Date(new Date().getTime() + this.premare_time * 60000)
        .toString()
        .slice(16, 21);
      // console.log(this.minClock);
    },

    plusOne(item) {
      item.value++, this.foodOrder.push(item);
      // console.log(this.foodOrder);
    },

    minusOne(item) {
      item.value--;
      this.foodOrder.splice(this.foodOrder.indexOf(item), 1);
      this.displayOrder.splice(this.displayOrder.indexOf(item), 1);
      // console.log(this.foodOrder);
    },

    async checkout() {
      if (this.displayOrder != "" && this.time !== null) {
        let time = this.time;
        let hours = time.substring(0, 2);
        let minutes = time.substring(3, 5);
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? minutes : minutes;
        let strTime = hours + ":" + minutes + " " + ampm;

        // console.log( {
        //     restaurant: this.$store.state.restaurant,
        //     user: this.$store.state.user.username,
        //     takeaway: this.checkbox,
        //     prepare_time: this.premare_time,
        //     food_name: this.foodName,
        //     total: this.total,
        //     message: this.message,
        //     arrival_time: strTime,
        //   });new Date().toString().slice(0, 16),

        // let timeParts = strTime.split(":");
        // let newHours = timeParts[0];
        // let newMinutes = timeParts[1];

        // if (newHours.length === 1) {
        //   newHours = "0" + hours;
        // }

        // time = `${newHours}:${newMinutes}`;
        // console.log(time);
        // console.log(this.minClock);
        // console.log(this.time);

        // let times = this.minClock;
        // let hourss = times.substring(0, 2);
        // let minutess = times.substring(3, 5);
        // let ampms = hourss >= 12 ? "PM" : "AM";
        // hourss = hourss % 12;
        // hourss = hourss ? hourss : 12;
        // minutess = minutess < 10 ? minutess : minutess;
        // let strTimesss = hourss + ":" + minutess + " " + ampms;
        // console.log(strTimesss.slice(0, 5));

        if (this.time >= this.minClock) {
          for (let i = 0; i < this.displayOrder.length; i++) {
            this.foodName +=
              this.displayOrder[i].name +
              "@" +
              this.displayOrder[i].value +
              "$$" +
              this.displayOrder[i].final_price +
              "||";
          }

          await api.post("/api/v1/foodorders/", {
            restaurant: this.$store.state.restaurant,
            user: this.$store.state.user.username,
            takeaway: this.checkbox,
            order_date: new Date().toString().slice(0, 15),
            prepare_time: this.premare_time,
            food_name: this.foodName,
            total: Number(this.total).toFixed(2),
            message: this.message,
            arrival_time: strTime,
            slug: this.$store.state.user.username + "a-_a" + Date.now(), // to remove conflict
          });

          // .then((response) => {
          //   console.log(response);
          // })
          // .catch((error) => {
          //   console.log(error);
          // });

          this.phonePe();

          const slug = this.$store.state.user.username;
          const data = {
            total_amount: Number(this.$store.state.walletBalance) - Number(this.total),
            user: this.$store.state.user.id,
            slug: this.$store.state.user.username,
          };
          await api.patch(`/api/v1/customerwallet/${slug}/`, data).then((response) => {
            // console.log(response.data);
            this.$store.dispatch("getWallet");
          });
          this.dialog = false;
          this.$router.push("/order");
        } else {
          // console.log("please select time after " + this.minClock);
          this.errorMessages = "please select time after " + this.minClock;
          setTimeout(() => {
            this.errorMessages = "";
          }, 5000);
        }
      }
      // else if (this.$store.state.walletBalance < this.total) {
      //   this.errorMessages = "please add money to your wallet";
      //   setTimeout(() => {
      //     this.errorMessages = "";
      //   }, 5000);
      // }
      else if (this.time === null) {
        // console.log("please select time");
        this.errorMessages = "please select time";
        setTimeout(() => {
          this.errorMessages = "";
        }, 5000);
      }
    },

    likeShop(item) {
      const slug_customer =
        this.$store.state.user.username + localStorage.getItem("restaurant");

      if (this.likeColor === "red") {
        this.likeColor = "";
        this.likeBoolShop = false;

        api.patch(`/api/v1/editlikedshop/${slug_customer}/`, {
          liked: this.likeBoolShop,
        });

        // console.log("white");
      } else {
        this.likeColor = "red";
        this.likeBoolShop = true;

        api.patch(`/api/v1/editlikedshop/${slug_customer}/`, {
          customer: this.$store.state.user.username,
          user: this.$store.state.user.id,
          shop: item,
          liked: this.likeBoolShop,
          slug: slug_customer,
        });
        // console.log("red");
      }
      // console.log(item);
    },

    getLikedShop() {
      api.get("/api/v1/likedshop/").then((response) => {
        // filter on basis of customer
        this.likedShops = response.data.filter(
          (item) => item.customer === this.$store.state.user.username
        );
        // console.log(this.likedShops);
        for (let i = 0; i < this.likedShops.length; i++) {
          if (
            this.likedShops[i].shop === localStorage.getItem("restaurant") &&
            this.likedShops[i].liked === true
          ) {
            this.likeColor = "red";
          }
        }
      });
    },

    changeEnableMessage() {
      if (this.enableMessage === true) {
        this.enableMessage = false;
      }
    },

    shopStatus() {
      api.get(`/api/v1/shopstatus/`).then((res) => {
        this.status = res.data;
        // filter on basis of this.$store.state.restaurant
        this.status = this.status.filter(
          (item) => item.restaurant === localStorage.getItem("restaurant")
        );
        // console.log(this.status);
      });
    },

    getShopProfileImage() {
      api.get(`/api/v1/ClientProfile4Image/`).then((res) => {
        this.shopProfileImage = res.data.filter(
          (item) => item.slug === localStorage.getItem("restaurant")
        );
        // console.log(this.shopProfileImage);
      });
    },
    getPackagingCharges() {
      const slug = localStorage.getItem("restaurant");
      api.get(`/api/v1/takeaway/${slug}/`).then((response) => {
        this.packagingCharges = response.data[0].packaging_charge;
        // console.log(response.data);
      });
      // console.log(this.$store.state.restaurant);
    },

    filterCategory(category) {
      if (this.filterCategoryList.includes(category)) {
        this.filterCategoryList.splice(this.filterCategoryList.indexOf(category), 1);
      } else {
        this.filterCategoryList.push(category);
      }
      // console.log(this.filterCategoryList);
      // remove
    },
  },

  created: function () {
    this.getMenu();
    this.getLikedShop();
    this.shopStatus();
    this.getShopProfileImage();
    // console.log(new Date().toString().slice(16, 21));
  },

  mounted() {
    if (localStorage.getItem("restaurant") != "") {
      setTimeout(() => {
        this.getPackagingCharges();
      }, 1000);
    }

    // console.log(this.$route.path.slice(6, 20));
    if (
      localStorage.getItem("restaurant") == "" ||
      localStorage.getItem("restaurant") == null
    ) {
      localStorage.setItem("restaurant", this.$route.path.slice(6, 20));
      window.location.reload();
    }
  },
};
</script>

<style>
.cart-style {
  background-image: linear-gradient(135deg, #5900ff 0%, #0d0146 100%);
}
</style>
