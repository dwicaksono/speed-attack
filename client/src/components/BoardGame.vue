<template>
  <div>
    <section class="row">
      <form @submit.prevent="enterName">
        <input
          type="text"
          name=""
          placeholder="Enter your name"
          v-model="username"
        />
        <button type="submit">join</button>
      </form>
      <div class="small-6 columns" v-if="log">
        <h1 class="text-center">{{ this.$store.state.player1 }}</h1>
        <div
          class="boxAktor"
          v-if="diem && !serang && !serangspecial && !tangkis && !giveUp"
        >
          <img :src="dataImage.diem" alt />
        </div>
        <div
          class="boxAktor"
          v-if="!diem && serang && !serangspecial && !tangkis && !giveUp"
        >
          <img :src="dataImage.attack" alt />
        </div>
        <div
          class="boxAktor"
          v-if="!diem && !serang && serangspecial && !tangkis && !giveUp"
        >
          <img :src="dataImage.special" alt />
        </div>
        <div
          class="boxAktor"
          v-if="!diem && !serang && !serangspecial && tangkis && !giveUp"
        >
          <img :src="dataImage.heal" alt />
        </div>
        <div
          class="boxAktor"
          v-if="!diem && !serang && !serangspecial && !tangkis && giveUp"
        >
          <img :src="dataImage.giveUp" alt />
        </div>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
            :style="{ width: $store.state.player1Health + '%' }"
          >
            {{ this.$store.state.player1Health }}
          </div>
        </div>
      </div>
      <div class="small-6 columns" v-if="log">
        <h1 class="text-center">{{ this.$store.state.player2 }}</h1>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
            :style="{ width: $store.state.player2Health + '%' }"
          >
            {{ this.$store.state.player2Health }}
          </div>
        </div>
      </div>
    </section>
    <section class="row controls" v-if="!$store.state.gameIsRunning">
      <div class="small-12 columns">
        <!-- <button id="start-game" @click="toActionStartGame">
          START NEW GAME
        </button> -->
      </div>
    </section>
    <section class="row controls" v-else>
      <div class="small-12 columns">
        <button id="attack" @click.prevent="actionToAttack">ATTACK</button>
        <button id="give-up" @click.prevent="dontGiveUp">GIVE UP</button>
      </div>
    </section>
    <section class="row log">
      <div class="small-12 columns">
        <ul>
          <li>TEXT</li>
          <li>{{ this.$store.state.player1 }}</li>
          <li>{{ this.$store.state.player2 }}</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import rasengan from "../assets/naruto-voice-rasengan.mp3";
import kage from "../assets/Kage.mp3";
import hit from "../assets/hit.mp3";
import io from "socket.io-client";

let count = 0;
const socket = io("http://localhost:3000");
import themeSounds from "../Sounds/Theme_song.mp3";
import startSound from "../Sounds/theme.mp3"

export default {
  name: "BoardGame",
  created() {
    socket.on("afterAttack", data => {
      if (localStorage.player == data.username) {
        this.$store.state.player2Health -= data.damage;
        if (this.$store.state.player2Health <= 0) {
          this.$store.state.player2Health = 0;
          this.$store.state.gameIsRunning = false;
        }
      } else {
        this.$store.state.player1Health -= data.damage;
        if (this.$store.state.player1Health <= 0) {
          this.$store.state.player1Health = 0;
          this.$store.state.gameIsRunning = false;
        }
      }
    });
    socket.on("addPlayer", username => {
      if (!this.$store.state.player1 && !this.$store.state.player2) {
        this.$store.state.player2 = username;
      } else if (
        this.$store.state.player1 &&
        !this.$store.state.player2 &&
        count > 0
      ) {
        this.$store.state.player2 = username;
      }
      count++;
    });
  },
  data() {
    return {
      log:false,
      diem: false,
      serang: false,
      serangspecial: false,
      tangkis: false,
      giveUp: false,
      username: null,
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
      this.$store.dispatch("attack", this.username);
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
    },
    enterName() {
      this.log = true
      this.toActionStartGame()
      localStorage.setItem("player", this.username);
      this.$store.commit("addPlayer", this.username);
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
