<template>
  <BoardGame />
</template>

<script>
// @ is an alias to /src
import BoardGame from "@/components/BoardGame.vue";
const socket = io("http://localhost:3000");

export default {
  name: "Home",
  components: {
    BoardGame
  },
  methods: {}
};
</script>
