<template>
  <div>
    <section class="row">
      <form @submit.prevent="enterName" style="text-align: center; margin-top:100px;" v-if="!log">
        <input type="text" name placeholder="Enter your name" v-model="username" /><br>
        <button type="submit">join</button>
      </form>
      <div class="small-6 columns" v-if="log">
        <h1 class="text-center">{{ this.$store.state.player1 }}</h1>
        <div class="boxAktor" v-if="diem && !serang">
          <img :src="dataImage.diem" alt />
        </div>
        <div class="boxAktor" v-if="!diem && serang">
          <img :src="dataImage.attack" alt />
        </div>
        <div class="boxAktor" v-if="!diem && !serang">
          <img :src="dataImage.special" alt />
        </div>
        <div class="boxAktor" v-if="!diem && !serang">
          <img :src="dataImage.heal" alt />
        </div>
        <div class="boxAktor" v-if="!diem && !serang">
          <img :src="dataImage.giveUp" alt />
        </div>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
            :style="{ width: $store.state.player1Health + '%' }"
          >{{ this.$store.state.player1Health }}</div>
        </div>
      </div>
      <div class="small-6 columns" v-if="log">
        <h1 class="text-center">{{ this.$store.state.player2 }}</h1>
        <div class="boxAktor" v-if="diem2 && !serang2 && !serangspecial && !tangkis && !giveUp">
          <img :src="dataImage.diem" alt style="transform: scaleX(-1);" />
        </div>
        <div class="boxAktor" v-if="!diem2 && serang2 && !serangspecial && !tangkis && !giveUp">
          <img :src="dataImage.attack" alt style="transform: scaleX(-1);" />
        </div>
        <div class="boxAktor" v-if="!diem2 && !serang2 && serangspecial && !tangkis && !giveUp">
          <img :src="dataImage.special" alt style="transform: scaleX(-1);" />
        </div>
        <div class="boxAktor" v-if="!diem2 && !serang2 && !serangspecial && tangkis && !giveUp">
          <img :src="dataImage.heal" alt style="transform: scaleX(-1);" />
        </div>
        <div class="boxAktor" v-if="!diem2 && !serang2 && !serangspecial && !tangkis && giveUp">
          <img :src="dataImage.giveUp" alt style="transform: scaleX(-1);" />
        </div>
        <div class="healthbar">
          <div
            class="healthbar text-center"
            style="background-color: green; margin: 0; color: white;"
            :style="{ width: $store.state.player2Health + '%' }"
          >{{ this.$store.state.player2Health }}</div>
        </div>
      </div>
    </section>
    <section class="row controls" v-if="!$store.state.gameIsRunning">
      <div class="small-12 columns">
        <!-- <button id="start-game" @click="toActionStartGame">
          START NEW GAME
        </button>-->
      </div>
    </section>
    <section class="row controls" v-else>
      <div class="small-12 columns">
        <button id="attack" @click.prevent="actionToAttack" v-if="this.$store.state.player1 && this.$store.state.player2">ATTACK</button>
      </div>
    </section>
    <section class="row log">
      <div class="small-12 columns">
        <ul>
          <li>Players</li>
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
import startSound from "../Sounds/theme.mp3";
import Swal from "sweetalert2";

export default {
  name: "BoardGame",
  created() {
    socket.on("afterAttack", data => {
      if (localStorage.player == data.username) {
        this.$store.state.player2Health -= data.damage;
        if (this.$store.state.player2Health <= 0) {
          this.$store.state.player2Health = 0;
          this.$store.state.gameIsRunning = false;
          this.$store.state.player1 = "";
          this.$store.state.player2 = "";
          localStorage.removeItem("player");
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });

          swalWithBootstrapButtons
            .fire({
              title: `${data.username} Won!`,
              confirmButtonText: "Rematch?",
              allowOutsideClick: false
            })
            .then(result => {
              this.log = false;
              this.theme.pause();
              count = 0;
            });
        }
        this.diem = false;
        this.serang = true;
        setTimeout(() => {
          this.diem = true;
          this.serang = false;
        }, 1000)
        this.hit.play();
        this.kageKabur.pause();
        this.rasenGan.pause();
      } else {
        this.$store.state.player1Health -= data.damage;
        if (this.$store.state.player1Health <= 0) {
          this.$store.state.player1Health = 0;
          this.$store.state.gameIsRunning = false;
          this.$store.state.player1 = "";
          this.$store.state.player2 = "";
          localStorage.removeItem("player");
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });

          swalWithBootstrapButtons
            .fire({
              title: `${data.username} Won!`,
              confirmButtonText: "Rematch?",
              allowOutsideClick: false
            })
            .then(result => {
              this.log = false;
              this.theme.pause();
              count = 0;
            });
        }
        this.diem2 = false;
        this.serang2 = true;
        setTimeout(() => {
          this.diem2 = true;
          this.serang2 = false;
        }, 1000)
        this.hit.play();
        this.kageKabur.pause();
        this.rasenGan.pause();
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
      log: false,
      diem: false,
      serang: false,
      diem2: false,
      serang2: false,
      username: null,
      dataImage: {
        diem:
          "https://rs1231.pbsrc.com/albums/ee503/adrian66645/Combate%20Mortal%20Total%20Album/naruto_standing1.gif~c200",
        attack:
          "https://i.ya-webdesign.com/images/transparent-sprite-naruto-6.gif",
      },
      rasenGan: new Audio(rasengan),
      kageKabur: new Audio(kage),
      theme: new Audio(themeSounds),
      start: new Audio(startSound),
      hit: new Audio(hit)
    };
  },
  methods: {
    toActionStartGame() {
      this.start.pause();
      this.theme.play();
      this.$store.commit("startGame");
      this.diem = true;
      this.diem2 = true;
      this.serang = false;
      this.serang2 = false;
      this.serangspecial = false;
      this.tangkis = false;
      this.giveUp = false;
    },
    actionToAttack() {
      this.$store.dispatch("attack", this.username);
    },
    enterName() {
      this.log = true;
      this.toActionStartGame();
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
