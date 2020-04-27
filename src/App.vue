<template>
  <div id="app" class="container">
    <img src="./assets/logo.png" class="logo">
    <todo-list></todo-list>
  </div>
</template>

<script>

import HelloWorld from './components/HelloWorld'
import TodoList from './components/TodoList'

export default {
  name: 'App',
  components: {
    HelloWorld,
    TodoList,
  }
}
</script>

<style>

* body {
  /* background-color: rgba(4, 156, 37, 0.527);  */
  background: #343a40;
  color: azure;
  box-sizing: border-box;
}

.container {
  max-width: 600px;
  margin: 0 auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  margin-top: 60px;
  font-size: 20px;
}

.logo {
    display: block;
    margin: 20px auto;
    height: 75px;
}
</style>
