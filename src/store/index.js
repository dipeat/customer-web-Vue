import Vue from 'vue'
import Vuex from 'vuex'
// import axios from "axios";
import api from "@/main";


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id: '',
      username: '',
    },
    isAuthenticated: false,
    token: '',
    restaurant:'',
    searchText:'',
    walletBalance:'',
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true
        state.user.username = localStorage.getItem('username')
        state.user.id = localStorage.getItem('userid')

      } else {
        state.user.id = ''
        state.user.username = ''
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.user.id = ''
      state.user.username = ''
      state.token = ''
      state.isAuthenticated = false
    },
    setUser(state, user) {
      state.user = user
    },

    setWallet(state, setWallet) {
      state.walletBalance = setWallet.toFixed(2);
    },
      
    
  },
  actions: {

    async getWallet({ commit,state }) {
      const slug = state.user.username;
      const response = await api.get(`/api/v1/customerwallet/${slug}/`);
      commit("setWallet", response.data[0].total_amount);
      
      // .then((response) => {
      //   // console.log(response.data);
      //   this.$store.state.walletBalance = response.data[0].total_amount;
      // });
    },

    
  },
  modules: {
  }
})
