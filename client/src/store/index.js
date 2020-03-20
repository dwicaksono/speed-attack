import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client'
const socket = io('https://mysterious-thicket-65956.herokuapp.com/');
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player1 : null,
    player2 : null,
    player1Health: null,
    player2Health: null,
    gameIsRunning: false,
    turns: [],
    players: []
  },
  mutations: {
    addPlayer(state, username) {
      state.player1 = username
      socket.emit('addPlayer', username)
    },
    startGame(state) {
      state.gameIsRunning = true
      state.player1Health = 100
      state.player2Health = 100
      state.turns = []
    },
    attackPoint(state, payload) {
      socket.emit('playerAttack', payload)
      // state.player2Health -= payload
    },
    attackPointText(state) {
      state.turns.unshift({
        isPlayer: false,
        text: `Player hit`
      })
    }
  },
  actions: {
    attack(context, username) {
      let damage = Math.max(Math.floor(Math.random() * 10) + 1, 3)
      context.commit('attackPoint', {damage, username})
      context.commit('attackPointText')
      // this.monsterAttack()
    },
  },
  modules: {
  }
});
