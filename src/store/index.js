import Vue from 'vue'
import Vuex from 'vuex'

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
      
    
  },
  actions: {
    
  },
  modules: {
  }
})
