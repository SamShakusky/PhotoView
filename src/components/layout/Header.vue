<template>
  <header :class="`header page-${currentPage}`">
    <router-link to="/">
      <h1>The App</h1>
    </router-link>
    <nav id="nav">
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


<style lang="scss" scoped>
  .header {
    display: flex;
    padding: 12px;
    background: steelblue;
    color: white;
    align-items: center;
    
    a {
      color: white;
      margin-right: 12px;
      text-decoration: none;
    }
  }
  
  .page-login {
    background: #fafafa;
    
    h1 {
      color: #212121;
    }
    
    nav {
      display: none;
    }
  }
  
  nav {
    margin-left: 32px;
  }
</style>
