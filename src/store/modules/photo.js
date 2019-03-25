import axios from 'axios';

const photoModule = {
  namespaced: true,
  
  state: {
    data: [],
  },
    
  /* eslint-disable no-param-reassign */
  mutations: {
    getPhotos: (state, payload) => {
      state.data = payload;
    },
    setPhoto: (state, payload) => {
      if (payload.id) {
        const index = state.data.findIndex(photo => photo.id === payload.id);
        Object.keys(state.data[index]).forEach((key) => {
          state.data[index][key] = payload.data[key];
        });
      } else {
        state.data = [...state.data, payload.data];
      }
    },
    deletePhoto: (state, filteredList) => {
      state.data = filteredList;
    },
  },
  /* eslint-enable no-param-reassign */
  
  actions: {
    getPhotos: (context) => {
      axios.get('/api/photo/')
        .then((res) => {
          context.commit('getPhotos', res.data);
        })
        .catch(err => console.error(err)); // eslint-disable-line no-console
    },
    setPhoto: (context, photoData) => {
      let photoId = '';
      let method = 'POST';
      
      if (photoData.id) {
        photoId = `${photoData.id}/`;
        method = 'PUT';
      }
      
      axios({
        method,
        url: `/api/photo/${photoId}`,
        data: photoData,
      }).then((res) => {
        context.commit('setPhoto', {
          id: photoData.id,
          data: res.data,
        });
        
        const snackData = {
          text: 'The photo was successfully saved',
          color: 'success',
        };
        context.commit('snack/toggleSnack', snackData, { root: true });
      }).catch(err => console.error(err)); // eslint-disable-line no-console
    },
    deletePhoto: (context, payload) => {
      const { id } = payload;
      
      axios.delete(`/api/photo/${id}/`)
        .then(() => {
          const filteredList = context.state.data.filter(photo => photo.id !== id);
          context.commit('deletePhoto', filteredList);
        })
        .catch(err => console.error(err)); // eslint-disable-line no-console
    },
  },
};

export default photoModule;
