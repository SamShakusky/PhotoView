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
      type="password"
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

<style lang="scss" scoped>
  .v-form {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    min-width: 300px;
    padding: 10px 24px;
  }
  
  .v-btn {
    margin: 18px 0;
    &:last-of-type {
      margin-top: 0;
    }
  }
</style>
