<template>
  <v-form
    ref="form"
    v-model="valid"
    class="elevation-4"
  >
    <v-text-field
      v-model="username"
      :rules="nameRules"
      label="Login"
      required
    />
    
    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
    />
    
    <v-text-field
      v-model="email"
      label="Email"
    />
    
    <v-btn
      color="primary"
      @click="submit"
    >
      Submit
    </v-btn>
    <v-btn
      @click="signup"
    >
      Sign Up
    </v-btn>
  </v-form>
</template>

<script>
import {
  VForm,
  VTextField,
  VBtn,
} from 'vuetify/lib';

export default {
  name: 'AuthForm',
  components: {
    VForm,
    VTextField,
    VBtn,
  },
  
  data: () => ({
    valid: false,
    username: '',
    lastname: '',
    nameRules: [
      v => !!v || 'Login is required',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
    ],
    email: '',
  }),
  
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        const { username, password } = this;
        
        this.$emit('sendLoginData', {
          username, password,
        });
      }
    },
    
    signup() {
      if (this.$refs.form.validate()) {
        const { username, password, email } = this;
        
        this.$emit('sendSignupData', {
          username, password, email,
        });
      }
    },
  },
};
</script>

<style scoped>
  .v-form {
    padding: 10px 24px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    margin-top: 50px;
  }
  
  .v-btn {
    margin: 18px 0;
  }
  
  .v-btn:last-of-type {
    margin-top: 0;
  }
</style>
