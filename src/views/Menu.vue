<template>
  <v-main>
    <template>
      <v-row>
        <v-col cols="12" sm="12" md="6" offset-md="3">
          <v-card class="mx-auto">
            <v-toolbar
              extended
              v-for="(image, index) in shopProfileImage"
              :key="index + 0.0019"
            >
              <v-list-item-avatar tile size="99" color="grey" class="mt-14">
                <v-img :src="image.shop_image" height="99px"> </v-img>
              </v-list-item-avatar>
              <v-list-item three-line class="mt-6">
                <v-list-item-content>
                  <v-list-item-title class="text-h6 mt-3"
                    >{{ image.owner_name }}
                    <v-icon
                      :color="likeColor"
                      small
                      @click="likeShop($store.state.restaurant)"
                      v-if="$store.state.restaurant && $store.state.isAuthenticated"
                      >mdi-heart</v-icon
                    >
                  </v-list-item-title>
                  <v-card max-width="20" class="mt-1">
                    <a :href="image.google_map_address">
                      <v-btn x-small color="primary" dark outlined
                        ><v-icon color="red" small>mdi-map-marker</v-icon>Map</v-btn
                      >
                    </a>
                  </v-card>

                  <v-list-item-subtitle class="mt-2" v-if="$store.state.isAuthenticated"
                    ><v-icon>mdi-phone</v-icon>: {{ image.phone }}
                  </v-list-item-subtitle>
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
                    :close-on-content-click="false"
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

            <v-card-text style="height: 660px; position: relative">
              <v-text-field
                v-model="searchMenu"
                prepend-inner-icon="mdi-magnify"
                label="Search Menu"
                single-line
                dense
                maxlength="30"
                placeholder="Search Menu"
                @input="menuSearch()"
              ></v-text-field>
              <v-sheet
                id="scroll-threshold-example"
                class="overflow-y-auto pb-16"
                max-height="590"
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
                              <v-subheader> {{ item.prepare_time }} min</v-subheader>
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
                                  >{{ item.description.slice(0, 22) }}
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
                max-height="590"
                v-if="filterCategoryList == '' && searchMenu != ''"
              >
                <v-responsive height="auto">
                  <div
                    v-for="(cat, index) in searchFilterResultCategory"
                    :key="index + 0.0001"
                  >
                    <v-chip outlined color="red darken-2 mt-2"
                      ><strong>{{ cat }}</strong></v-chip
                    >

                    <div v-for="(item, index) in searchFilterResult" :key="index + 0.001">
                      <div v-if="cat == item.category">
                        <v-container v-if="item.restaurant == restaurant_name">
                          <v-row>
                            <v-col cols="4" sm="5" md="5">
                              <span> {{ item.name }}</span>
                              <v-subheader> {{ item.prepare_time }} min</v-subheader>
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
                                  >{{ item.description.slice(0, 22) }}
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
                max-height="590"
                v-if="filterCategoryList == '' && searchMenu == ''"
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
                              <v-subheader> {{ item.prepare_time }} min</v-subheader>
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
                                  >{{ item.description.slice(0, 22) }}
                                  ...
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

              <v-fab-transition>
                <div v-for="(stat, index) in status" :key="index + 0.007">
                  <div v-if="restaurant_name == stat.restaurant" class="text-center">
                    <v-row v-if="stat.open_close && stat.shop_coming_soon == false">
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
                                  <!-- <v-chip outlined color="pink">
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
                                      GST/Convenience-fee (5%):&nbsp;
                                      <span
                                        ><v-icon>mdi-currency-inr</v-icon
                                        >{{
                                          ((total.toFixed(2) * 5) / 100).toFixed(2)
                                        }}</span
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
                                          >{{ finalTotal.toFixed(2) }}</span
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
                                  </v-chip> -->

                                  <div>
                                    <v-container v-if="displayOrder != ''">
                                      <v-row class="grey--text text-left" dense>
                                        <v-col>
                                          <div>Prepare Time</div>
                                        </v-col>
                                        <v-divider vertical color="black"></v-divider>
                                        <v-col cols="5" sm="5">
                                          <div>
                                            <v-icon>mdi-alarm</v-icon
                                            >{{ finalPrepareTime.toFixed(0) }}
                                            mins
                                          </div>
                                        </v-col>
                                      </v-row>
                                      <v-row class="blue--text text-left" dense>
                                        <v-col>
                                          <div>Sub Total</div>
                                        </v-col>
                                        <v-divider vertical color="black"></v-divider>
                                        <v-col cols="5" sm="5">
                                          <div>
                                            <v-icon>mdi-currency-inr</v-icon
                                            >{{ total.toFixed(2) }}
                                          </div>
                                        </v-col>
                                      </v-row>
                                      <v-row class="blue--text text-left" dense>
                                        <v-col>
                                          <div>Extra Discount</div>
                                        </v-col>
                                        <v-divider vertical color="black"></v-divider>
                                        <v-col cols="5" sm="5">
                                          <div>
                                            <v-icon>mdi-currency-inr</v-icon
                                            >{{
                                              ((total.toFixed(2) * 5) / 100).toFixed(2)
                                            }}
                                            (–)
                                          </div>
                                        </v-col>
                                      </v-row>
                                      <v-row class="blue--text text-left" dense>
                                        <v-col>
                                          <div>GST(5%) +dipEAT</div>
                                        </v-col>
                                        <v-divider vertical color="black"></v-divider>
                                        <v-col cols="5" sm="5">
                                          <div>
                                            <v-icon>mdi-currency-inr</v-icon
                                            >{{
                                              ((total.toFixed(2) * 5) / 100).toFixed(2)
                                            }}
                                          </div>
                                        </v-col>
                                      </v-row>

                                      <v-row
                                        class="green--text text-left"
                                        v-if="packagingCharges != 0 && checkbox"
                                        dense
                                      >
                                        <v-col>
                                          <div>Packaging</div>
                                        </v-col>
                                        <v-divider vertical color="black"></v-divider>
                                        <v-col cols="5" sm="5">
                                          <div>
                                            <v-icon>mdi-currency-inr</v-icon
                                            >{{ packagingCharges }}
                                          </div>
                                        </v-col>
                                      </v-row>
                                      <v-row class="purple--text text-left" dense>
                                        <v-col>
                                          <div>Total</div>
                                        </v-col>
                                        <v-divider vertical color="black"></v-divider>
                                        <v-col cols="5" sm="5">
                                          <div>
                                            <v-icon>mdi-currency-inr</v-icon
                                            >{{
                                              (
                                                finalTotal.toFixed(2) -
                                                ((total.toFixed(2) * 5) / 100).toFixed(2)
                                              ).toFixed(2)
                                            }}
                                          </div>
                                        </v-col>
                                      </v-row>
                                    </v-container>
                                  </div>

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
                                            label="Select time"
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
                                    <v-col
                                      cols="3"
                                      sm="3"
                                      v-if="
                                        acceptDineIn == true && acceptTakeAway == false
                                      "
                                    >
                                      <v-checkbox
                                        v-model="dineCheckbox"
                                        label="Dine In"
                                        color="primary"
                                        disabled
                                        @click="checkBoxClick"
                                      >
                                      </v-checkbox>
                                    </v-col>
                                    <v-col
                                      cols="3"
                                      sm="3"
                                      v-if="
                                        acceptDineIn == true && acceptTakeAway == true
                                      "
                                    >
                                      <v-checkbox
                                        v-model="dineCheckbox"
                                        label="Dine In"
                                        color="primary"
                                        @click="checkBoxClick"
                                      >
                                      </v-checkbox>
                                    </v-col>
                                    <v-col
                                      cols="3"
                                      sm="3"
                                      v-if="
                                        acceptDineIn == false && acceptTakeAway == true
                                      "
                                    >
                                      <v-checkbox
                                        v-model="checkbox"
                                        label="Take Away"
                                        color="primary"
                                        disabled
                                        @click="
                                          checkBoxClick();
                                          oK();
                                          refreshClock();
                                          setDefaultTime();
                                        "
                                      >
                                      </v-checkbox>
                                    </v-col>
                                    <v-col
                                      cols="3"
                                      sm="3"
                                      v-if="
                                        acceptDineIn == true && acceptTakeAway == true
                                      "
                                    >
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
                                <div class="caption">
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
                                <v-container v-if="displayOrder == ''" class="red--text">
                                  <h4>Please select items for order!</h4>
                                </v-container>

                                <div
                                  class="red--text"
                                  v-if="
                                    !$store.state.isAuthenticated && displayOrder != ''
                                  "
                                >
                                  <h4>Login / SignUp to place order !!</h4>
                                </div>

                                <!-- <v-container
                      v-if="displayOrder != '' && $store.state.walletBalance < total"
                    >
                      <h4>You do not have enough money in wallet, please recharge!</h4>
                    </v-container> -->
                              </div>
                            </v-card-text>
                            <v-row
                              class="text-center mb-2"
                              v-if="
                                !doneButton &&
                                displayOrder != '' &&
                                $store.state.isAuthenticated
                              "
                            >
                              <v-col><v-btn @click="dialog = false">Cancel</v-btn></v-col>
                              <v-col>
                                <v-btn
                                  color="primary"
                                  @click="tempBucketOrders()"
                                  v-if="
                                    !doneButton &&
                                    displayOrder != '' &&
                                    $store.state.isAuthenticated
                                  "
                                  >Done</v-btn
                                >
                              </v-col>
                            </v-row>

                            <v-divider></v-divider>
                            <v-card-actions
                              class="cart-style"
                              v-if="$store.state.isAuthenticated && doneButton"
                            >
                              <v-btn color="white" text @click="dialog = false">
                                Cancel
                              </v-btn>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="white"
                                text
                                dark
                                @click="phonePe()"
                                v-if="foodOrder != ''"
                              >
                                Checkout
                              </v-btn>
                            </v-card-actions>
                            <v-card-actions
                              class="cart-style"
                              v-if="!$store.state.isAuthenticated"
                            >
                              <v-btn color="white" text @click="dialog = false">
                                Cancel
                              </v-btn>
                              <v-spacer></v-spacer>
                              <a
                                v-if="!$store.state.isAuthenticated && displayOrder != ''"
                                ><logIn /></a
                              >&nbsp;
                              <a
                                v-if="!$store.state.isAuthenticated && displayOrder != ''"
                                ><signUp
                              /></a>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-col>
                    </v-row>
                    <v-container class="text-center white--text" v-else>
                      <v-chip color="white" class="red--text">
                        <!-- <strong>Shop closed</strong> -->
                        <div v-if="!stat.shop_coming_soon">
                          <div v-if="!stat.open_close">
                            <strong class="red--text">Closed</strong>
                          </div>
                        </div>
                        <div v-if="stat.shop_coming_soon">
                          <strong class="red--text caption"
                            ><strong>Comming Soon</strong></strong
                          >
                        </div>
                      </v-chip>
                    </v-container>
                  </div>
                  <!-- <div class="text-center red--text" v-if="!$store.state.isAuthenticated">
                    <v-chip color="white" class="red--text">
                      <strong>Please Log-In / SignUp</strong>
                    </v-chip>
                  </div> -->
                </div>
              </v-fab-transition>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-main>
</template>

<script>
// import axios from "axios";
import api from "@/main";
import { set } from "vue";
import signUp from "../components/signUp.vue";
import logIn from "../components/logIn.vue";

export default {
  name: "Menu",

  components: {
    signUp,
    logIn,
  },

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
      searchMenu: "",
      searchFilterResult: [],
      searchFilterResultCategory: [],

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
      qrVisitCount: 0,
      finalPrepareTime: 0,

      packagingCharges: 0,
      acceptDineIn: true,
      acceptTakeAway: true,
      doneButton: false,
      foodNameTemp: [],

      restaurant_name: localStorage.getItem("restaurant"),
      chargesGST: 0,
      finalTotal: 0,
      totalAfterDiscount: 0,

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
    tempBucketOrders() {
      this.foodName = [];

      for (let i = 0; i < this.displayOrder.length; i++) {
        this.foodName +=
          this.displayOrder[i].name +
          "@" +
          this.displayOrder[i].value +
          "$$" +
          this.displayOrder[i].final_price +
          "||";
      }

      this.foodNameTemp = this.foodName;

      let time = this.time;
      let hours = time.substring(0, 2);
      let minutes = time.substring(3, 5);
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? minutes : minutes;
      let strTime = hours + ":" + minutes + " " + ampm;

      this.$store.state.transactionId = Date.now();

      if (this.checkbox == true) {
        api
          .post("/api/v1/temp-orders/", {
            transactionId: this.$store.state.transactionId,

            restaurantTemp: localStorage.getItem("restaurant"),
            userTemp: this.$store.state.user.username,
            takeawayTemp: this.checkbox,
            order_dateTemp: new Date().toString().slice(0, 15),
            prepare_timeTemp: this.finalPrepareTime.toFixed(0),
            food_nameTemp: this.foodNameTemp,
            totalTemp: (Number(this.total) + Number(this.packagingCharges)).toFixed(2),
            messageTemp: this.message,
            arrival_timeTemp: strTime,
            order_numberTemp: Date.now(),
            order_from_qrTemp: Boolean(localStorage.getItem("qr")),
            slugTemp: this.$store.state.user.username + "a-_a" + Date.now(),

            customerName: this.$store.state.user.username,
            amount: Number(this.totalAfterDiscount) * 100,
          })
          .then((res) => {
            // console.log(res.data);
            this.doneButton = true;
            this.foodNameTemp = [];
            // this.total = 0;
            // this.message = "";
            // this.checkbox = false;
            // this.displayOrder = [];
            // this.time = null;
            // this.finalPrepareTime = 0;
            // this.finalTotal = 0;
            // this.totalAfterDiscount = 0;
          });
      } else {
        api
          .post("/api/v1/temp-orders/", {
            transactionId: this.$store.state.transactionId,

            restaurantTemp: localStorage.getItem("restaurant"),
            userTemp: this.$store.state.user.username,
            takeawayTemp: this.checkbox,
            order_dateTemp: new Date().toString().slice(0, 15),
            prepare_timeTemp: this.finalPrepareTime.toFixed(0),
            food_nameTemp: this.foodNameTemp,
            totalTemp: Number(this.total).toFixed(2),
            messageTemp: this.message,
            arrival_timeTemp: strTime,
            order_numberTemp: Date.now(),
            order_from_qrTemp: Boolean(localStorage.getItem("qr")),
            slugTemp: this.$store.state.user.username + "a-_a" + Date.now(),

            customerName: this.$store.state.user.username,
            amount: Number(this.totalAfterDiscount) * 100,
          })
          .then((res) => {
            console.log(res.data);
            this.doneButton = true;
            this.foodNameTemp = [];
            // this.total = 0;
            // this.message = "";
            // this.checkbox = false;
            // this.displayOrder = [];
            // this.time = null;
            // this.finalPrepareTime = 0;
            // this.finalTotal = 0;
            // this.totalAfterDiscount = 0;
          });
      }
    },

    phonePe() {
      // console.log(Number(this.total).toFixed(2));
      if (this.displayOrder != "" && this.time !== null) {
        if (this.time >= this.minClock) {
          // for (let i = 0; i < this.displayOrder.length; i++) {
          //   this.foodName +=
          //     this.displayOrder[i].name +
          //     "@" +
          //     this.displayOrder[i].value +
          //     "$$" +
          //     this.displayOrder[i].final_price +
          //     "||";
          // }

          // let time = this.time;
          // let hours = time.substring(0, 2);
          // let minutes = time.substring(3, 5);
          // let ampm = hours >= 12 ? "PM" : "AM";
          // hours = hours % 12;
          // hours = hours ? hours : 12;
          // minutes = minutes < 10 ? minutes : minutes;
          // let strTime = hours + ":" + minutes + " " + ampm;

          setTimeout(() => {
            api
              .post("/api/v1/phonepe_payment/", {
                transactionId: this.$store.state.transactionId,

                // restaurantTemp: localStorage.getItem("restaurant"),
                // userTemp: this.$store.state.user.username,
                // takeawayTemp: this.checkbox,
                // order_dateTemp: new Date().toString().slice(0, 15),
                // prepare_timeTemp: this.finalPrepareTime,
                // food_nameTemp: this.foodName,
                // totalTemp: Number(this.total).toFixed(2),
                // messageTemp: this.message,
                // arrival_timeTemp: strTime,
                // order_numberTemp: Date.now(),
                // order_from_qrTemp: Boolean(localStorage.getItem("qr")),
                // slugTemp: this.$store.state.user.username + "a-_a" + Date.now(),

                customerName: this.$store.state.user.username,
                amount: Number(this.totalAfterDiscount) * 100,
              })
              .then((response) => {
                // console.log(response.data);
                // console.log(response.data.response.success);

                localStorage.removeItem("qr");
                this.foodName = [];
                this.total = 0;
                this.message = "";
                this.checkbox = false;
                this.displayOrder = [];
                this.time = null;
                this.finalPrepareTime = 0;
                this.finalTotal = 0;
                this.totalAfterDiscount = 0;

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
            this.dialog = false;
          }, 1000);
        } else {
          // console.log("please select time after " + this.minClock);
          this.errorMessages = "please select time after " + this.minClock;
          setTimeout(() => {
            this.errorMessages = "";
          }, 5000);
        }
      } else if (this.time === null) {
        // console.log("please select time");
        this.errorMessages = "please select time";
        setTimeout(() => {
          this.errorMessages = "";
        }, 5000);
      }
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
      this.doneButton = false;

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
        this.finalTotal += this.packagingCharges;
      }

      this.totalAfterDiscount = this.finalTotal - (this.total.toFixed(2) * 5) / 100;

      // calculate prepare time
      this.premare_time = 0;

      if (this.displayOrder.length <= 2) {
        for (let i = 0; i < this.displayOrder.length; i++) {
          this.premare_time += this.displayOrder[i].prepare_time;

          // * this.displayOrder[i].value
          // console.log(this.displayOrder[i]);
          // console.log(this.displayOrder[i].value);
        }
        this.finalPrepareTime = this.premare_time + 6;
      }

      if (this.displayOrder.length > 2) {
        for (let i = 0; i < this.displayOrder.length; i++) {
          this.premare_time += this.displayOrder[i].prepare_time;
          // console.log(this.displayOrder[i]);
          // console.log(this.displayOrder[i].value);
        }
        this.finalPrepareTime = this.premare_time / this.displayOrder.length + 9;
      }

      // calculate average prepare time per item per quantity
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

      if (this.displayOrder.length <= 2) {
        for (let i = 0; i < this.displayOrder.length; i++) {
          this.premare_time += this.displayOrder[i].prepare_time;
        }
        //  * this.displayOrder[i].value
        this.finalPrepareTime = this.premare_time + 6;
      }

      if (this.displayOrder.length > 2) {
        for (let i = 0; i < this.displayOrder.length; i++) {
          this.premare_time += this.displayOrder[i].prepare_time;
        }
        this.finalPrepareTime = this.premare_time / this.displayOrder.length + 9;
      }

      this.minClock = new Date(new Date().getTime() + this.finalPrepareTime * 60000)
        .toString()
        .slice(16, 21);
      // console.log(this.minClock);

      this.time = this.minClock;
    },

    refreshClock() {
      this.premare_time = 0;
      if (this.displayOrder.length <= 2) {
        for (let i = 0; i < this.displayOrder.length; i++) {
          this.premare_time += this.displayOrder[i].prepare_time;
        }
        //  * this.displayOrder[i].value
        this.finalPrepareTime = this.premare_time + 6;
      }

      if (this.displayOrder.length > 2) {
        for (let i = 0; i < this.displayOrder.length; i++) {
          this.premare_time += this.displayOrder[i].prepare_time;
        }
        this.finalPrepareTime = this.premare_time / this.displayOrder.length + 9;
      }

      this.minClock = new Date(new Date().getTime() + this.finalPrepareTime * 60000)
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
        this.acceptDineIn = response.data[0].only_dineinShop;
        this.acceptTakeAway = response.data[0].only_takeawayShop;
        // console.log(response.data);
        // console.log(this.acceptDineIn);
        // console.log(this.acceptTakeAway);

        if (this.acceptDineIn == true && this.acceptTakeAway == false) {
          this.checkbox = this.acceptTakeAway;
          this.dineCheckbox = this.acceptDineIn;
        }

        if (this.acceptDineIn == false && this.acceptTakeAway == true) {
          this.checkbox = this.acceptTakeAway;
          this.dineCheckbox = this.acceptDineIn;
        }
      });
      // console.log(this.$store.state.restaurant);
    },

    filterCategory(category) {
      this.searchMenu = "";
      if (this.filterCategoryList.includes(category)) {
        this.filterCategoryList.splice(this.filterCategoryList.indexOf(category), 1);
      } else {
        this.filterCategoryList.push(category);
      }
      // console.log(this.filterCategoryList);
      // remove
    },

    menuSearch() {
      // console.log(this.searchMenu);
      if (this.searchMenu != "" && this.searchMenu != null) {
        this.filterCategoryList = [];
        // filter on basis of searchMenu from menuList and push to searchFilterResult
        this.searchFilterResult = this.menuList.filter((item) =>
          item.name.toLowerCase().includes(this.searchMenu.toLowerCase())
        );
        // console.log(this.searchFilterResult);

        // filter category name from searchFilterResult and push to searchFilterResultCategory
        this.searchFilterResultCategory = this.searchFilterResult.map(
          (item) => item.category
        );

        // remove duplicate
        this.searchFilterResultCategory = [...new Set(this.searchFilterResultCategory)];
        // console.log(this.searchFilterResultCategory);
      }
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
    // localStorage.removeItem("restaurant");

    if (localStorage.getItem("restaurant") != "") {
      setTimeout(() => {
        this.getPackagingCharges();
      }, 1000);
    }

    // QR scanning system and displaying restaurant below

    // console.log(this.$route.path.slice(6, 8));

    if (this.$route.path.slice(6, 8) == "qr") {
      localStorage.setItem("qr", true);

      // collecting qr data
      api.get("/api/v1/customeranalytics/").then((response) => {
        this.qrVisitCount = response.data[0].qr_scan_count;
        // console.log(this.qrVisitCount);
        api.patch("/api/v1/customeranalytics/", {
          qr_scan_count: Number(this.qrVisitCount) + 1,
        });
      });

      if (
        localStorage.getItem("restaurant") == "" ||
        localStorage.getItem("restaurant") == null
      ) {
        localStorage.setItem("restaurant", this.$route.path.slice(9, 20));
        window.location.reload();
      }

      if (localStorage.getItem("restaurant") != "") {
        if (this.$route.path.slice(9, 20) != localStorage.getItem("restaurant")) {
          localStorage.setItem("restaurant", this.$route.path.slice(9, 20));
          window.location.reload();
        }
      }
    } else {
      // localStorage.removeItem("qr", false);
      if (
        localStorage.getItem("restaurant") == "" ||
        localStorage.getItem("restaurant") == null
      ) {
        localStorage.setItem("restaurant", this.$route.path.slice(6, 20));
        window.location.reload();
      }

      if (localStorage.getItem("restaurant") != "") {
        if (this.$route.path.slice(6, 20) != localStorage.getItem("restaurant")) {
          localStorage.setItem("restaurant", this.$route.path.slice(6, 20));
          window.location.reload();
        }
      }
    }
  },
};
</script>

<style>
.cart-style {
  background-image: linear-gradient(135deg, #5900ff 0%, #0d0146 100%);
}
</style>
