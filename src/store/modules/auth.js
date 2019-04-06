import axios from 'axios';
// import jwtDecode from 'jwt-decode';

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
      localStorage.setItem('t', newToken);
      state.token = newToken;
    },
    
    removeToken(state) {
      localStorage.removeItem('t');
      state.token = null;
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
      // console.log(token);
      if (token) {
        // const decoded = jwtDecode(token);
        // const { exp } = decoded;
        // const { orig_iat } = decode;
        // console.log(decoded);
        // if (exp - (Date.now() / 1000) < 1800 && (Date.now() / 1000) - orig_iat < 628200) {
        //   // this.dispatch('refreshToken');
        // } else if (exp - (Date.now() / 1000) < 1800) {
        //   // DO NOTHING, DO NOT REFRESH
        // } else {
        //
        // }
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

export default authModule;
