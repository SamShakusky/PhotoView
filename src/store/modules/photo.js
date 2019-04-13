import axios from 'axios';
import authModule from './auth';

const Authorization = authModule.state.token ? `JWT ${authModule.state.token}` : '';

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
      const snackData = {
        success: {
          text: 'The photo is successfully saved',
          color: 'success',
        },
        error: {
          text: 'The photo was not saved. Try again',
          color: 'error',
        },
      };
      
      if (photoData.id) {
        photoId = `${photoData.id}/`;
        method = 'PUT';
      }
      
      axios({
        method,
        url: `/api/photo/${photoId}`,
        data: photoData,
        headers: { Authorization },
      }).then((res) => {
        context.commit('setPhoto', {
          id: photoData.id,
          data: res.data,
        });
        
        context.commit('snack/toggleSnack', snackData.success, { root: true });
      }).catch(() => {
        context.commit('snack/toggleSnack', snackData.error, { root: true });
      });
    },
    deletePhoto: (context, payload) => {
      const { id } = payload;
      const snackData = {
        success: {
          text: 'The photo is successfully deleted',
          color: 'success',
        },
        error: {
          text: 'The photo was not deleted. Try again',
          color: 'error',
        },
      };
      
      axios.delete(`/api/photo/${id}/`, { headers: { Authorization } })
        .then(() => {
          const filteredList = context.state.data.filter(photo => photo.id !== id);
          context.commit('deletePhoto', filteredList);
          context.commit('snack/toggleSnack', snackData.success, { root: true });
        })
        .catch(() => {
          context.commit('snack/toggleSnack', snackData.error, { root: true });
        });
    },
  },
};

export default photoModule;
