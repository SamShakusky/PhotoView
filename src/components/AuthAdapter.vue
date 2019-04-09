<template>
  <AuthForm
    @sendLoginData="obtainToken"
    @sendSignupData="createUser"
  />
</template>

<script>
import AuthForm from './AuthForm';

export default {
  name: 'AuthAdapter',
  components: {
    AuthForm,
  },
  
  methods: {
    obtainToken(userData) {
      this.$store.dispatch('auth/obtainToken', userData)
        .then((succesfull) => {
          if (succesfull) {
            this.$router.push('admin');
          }
        });
    },
    
    createUser(userData) {
      this.$store.dispatch('auth/createUser', userData)
        .then((succesfull) => {
          if (succesfull) {
            this.obtainToken(userData);
          }
        });
    },
  },
};
</script>
