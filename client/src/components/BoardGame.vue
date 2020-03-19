<template>
  <div>
    <section class="row">
      <div class="small-6 columns">
        <h1 class="text-center">YOU</h1>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
          >playerHealth</div>
        </div>
      </div>
      <div class="small-6 columns">
        <h1 class="text-center">MONSTER</h1>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
          >mosnter health</div>
        </div>
      </div>
    </section>
    <section class="row controls" v-if="!gameIsRunning">
      <div class="small-12 columns">
        <button id="start-game">START NEW GAME</button>
      </div>
    </section>
    <section class="row controls" v-else>
      <div class="small-12 columns">
        <button id="attack">ATTACK</button>
        <button id="special-attack">SPECIAL ATTACK</button>
        <button id="heal">HEAL</button>
        <button id="give-up">GIVE UP</button>
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
export default {
  name: "BoardGame"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
