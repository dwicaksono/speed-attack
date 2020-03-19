<template>
  <div class="home">
    <form action="">
      <ul id="messages"></ul>
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
const socket = io('http://localhost:3000')

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  methods: {
  }
}
</script>
