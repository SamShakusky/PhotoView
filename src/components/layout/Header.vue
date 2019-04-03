<template>
  <header :class="`page-${currentPage}`">
    <h1>The App</h1>
    <nav id="nav">
      <router-link to="/">
        Home
      </router-link>
      <router-link to="/admin">
        Admin
      </router-link>
      <router-link to="/todo">
        Todo
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    currentPage: {
      type: String,
      default: '/',
    },
  },
};
</script>


<style scoped>
  header {
    display: flex;
    padding: 12px;
    background: steelblue;
    color: white;
    align-items: center;
  }
  
  .page-login {
    display: none;
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
