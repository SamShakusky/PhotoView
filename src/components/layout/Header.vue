<template>
  <header>
    <h1>Todo List</h1>
    <nav id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>


<style scoped>
  header {
    display: flex;
    padding: 12px;
    background: steelblue;
    color: white;
    align-items: center;
  }
  
  nav {
    margin-left: 32px;
  }
  
  header a {
    color: white;
    margin-right: 12px;
    text-decoration: none;
  }
</style>
