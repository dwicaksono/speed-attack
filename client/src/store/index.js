import Vue from 'vue'
import Vuex from 'vuex'
const socket = io("http://localhost:3000");
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player1 : false,
    player2 : false,
    player1Health: 100,
    player2Health: 100,
    gameIsRunning: false,
    turns: [],
    players: []
  },
  mutations: {
    startGame(state) {
      state.gameIsRunning = true
      state.player1Health = 100
      state.player2Health = 100
      state.turns = []
    },
    player1online(state) {
      state.player1 = true
    },
    player2online(state) {
      state.player1 = true
      state.player2 = true
    },
    giveUp(state) {
      state.gameIsRunning = false
      state.player1Health = 100
      state.player2Health = 100
    },
    heal(state) {
      state.turns.unshift({
        isPlayer: true,
        text: `Player heal 10`
      })
      if (state.playerHealth <= 90) {
        state.playerHealth += 10
      } else {
        state.playerHealth = 100
      }
      // state.monsterAttack()
    },
    attackPoint(state, payload) {
      socket.emit('playerAttack', payload)
      // state.player2Health -= payload
    },
    specialAttackPoint(state, payload) {
      state.player2Health -= payload
      if (state.player2Health <= 0) {
        state.player2Health = 0
        state.gameIsRunning = false
      }
    },
    attackPointText(state) {
      state.turns.unshift({
        isPlayer: false,
        text: `Player hit`
      })
      // if (this.checkWin()) {
      //   return
      // }
    }
  },
  actions: {
    attack(context) {
      let damage = Math.max(Math.floor(Math.random() * 10) + 1, 3)
      context.commit('attackPoint', damage)
      context.commit('attackPointText')
      // this.monsterAttack()
    },
    specialAttack(context) {
      let damage = Math.max(Math.floor(Math.random() * 20) + 1, 5)
      context.commit('specialAttackPoint', damage)
      context.commit('attackPointText')
    },
  },
  modules: {
  }
})
