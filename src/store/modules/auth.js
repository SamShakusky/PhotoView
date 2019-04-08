import axios from 'axios';
import jwtDecode from 'jwt-decode';

const authModule = {
  namespaced: true,
  
  state: {
    token: localStorage.getItem('t'),
    endpoints: {
      obtainToken: '/api/token/obtain/',
      refreshToken: '/api/token/refresh/',
      manageUsers: '/api/users/',
    },
  },
  
  /* eslint-disable no-param-reassign */
  mutations: {
    updateToken(state, newToken) {
      state.token = newToken;
      axios.defaults.headers.common.Authorization = newToken ? `JWT ${newToken}` : '';
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
    
    inspectToken(context) {
      const { token } = context.state;
      if (token) {
        const decoded = jwtDecode(token);
        const { exp } = decoded;
        
        // less than 30 minutes until expiration
        const isAlmostExpired = (exp - Date.now() / 1000) < 30 * 60;
        
        // check if token has not expired
        if (exp > (Date.now() / 1000)) {
          // refresh token if almost expired
          if (isAlmostExpired) {
            context.dispatch('refreshToken');
          }
          
          return true;
        }
      }
      
      return false;
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

axios.defaults.headers.common.Authorization = authModule.state.token ? `JWT ${authModule.state.token}` : '';

export default authModule;
