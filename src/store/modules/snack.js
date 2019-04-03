const snackModule = {
  namespaced: true,
  
  state: {
    data: {
      text: '',
      color: '',
    },
  },
    
  /* eslint-disable no-param-reassign */
  mutations: {
    toggleSnack: (state, payload) => {
      const { color } = state.data;
      
      state.data.text = payload.text;
      state.data.color = payload.color || color;
    },
  },
  /* eslint-enable no-param-reassign */
};

export default snackModule;
