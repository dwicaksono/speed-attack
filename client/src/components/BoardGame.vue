<template>
  <div>
      <div class="small-6 columns">
        <h1 class="text-center">Player 1</h1>
        <div class="boxAktor" v-if="diem && !serang && !serangspecial && !tangkis && !giveUp">
          <img :src="dataImage.diem" alt />
        </div>
        <div class="boxAktor" v-if="!diem && serang && !serangspecial && !tangkis && !giveUp">
          <img :src="dataImage.attack" alt />
        </div>
        <div class="boxAktor" v-if="!diem && !serang && serangspecial && !tangkis && !giveUp">
          <img :src="dataImage.special" alt />
        </div>
        <div class="boxAktor" v-if="!diem && !serang && !serangspecial && tangkis && !giveUp">
          <img :src="dataImage.heal" alt />
        </div>
        <div class="boxAktor" v-if="!diem && !serang && !serangspecial && !tangkis && giveUp">
          <img :src="dataImage.giveUp" alt />
        </div>
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
import rasengan from "../assets/naruto-voice-rasengan.mp3";
import kage from "../assets/Kage.mp3";
import hit from "../assets/hit.mp3";
import themeSounds from "../Sounds/Theme_song.mp3";
import startSound from "../Sounds/theme.mp3"

export default {
  name: "BoardGame",
  data() {
    return {
      diem: false,
      serang: false,
      serangspecial: false,
      tangkis: false,
      giveUp: false,
      dataImage: {
        diem:
          "https://rs1231.pbsrc.com/albums/ee503/adrian66645/Combate%20Mortal%20Total%20Album/naruto_standing1.gif~c200",
        attack:
          "https://i.ya-webdesign.com/images/transparent-sprite-naruto-6.gif",
        special:
          "https://gifimage.net/wp-content/uploads/2017/10/naruto-bijuu-mode-rasenshuriken-gif-8.gif",
        heal:
          "https://thumbs.gfycat.com/SimilarGrandioseCornsnake-size_restricted.gif",
        giveUp:
          "https://thumbs.gfycat.com/IllustriousFoolishBlackpanther-size_restricted.gif"
      },
      rasenGan: new Audio(rasengan),
      kageKabur: new Audio(kage),
      theme: new Audio(themeSounds),
      start: new Audio(startSound),
      hit: new Audio(hit),
    };
  },
  created(){
    this.start.play()
  },
  methods: {
    toActionStartGame() {
      this.start.pause();
      this.theme.play();
      this.$store.commit("startGame");
      this.diem = true;
      this.serang = false;
      this.serangspecial = false;
      this.tangkis = false;
      this.giveUp = false;
    },
    actionToAttack() {
      this.$store.dispatch("attack");
      this.diem = false;
      this.serang = true;
      this.serangspecial = false;
      this.tangkis = false;
      this.giveUp = false;
      this.hit.play();
      this.kageKabur.pause();
      this.rasenGan.pause();
      console.log("nyerang");
    },
    actionToSpecial() {
      this.$store.dispatch("specialAttack");
      this.diem = false;
      this.serang = false;
      this.serangspecial = true;
      this.tangkis = false;
      this.giveUp = false;
      this.rasenGan.play();
      this.hit.pause();
      this.kageKabur.pause();
      console.log("nyerang sepecial");
    },
    actionToHeal() {
      this.$store.commit("heal");
      this.diem = false;
      this.serang = false;
      this.serangspecial = false;
      this.tangkis = true;
      this.giveUp = false;
      console.log("action heal");
    },
    dontGiveUp() {
      this.$store.commit("giveUp");
      this.diem = false;
      this.serang = false;
      this.serangspecial = false;
      this.tangkis = false;
      this.giveUp = true;

      this.kageKabur.play();
      this.rasenGan.pause();
      this.hit.pause();
      console.log("guveup");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.boxAktor {
  display: flex;
  height: 200px;
}
</style>
