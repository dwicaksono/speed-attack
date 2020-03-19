<template>
  <div>
    <section class="row">
      <div class="small-6 columns">
        <h1 class="text-center">Player 1</h1>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
            :style="{width:$store.state.player1Health + '%'}"
          >{{ this.$store.state.player1Health }}</div>
        </div>
      </div>
      <div class="small-6 columns">
        <h1 class="text-center">Player 2</h1>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
            :style="{width:$store.state.player2Health + '%'}"
          >{{this.$store.state.player2Health}}</div>
        </div>
      </div>
    </section>
    <section class="row controls" v-if="!$store.state.gameIsRunning">
      <div class="small-12 columns">
        <button id="start-game" @click="toActionStartGame">START NEW GAME</button>
      </div>
    </section>
    <section class="row controls" v-else>
      <div class="small-12 columns">
        <button id="attack" @click="actionToAttack">ATTACK</button>
        <button id="special-attack" @click="actionToSpecial">SPECIAL ATTACK</button>
        <button id="heal" @click="actionToHeal">HEAL</button>
        <button id="give-up" @click="dontGiveUp">GIVE UP</button>
      </div>
    </section>
    <section class="row log">
      <div class="small-12 columns">
        <ul>
          <li>TEXT</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
// import { mapState },

export default {
  name: "BoardGame",
  methods: {
    toActionStartGame() {
      this.$store.commit("startGame");
    },
    actionToAttack() {
      this.$store.dispatch("attack");
    },
    actionToSpecial() {
      this.$store.dispatch("specialAttack");
    },
    actionToHeal() {
      this.$store.commit("heal");
    },
    dontGiveUp() {
      this.$store.commit("giveUp");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
