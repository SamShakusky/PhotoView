import axios from 'axios';
import jwtDecode from 'jwt-decode';
// import { decode } from 'punycode';

const authModule = {
  namespaced: true,
  
  state: {
    token: localStorage.getItem('t'),
    endpoints: {
      obtainToken: '/api/token/obtain/',
      refreshToken: '/api/token/refresh/',
      verifyToken: '/api/token/verify/',
      manageUsers: '/api/users/',
    },
  },
  
  /* eslint-disable no-param-reassign */
  mutations: {
    updateToken(state, newToken) {
      state.token = newToken;
      localStorage.setItem('t', newToken);
    },
    
    removeToken(state) {
      state.token = null;
      localStorage.removeItem('t');
    },
  },
  /* eslint-enable no-param-reassign */
  
  actions: {
    obtainToken(context, userData) {
      const result = axios.post(context.state.endpoints.obtainToken, userData)
        .then((response) => {
          context.commit('updateToken', response.data.token);
          
          return true;
        })
        .catch(() => {
          const snackData = {
            text: "Couldn't obtain the token",
            color: 'error',
          };
          context.commit('snack/toggleSnack', snackData, { root: true });
          
          return false;
        });
      
      return result;
    },
    
    refreshToken(context) {
      const payload = {
        token: context.state.token,
      };
      axios.post(context.state.endpoints.refreshToken, payload)
        .then((response) => {
          context.commit('updateToken', response.data.token);
        })
        .catch(() => {
          const snackData = {
            text: "Couldn't refresh the token",
            color: 'error',
          };
          context.commit('snack/toggleSnack', snackData, { root: true });
        });
    },
    
    verifyToken(context, token) {
      const result = axios.post(context.state.endpoints.verifyToken, { token })
        .then((response) => {
          if (response.status === 200) {
            return true;
          }
          
          return false;
        })
        .catch(() => false);
      
      return result;
    },
    
    inspectToken(context) {
      const { token } = context.state;
      const result = context.dispatch('verifyToken', token)
        .then((isValid) => {
          if (isValid) {
            const decoded = jwtDecode(token);
            const { exp } = decoded;
            
            // const { exp, orig_iat: origIat } = decoded;
            // const expired = new Date(exp * 1000);
            // const orig = new Date(origIat * 1000);
            // console.log(decoded);
            // console.log('e', expired.toLocaleString());
            // console.log('i', orig.toLocaleString());
            // console.log('till exp', (expired - Date.now()) / 1000 / 60 / 60);
            
            // refresh token if less than 60 minutes till expiration
            if (exp - (Date.now() / 1000) < 60 * 60) {
              context.dispatch('refreshToken');
            }
            
            return true;
          }
          
          return false;
        })
        .catch(() => false);
      
      return result;
    },
    
    createUser: (context, userData) => {
      const snackData = {
        success: {
          text: 'User successfully created',
          color: 'success',
        },
        error: {
          text: 'Couldn\'t create user',
          color: 'error',
        },
      };
      
      const result = axios.post(context.state.endpoints.manageUsers, userData)
        .then(() => {
          context.commit('snack/toggleSnack', snackData.success, { root: true });
          
          return true;
        })
        .catch(() => {
          context.commit('snack/toggleSnack', snackData.error, { root: true });
          
          return false;
        });
        
      return result;
    },
  },
};

export default authModule;
